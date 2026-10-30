import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Phone, X, MessageCircle, ChevronDown, Briefcase, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CandidaturaForm, candidaturaDialogClass } from "@/components/CandidaturaForm";

import { offices } from "@/data/offices";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onMobileMenuChange?: (isOpen: boolean) => void;
}

export function Navbar({ onMobileMenuChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  // In homepage il pulsante "Valuta" del menu compare solo dopo l'hero, che ha già la sua CTA
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showNavCta = !isHome || pastHero;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    onMobileMenuChange?.(false);
  }, [location.pathname]);

  const handleMenuToggle = (open: boolean) => {
    setIsMobileMenuOpen(open);
    onMobileMenuChange?.(open);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    // Barra candidature + menu restano entrambi fissi in alto durante lo scroll
    <div className="sticky top-0 z-50">
      {/* Topbar: ricerca consulenti */}
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className="group block w-full bg-primary text-primary-foreground py-2.5 text-sm md:text-base">
            <span className="container mx-auto px-4 flex items-center justify-center gap-3">
              <Briefcase className="hidden sm:block h-4 w-4 shrink-0" />
              <span><strong className="font-bold">Cerchiamo consulenti immobiliari</strong><span className="hidden sm:inline"> per le nostre 6 sedi</span></span>
              <span className="inline-flex items-center gap-1 bg-white text-primary font-bold rounded-full px-3 py-1 text-xs md:text-sm shadow-sm group-hover:bg-white/90 transition-colors">
                Candidati ora <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className={candidaturaDialogClass}>
          <DialogTitle className="sr-only">Candidatura</DialogTitle>
          <CandidaturaForm />
        </DialogContent>
      </Dialog>

      {/* Main Navbar */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src="https://vibe.filesafe.space/1775806180627333208/attachments/be05420e-9c6d-4154-953f-04427c1c308e.png" 
              alt="Marson Immobiliare" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary border-b-2 border-primary py-1" : "text-foreground/80"}`}>
              Home
            </Link>
            <Link to="/chi-siamo" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/chi-siamo") ? "text-primary border-b-2 border-primary py-1" : "text-foreground/80"}`}>
              Chi siamo
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none ${isActive("/vendita") || isActive("/affitto") ? "text-primary" : "text-foreground/80"}`}>
                Immobili <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem asChild>
                  <Link to="/vendita" className="w-full cursor-pointer">In vendita</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/affitto" className="w-full cursor-pointer">In affitto</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/vendi-immobile" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/vendi-immobile") ? "text-primary border-b-2 border-primary py-1" : "text-foreground/80"}`}>
              Vendi il tuo immobile
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none ${isActive("/dove-siamo") ? "text-primary" : "text-foreground/80"}`}>
                Le nostre sedi <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild><Link to="/dove-siamo" className="w-full cursor-pointer">Tutte le sedi</Link></DropdownMenuItem>
                {offices.map(office => (
                  <DropdownMenuItem key={office.slug} asChild>
                    <Link to={`/sede/${office.slug}`} className="w-full cursor-pointer">{office.city}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/contattaci" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contattaci") ? "text-primary border-b-2 border-primary py-1" : "text-foreground/80"}`}>
              Contattaci
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div
            className={`hidden lg:flex items-center gap-3 shrink-0 transition-opacity duration-300 ${showNavCta ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-hidden={!showNavCta}
          >
            <Button asChild tabIndex={showNavCta ? undefined : -1}>
              <Link to="/vendi-immobile">Valuta il tuo immobile</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => handleMenuToggle(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full max-h-[calc(100vh-80px)] overflow-y-auto bg-background border-b shadow-lg py-4 px-4 flex flex-col gap-2">
            <Link to="/" className="text-lg font-medium py-2 border-b border-border/50" onClick={() => handleMenuToggle(false)}>Home</Link>
            <Link to="/chi-siamo" className="text-lg font-medium py-2 border-b border-border/50" onClick={() => handleMenuToggle(false)}>Chi siamo</Link>
            <div className="py-2 border-b border-border/50">
              <span className="text-lg font-medium text-muted-foreground block mb-2">Immobili</span>
              <div className="flex flex-col gap-2 pl-4">
                <Link to="/vendita" className="text-base" onClick={() => handleMenuToggle(false)}>In vendita</Link>
                <Link to="/affitto" className="text-base" onClick={() => handleMenuToggle(false)}>In affitto</Link>
              </div>
            </div>
            <Link to="/vendi-immobile" className="text-lg font-medium py-2 border-b border-border/50 text-primary" onClick={() => handleMenuToggle(false)}>Vendi il tuo immobile</Link>
            <div className="py-2 border-b border-border/50">
              <span className="text-lg font-medium text-muted-foreground block mb-2">Le nostre sedi</span>
              <div className="flex flex-col gap-2 pl-4">
                <Link to="/dove-siamo" className="text-base" onClick={() => handleMenuToggle(false)}>Tutte le sedi</Link>
                {offices.map(office => (
                  <Link key={office.slug} to={`/sede/${office.slug}`} className="text-base" onClick={() => handleMenuToggle(false)}>{office.city}</Link>
                ))}
              </div>
            </div>
            <Link to="/contattaci" className="text-lg font-medium py-2 border-b border-border/50" onClick={() => handleMenuToggle(false)}>Contattaci</Link>
            
            <div className="flex flex-col gap-3 mt-4">
              <Button asChild className="w-full justify-center">
                <Link to="/vendi-immobile" onClick={() => handleMenuToggle(false)}>Valuta il tuo immobile</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
