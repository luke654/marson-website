#!/usr/bin/env bash
# Pubblica marson.it sul server di produzione (srv961648, 72.60.33.247).
# 1) build (Vite) e copia di dist/ in /var/www/html/marson
# 2) (solo la prima volta) crea il virtual host Apache per marson.it e www.marson.it
# 3) ./deploy.sh --https: certificato HTTPS con certbot (solo dopo che i DNS puntano al server)
set -euo pipefail

HOST="cristi@srv961648.hstgr.cloud"
DEST="/var/www/html/marson"
SRC="$(cd "$(dirname "$0")" && pwd)"

if [ "${1:-}" = "--https" ]; then
  ssh "$HOST" "sudo certbot --apache --non-interactive --redirect -d marson.it -d www.marson.it"
  exit 0
fi

echo "→ Build"
(cd "$SRC" && npm run build)

echo "→ Copio il sito in $HOST:$DEST"
ssh "$HOST" "sudo mkdir -p $DEST && sudo chown cristi:cristi $DEST"
rsync -az --delete "$SRC/dist/" "$HOST:$DEST/"

if ssh "$HOST" "test -f /etc/apache2/sites-enabled/marson.it.conf"; then
  echo "✓ Virtual host già presente: sito aggiornato."
  exit 0
fi

echo "→ Prima pubblicazione: creo il virtual host (solo http, HTTPS con ./deploy.sh --https dopo il cambio DNS)"
ssh "$HOST" "sudo bash -s" <<EOF
set -e
cat > /etc/apache2/sites-available/marson.it.conf <<'VHOST'
<VirtualHost *:80>
    ServerName marson.it
    ServerAlias www.marson.it
    DocumentRoot $DEST

    <Directory $DEST>
        AllowOverride None
        Require all granted
        # Sito React (BrowserRouter): le pagine interne si servono da index.html
        FallbackResource /index.html
    </Directory>

    # File con hash nel nome: cache lunga; index.html sempre fresco
    <LocationMatch "^/assets/">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </LocationMatch>
    <Files "index.html">
        Header set Cache-Control "no-cache"
    </Files>

    ErrorLog \${APACHE_LOG_DIR}/marson-error.log
    CustomLog \${APACHE_LOG_DIR}/marson-access.log combined
</VirtualHost>
VHOST
a2ensite marson.it.conf >/dev/null
# Configurazione non valida: si disattiva subito, per non bloccare i reload degli altri siti
apache2ctl configtest || { a2dissite marson.it.conf >/dev/null; echo "Configurazione Apache non valida: virtual host disattivato"; exit 1; }
systemctl reload apache2
EOF
echo "✓ Pubblicato. Prova prima del cambio DNS: curl -s --resolve marson.it:80:72.60.33.247 http://marson.it/ | head"
