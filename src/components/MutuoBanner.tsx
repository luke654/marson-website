import { Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

export function MutuoBanner() {
  return (
    <section id="consulenza-mutuo" className="scroll-mt-32 py-10 md:py-12 bg-muted/30 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 bg-white rounded-2xl p-6 md:p-10 border border-primary/20 shadow-sm">
          <div className="flex items-start gap-4 text-center md:text-left">
            <div className="hidden md:flex w-12 h-12 bg-primary/10 rounded-full items-center justify-center shrink-0">
              <Landmark className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Consulenza mutuo gratuita</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Hai bisogno di un mutuo a ottime condizioni?</h2>
              <p className="text-muted-foreground">Grazie al nostro broker convenzionato ti aiutiamo a trovare il mutuo più adatto a te. Contattaci per una consulenza gratuita e senza impegno.</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="shrink-0 h-12 px-8 w-full md:w-auto">
                Richiedi la consulenza
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-lg">
              <DialogTitle className="sr-only">Consulenza mutuo</DialogTitle>
              <ContactForm
                title="Consulenza mutuo gratuita"
                subtitle="Lasciaci i tuoi dati: ti ricontattiamo per capire insieme il mutuo più adatto a te."
                context="Consulenza mutuo"
                defaultMessage="Vorrei una consulenza mutuo gratuita."
                submitText="Richiedi la consulenza"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
