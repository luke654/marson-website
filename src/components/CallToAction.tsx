import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

export function CallToAction() {
  return (
    <section className="py-24 bg-background border-t">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Parliamo del tuo immobile</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Conosciamo questo territorio, le sue dinamiche e le persone che lo vivono ogni giorno.
Per questo possiamo offrirti un supporto diretto, concreto e costruito sull’esperienza reale.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="h-14 px-8 text-lg">
            <Link to="/vendi-immobile">Valuta il tuo immobile</Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                Parla con noi su WhatsApp
              </Button>
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
      </div>
    </section>
  );
}
