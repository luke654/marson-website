import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";
import { ReviewsWidget } from "../ReviewsWidget";
import { trackPageView } from "@/lib/utils";
import { CallToAction } from "../CallToAction";
import { CookieBanner } from "../CookieBanner";
import { TutelaSection } from "../TutelaSection";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "../ContactForm";
import { ExitPopup } from "../ExitPopup";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [showChatPrompt, setShowChatPrompt] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMobileMenuChange={setIsMobileMenuOpen} />
      <main className="flex-1">
        {children}
      </main>
      {!isHome && <ReviewsWidget />}
      <TutelaSection />
      <CallToAction />
      <Footer />
      
      {/* Fixed WhatsApp Button */}
      {!isMobileMenuOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {showChatPrompt && (
          <div className="bg-white rounded-2xl shadow-xl p-4 mb-4 relative w-72 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setShowChatPrompt(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Chiudi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => { 
                setShowChatPrompt(false); 
                setIsChatOpen(true);
              }}
            >
              <img 
                src="https://vibe.filesafe.space/1775806180627333208/attachments/be05420e-9c6d-4154-953f-04427c1c308e.png" 
                alt="Marson Immobiliare" 
                className="w-12 h-12 rounded-full object-contain p-1 border-2 border-primary/10 bg-white"
              />
              <div>
                <p className="text-[#334155] text-base font-medium leading-tight">Ciao! Hai una domanda?</p>
                <p className="text-[#334155] text-base font-medium leading-tight mt-1">Chatta con noi qui</p>
              </div>
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-b border-r border-transparent shadow-[4px_4px_4px_rgba(0,0,0,0.05)]" />
          </div>
        )}
        
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setShowChatPrompt(false)}
              className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20ba56] transition-transform hover:scale-110 flex items-center justify-center group self-end"
              aria-label="Contattaci"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute right-full mr-4 bg-white text-foreground text-sm font-medium py-2 px-4 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Scrivici
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-lg">
            <DialogTitle className="sr-only">Contattaci</DialogTitle>
            <ContactForm 
              title="Come possiamo aiutarti?" 
              subtitle="Compila il modulo e ti ricontatteremo subito direttamente su WhatsApp."
              submitText="Invia Richiesta"
            />
          </DialogContent>
        </Dialog>
        </div>
      )}
      <CookieBanner />
      <ExitPopup />
    </div>
  );
}
