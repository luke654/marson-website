#!/usr/bin/env python3
"""Pre-rendering della SPA dopo `vite build`.

Per ogni rotta apre la build in Chrome headless, prende l'HTML disegnato da React e i tag
di <head> messi da react-helmet-async (title, description, canonical, og:*), e scrive
dist/<rotta>.html (la home in dist/home.html): Google trova titolo, H1 e testo senza eseguire
JavaScript. Il server serve /<rotta> da <rotta>.html se esiste, altrimenti index.html come prima.
L'app al caricamento ridisegna #root come prima (createRoot), quindi il comportamento non cambia.

Uso: python3 scripts/prerender.py dist            (rotte lette da dist/sitemap.xml)
     python3 scripts/prerender.py dist / /chi-siamo  (rotte indicate a mano)
"""
import html.parser, http.server, os, re, socketserver, subprocess, sys, threading

CHROME = os.environ.get("CHROME_PATH", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
DIST = sys.argv[1]
ROUTES = sys.argv[2:] or [
    re.sub(r"^https?://[^/]+", "", u) or "/"
    for u in re.findall(r"<loc>\s*([^<\s]+)", open(os.path.join(DIST, "sitemap.xml"), encoding="utf-8").read())
]
TEMPLATE = open(os.path.join(DIST, "index.html"), encoding="utf-8").read()
# la home va in home.html: index.html resta il guscio dell'app, usato per tutte le altre rotte
HOME = os.environ.get("PRERENDER_HOME", "home.html")


class SPA(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=DIST, **k)

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) or (os.path.isdir(path) and not os.path.exists(os.path.join(path, "index.html"))):
            self.path = "/index.html"
        return super().send_head()

    def log_message(self, *a):
        pass


class RootFinder(html.parser.HTMLParser):
    """Trova l'inizio e la fine di <div id="root"> nel DOM esportato."""
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.depth = None
        self.start = self.end = None

    def handle_starttag(self, tag, attrs):
        if self.end is not None:
            return
        if self.depth is None:
            if tag == "div" and ("id", "root") in attrs:
                self.depth = 0
                self.start = self.abs_pos()
            return
        if tag not in self.VOID:
            self.depth += 1

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_endtag(self, tag):
        if self.depth is None or self.end is not None:
            return
        if self.depth == 0 and tag == "div":
            self.end = self.abs_pos()
        elif tag not in self.VOID:
            self.depth -= 1

    def abs_pos(self):
        line, col = self.getpos()
        return sum(self._lines[: line - 1]) + col


def root_inner(dom):
    p = RootFinder()
    p._lines = [len(l) for l in dom.splitlines(keepends=True)]
    p.feed(dom)
    if p.start is None or p.end is None:
        raise ValueError("div#root non trovato")
    open_end = dom.index(">", p.start) + 1
    return dom[open_end:p.end]


def render(port, route):
    url = f"http://127.0.0.1:{port}{route}"
    out = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars",
                          "--virtual-time-budget=10000", "--window-size=1280,900", "--dump-dom", url],
                         capture_output=True, text=True, timeout=120)
    return out.stdout


def build_page(dom):
    inner = root_inner(dom)
    # elementi aggiunti a runtime da script esterni: li rimette chi li ha creati
    inner = re.sub(r'<div[^>]*data-fusionsoft[^>]*>.*?</div>', "", inner, flags=re.S)
    head = dom[: dom.index("</head>")]
    helmet = re.findall(r'<(?:meta|link)[^>]*data-rh="true"[^>]*>|<script[^>]*data-rh="true"[^>]*>.*?</script>', head, re.S)
    title = re.search(r"<title[^>]*>.*?</title>", head, re.S)
    page = TEMPLATE
    if title:
        page = re.sub(r"<title[^>]*>.*?</title>", lambda m: title.group(0), page, count=1, flags=re.S)
    names = set()
    for tag in helmet:
        m = re.search(r'(?:name|property)="([^"]+)"', tag)
        if m:
            names.add(m.group(1))
        if 'rel="canonical"' in tag:
            names.add("canonical")
    for n in names:
        if n == "canonical":
            page = re.sub(r'\s*<link[^>]*rel="canonical"[^>]*>', "", page)
        else:
            page = re.sub(r'\s*<meta[^>]*(?:name|property)="%s"[^>]*>' % re.escape(n), "", page)
    page = page.replace("</head>", "\n    " + "\n    ".join(helmet) + "\n  </head>", 1)
    page = page.replace('<div id="root"></div>', '<div id="root">' + inner + "</div>", 1)
    return page, title.group(0) if title else "", len(re.findall(r"<h1[\s>]", inner))


def main():
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.ThreadingTCPServer(("127.0.0.1", 0), SPA)
    port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    ok = True
    for route in ROUTES:
        try:
            page, title, h1 = build_page(render(port, route))
        except Exception as e:
            print(f"ERRORE {route}: {e}")
            ok = False
            continue
        name = HOME if route == "/" else route.strip("/") + ".html"
        target = os.path.join(DIST, name)
        os.makedirs(os.path.dirname(target), exist_ok=True)
        open(target, "w", encoding="utf-8").write(page)
        print(f"{route} -> {name} | h1={h1} | {re.sub('<[^>]+>', '', title)}")
    srv.shutdown()
    sys.exit(0 if ok else 1)


main()
