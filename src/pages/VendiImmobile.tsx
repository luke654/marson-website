import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, MessageCircle, CheckCircle2, TrendingUp, ShieldCheck, Clock, FileText, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ContactForm } from "@/components/ContactForm";
import { SEOHead } from "@/components/SEOHead";

export default function VendiImmobile() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <SEOHead 
        title="Vendi o Affitta il tuo Immobile | Marson Immobiliare" 
        description="Vendi o affitta il tuo immobile alle migliori condizioni di mercato. Sfrutta la forza di un'agenzia con 6 sedi e oltre 40 anni di esperienza sul territorio."
        canonical="/vendi-immobile"
      />
      {/* Hero */}
      <section className="bg-primary pt-20 pb-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">La famiglia Marson al tuo fianco dal 1986</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Affida il tuo immobile <br className="hidden md:block"/> a chi ne conosce il valore reale
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 font-light">
            Da oltre 40 anni la famiglia Marson mette la propria esperienza al vostro servizio. Vi affianchiamo personalmente per garantire una vendita serena, sicura e al miglior prezzo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg h-14 px-8" onClick={() => document.getElementById('valutazione')?.scrollIntoView({ behavior: 'smooth' })}>
              Richiedi Valutazione Gratuita
            </Button>
            <Button size="lg" variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white bg-white/10 backdrop-blur-sm text-lg h-14 px-8 transition-colors" asChild>
              <a href="https://wa.me/393351333080" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Scrivici su WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Valutazione Reale</h3>
              <p className="text-muted-foreground text-sm">Basata su dati concreti di compravendite recenti nella tua zona.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Tempi Certi</h3>
              <p className="text-muted-foreground text-sm">Grazie al nostro ampio database di clienti già pre-qualificati.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Zero Sorprese</h3>
              <p className="text-muted-foreground text-sm">Gestiamo tutta la burocrazia per farti arrivare sereno al rogito.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section id="valutazione" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-5/12 bg-primary p-10 text-primary-foreground flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6">Inizia da qui</h2>
                <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                  Lasciaci i tuoi dati e le informazioni base dell'immobile. Un nostro consulente locale ti contatterà entro 24 ore per fissare un sopralluogo gratuito.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-white/70" />
                    <span>Sopralluogo senza impegno</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-white/70" />
                    <span>Analisi di mercato dettagliata</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-white/70" />
                    <span>Piano marketing personalizzato</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-sm text-primary-foreground/80 mb-2">Preferisci chiamare?</p>
                <a href="tel:+393351333080" className="text-2xl font-bold flex items-center gap-2 hover:text-white/80 transition-colors">
                  <Phone className="h-6 w-6" /> +39 335 133 3080
                </a>
              </div>
            </div>
            <div className="lg:w-7/12 p-10">
              <h3 className="text-2xl font-bold text-foreground mb-6">Dati dell'immobile</h3>
                <ContactForm 
                  source="Landing Valutazione" 
                  showValuationFields={true} 
                  submitText="Richiedi Valutazione Gratuita" 
                  defaultMessage="Vorrei richiedere una valutazione gratuita per il mio immobile."
                />
            </div>
          </div>
        </div>
      </section>

      {/* Come Lavoriamo */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Il nostro metodo in 4 passi</h2>
            <p className="text-lg text-muted-foreground">Un processo collaudato in oltre 40 anni per garantirti il massimo risultato con zero stress.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border -z-10"></div>
            
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 border-4 border-white shadow-sm">1</div>
              <h3 className="font-bold text-lg mb-3">Sopralluogo e Valutazione</h3>
              <p className="text-muted-foreground text-sm">Analizziamo l'immobile e i documenti per stabilire il corretto valore di mercato.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 border-4 border-white shadow-sm">2</div>
              <h3 className="font-bold text-lg mb-3">Piano Marketing</h3>
              <p className="text-muted-foreground text-sm">Servizio fotografico professionale e promozione sui migliori canali e nel nostro database.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 border-4 border-white shadow-sm">3</div>
              <h3 className="font-bold text-lg mb-3">Gestione Visite</h3>
              <p className="text-muted-foreground text-sm">Filtriamo i contatti, portiamo solo clienti qualificati e gestiamo le trattative.</p>
            </div>
            
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 border-4 border-white shadow-sm">4</div>
              <h3 className="font-bold text-lg mb-3">Rogito Sicuro</h3>
              <p className="text-muted-foreground text-sm">Ti accompagniamo fino alla firma dal notaio, gestendo tutta la documentazione.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
