import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, MessageCircle } from "lucide-react";
import { offices } from "@/data/offices";
import { ContactForm } from "@/components/ContactForm";

import { SEOHead } from "@/components/SEOHead";

export default function Contattaci() {
  const mainOffice = offices[0]; // Legnano

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <SEOHead 
        title="Contattaci | Marson Immobiliare" 
        description="Siamo a tua disposizione per qualsiasi informazione. Compila il modulo o utilizza i nostri recapiti diretti."
        canonical="/contattaci"
      />
      {/* Hero */}
      <section className="bg-primary pt-20 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contattaci</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Siamo a tua disposizione per qualsiasi informazione. Compila il modulo o utilizza i nostri recapiti diretti.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Recapiti Principali</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Le nostre sedi</h3>
                    <p className="text-muted-foreground">6 uffici a tua disposizione sul territorio.</p>
                    <a href="/dove-siamo" className="text-primary hover:underline text-sm font-medium mt-1 inline-block">Trova la sede più vicina</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" /> Assistenza Rapida
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Preferisci scriverci su WhatsApp? Rispondiamo nel minor tempo possibile.
              </p>
              <Button className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white border-0" asChild>
                <a href="https://wa.me/393351333080" target="_blank" rel="noopener noreferrer">
                  Chatta su WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-2xl font-bold text-primary mb-6">Inviaci un Messaggio</h2>
                <ContactForm 
                  source="Pagina Contattaci" 
                  submitText="Invia Messaggio" 
                  className="space-y-6" 
                />
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}
