import { Building, MapPin, Users, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

export default function ChiSiamo() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <SEOHead 
        title="Chi Siamo | Marson Immobiliare" 
        description="Dal 1986 Marson Immobiliare è il punto di riferimento per chi cerca, vende o affitta casa nel legnanese e dintorni."
        canonical="/chi-siamo"
      />
      {/* Hero */}
      <section className="bg-primary pt-20 pb-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Una storia di famiglia, <br className="hidden md:block"/> un legame con il territorio.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-light">
            Da oltre 40 anni, la famiglia Marson mette le persone al centro di ogni casa. Una continuità che nasce nel 1986 e si tramanda con passione e serietà.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Oltre 40 anni di radici profonde</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La nostra storia non è fatta di algoritmi, ma di persone. Inizia nel 1986, quando la famiglia Marson ha mosso i primi passi nel settore immobiliare con l'obiettivo di offrire un servizio basato sulla fiducia e sulla trasparenza. Da allora, non abbiamo mai smesso di presidiare il territorio, crescendo con costanza fino a diventare una realtà solida con 6 sedi operative.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ciò che ci rende diversi è la continuità familiare: i nostri clienti sanno che troveranno sempre le stesse persone ad affiancarli, con la stessa etica e la stessa dedizione. Per noi, vendere o comprare casa è un progetto di vita che merita un supporto umano e professionale costante nel tempo.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground">Etica</h4>
                    <p className="text-sm text-muted-foreground">Trasparenza totale in ogni fase.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground">Competenza</h4>
                    <p className="text-sm text-muted-foreground">Formazione continua del team.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground">Innovazione</h4>
                    <p className="text-sm text-muted-foreground">Strumenti marketing all'avanguardia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground">Radicamento</h4>
                    <p className="text-sm text-muted-foreground">Conoscenza profonda del mercato.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://vibe.filesafe.space/1775806180627333208/attachments/4eed188d-0321-4153-a2df-b4a53107553b.png" 
                  alt="Agenzia Marson Immobiliare" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">Dal 1986</p>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Garanzia di Affidabilità</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Building className="h-10 w-10 mx-auto opacity-80" />
              <p className="text-4xl font-bold">6</p>
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Sedi Operative</p>
            </div>
            <div className="space-y-2">
              <Users className="h-10 w-10 mx-auto opacity-80" />
              <p className="text-4xl font-bold">+25</p>
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Professionisti</p>
            </div>
            <div className="space-y-2">
              <Award className="h-10 w-10 mx-auto opacity-80" />
              <p className="text-4xl font-bold">40</p>
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Anni di Esperienza</p>
            </div>
            <div className="space-y-2">
              <MapPin className="h-10 w-10 mx-auto opacity-80" />
              <p className="text-4xl font-bold">100%</p>
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Copertura Locale</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Affidati a chi conosce davvero il mercato</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Vieni a trovarci in una delle nostre sedi per conoscerci di persona e scoprire come possiamo aiutarti a realizzare i tuoi progetti immobiliari.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg">
              <Link to="/dove-siamo">Trova la sede più vicina</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
              <Link to="/vendi-immobile">Valuta il tuo immobile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
