import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

export function ExitPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("exit_popup_shown");
    
    if (hasShown) return;

    const handleMouseOut = (e: MouseEvent) => {
      // Trigger only when mouse leaves from the top of the window (towards tabs/address bar)
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem("exit_popup_shown", "true");
        document.removeEventListener("mouseout", handleMouseOut);
      }
    };

    // Delay the event listener attachment to prevent immediate triggers on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseOut);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 bg-transparent shadow-none" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Non andare via</DialogTitle>
        <ContactForm 
          title="Aspetta! Prima di andare..."
          subtitle="Non perdere l'occasione di parlare con i nostri esperti. Lascia i tuoi dati per una consulenza senza impegno."
          context="Exit Popup"
        />
      </DialogContent>
    </Dialog>
  );
}
