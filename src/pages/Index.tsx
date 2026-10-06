import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Building, ArrowRight, Users, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { offices } from "@/data/offices";
import { useProperties } from "@/hooks/useProperties";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { ReviewsWidget } from "@/components/ReviewsWidget";
import { ContactForm } from "@/components/ContactForm";


export default function Index() {
  const { data: properties = [], isLoading } = useProperties();
  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead 
        title="Marson Immobiliare — Agenzia Immobiliare" 
        description="Marson Immobiliare: esperienza, territorio, risultati. La tua agenzia di fiducia per compravendita e locazione di immobili residenziali e commerciali."
        canonical="/"
        schemaJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Marson Immobiliare",
          "image": "https://vibe.filesafe.space/1775806180627333208/attachments/673e36fa-8661-47c6-8f47-53d950cb8d99.webp",
          "@id": "https://marson.it",
          "url": "https://marson.it",
          "telephone": "+393351333080",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Sempione, 126",
            "addressLocality": "Legnano",
            "postalCode": "20025",
            "addressCountry": "IT"
          },
          "department": offices.map(office => ({
            "@type": "RealEstateAgent",
            "name": `Marson Immobiliare ${office.city}`,
            "image": office.images[0],
            "telephone": office.phone,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": office.address
            }
          }))
        })}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[550px] flex items-center justify-center pt-16 md:pt-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://vibe.filesafe.space/1775806180627333208/attachments/673e36fa-8661-47c6-8f47-53d950cb8d99.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" /> 
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white mt-10 md:mt-0">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium tracking-wide">La famiglia Marson al tuo fianco dal 1986</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
            Agenzia immobiliare a Legnano da oltre 40 anni
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-8 md:mb-10 text-white/90 max-w-4xl mx-auto [text-shadow:_0_1px_3px_rgba(0,0,0,0.8)] font-light leading-relaxed">
            Da oltre 40 anni la famiglia Marson segue personalmente ogni trattativa con la stessa dedizione e serietà. Una presenza storica e familiare sul territorio, per garantire una presenza e continuità rare nel nostro settore
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg px-6 md:px-8 h-12 md:h-14 w-full sm:w-auto">
              <Link to="/vendi-immobile">Richiedi una valutazione</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm text-base md:text-lg px-6 md:px-8 h-12 md:h-14 transition-colors w-full sm:w-auto">
              <Link to="/vendi-immobile">Scopri come vendere bene</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-6 md:py-8 border-b relative z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center md:divide-x divide-border">
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl md:text-3xl font-bold text-primary mb-1">250+</span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">RECENSIONI A 5 STELLE</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl md:text-3xl font-bold text-primary mb-1">6</span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Sedi Operative</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl md:text-3xl font-bold text-primary mb-1">+5000</span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Clienti Soddisfatti</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl md:text-3xl font-bold text-primary mb-1">100%</span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Assistenza Completa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
            <div className="lg:w-1/2 relative w-full">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://vibe.filesafe.space/1775806180627333208/attachments/f744fb91-f248-4ee7-bdac-e1283b27a882.png" 
                  alt="Vetrina Marson Immobiliare" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 md:-bottom-6 md:-right-6 md:w-48 md:h-48 bg-primary rounded-2xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 md:-top-6 md:-left-6 md:w-48 md:h-48 bg-secondary rounded-2xl -z-10"></div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                <Users className="h-4 w-4" /> Una storia di famiglia
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Dietro Marson ci sono persone, non solo un agenzia.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Marson Immobiliare non è solo un'agenzia, è la storia di una famiglia che dal 1986 mette la propria firma su ogni compravendita. Abbiamo scelto di non essere una catena impersonale, ma di restare una realtà autentica dove il rapporto umano, la relazione con il cliente e la continuità sono i valori più preziosi.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Affidarsi a noi significa parlare con persone che conoscono ogni angolo di questo territorio e che vi affiancano con l'esperienza tramandata da oltre 40 anni di attività ininterrotta.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" size="lg" className="group">
                  <Link to="/chi-siamo">
                    Scopri la nostra storia <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Contatti */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Parliamo del tuo immobile
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed">
                Conosciamo questo territorio, le sue dinamiche e le persone che lo vivono ogni giorno.
                Per questo possiamo offrirti un supporto diretto, concreto e costruito sull'esperienza reale.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Chiamaci</p>
                    <a href="tel:+393351333080" className="text-lg font-semibold hover:text-white/80 transition-colors">
                      +39 335 133 3080
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Vieni a trovarci</p>
                    <p className="text-lg font-semibold">6 Sedi nel Legnanese</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <ContactForm 
                title="Come possiamo aiutarti?"
                subtitle="Compila il modulo per essere ricontattato da un nostro consulente."
                context="Homepage Contatti"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Recensioni */}
      <ReviewsWidget />

      {/* Immobili in evidenza */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">I Nostri Immobili</h2>
              <p className="text-muted-foreground">Una selezione delle nostre migliori proposte sul territorio.</p>
            </div>
            <Button variant="outline" className="shrink-0" asChild>
              <Link to="/vendita">Vedi tutti gli immobili <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-md bg-white">
                  <Skeleton className="h-56 w-full rounded-none" />
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-1/3 mt-4" />
                  </CardContent>
                </Card>
              ))
            ) : featuredProperties.length > 0 ? (
              featuredProperties.map((property) => (
                <Card key={property.id} className="relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col group">
                  <Link to={`/immobile/${property.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">Vedi dettagli</span>
                  </Link>
                  <div className="relative h-56 shrink-0">
                    <img src={property.mainImage} alt={property.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded shadow capitalize">
                      {String(property.contract).toLowerCase()}
                    </div>
                  </div>
                  <CardContent className="p-5 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2">{property.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-4 gap-4">
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5 text-primary/60"/> {property.location}</span>
                      <span className="flex items-center"><Building className="h-4 w-4 mr-1.5 text-primary/60"/> {property.type}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 relative z-20">
                      <span className="text-xl font-bold text-primary">
                        {typeof property.price === 'number' ? `€ ${(property.price as number).toLocaleString('it-IT')}` : property.price}
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10" asChild>
                        <Link to={`/immobile/${property.id}`}>Scopri</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground col-span-3 text-center py-8">Nessun immobile in evidenza al momento.</p>
            )}
          </div>
        </div>
      </section>

      {/* Le Nostre Sedi */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Le Nostre Sedi sul Territorio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Siamo l'agenzia più radicata della zona. Trova la sede più vicina a te o all'immobile che vuoi proporci.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {offices.map((office, i) => (
              <Card key={i} className="border border-border/50 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md overflow-hidden flex flex-col">
                <div className="aspect-square w-full relative overflow-hidden bg-muted/20 flex items-center justify-center">
                  <img 
                    src={office.images[0]} 
                    alt={`Agenzia immobiliare Marson sede di ${office.city} - Vetrina principale`} 
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 p-4"
                  />
                  <div className="absolute top-4 left-4 bg-white shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-base font-bold text-primary uppercase tracking-wide">{office.city}</span>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="space-y-3 text-sm text-muted-foreground flex-grow">
                    <p className="font-medium text-foreground">{office.address}</p>
                    <div className="pt-2">
                      <p className="flex items-center justify-between">
                        <span className="text-muted-foreground">Telefono:</span>
                        <a href={`tel:${office.phone?.replace(/\s/g, '') || ''}`} className="font-semibold text-foreground hover:text-primary transition-colors">{office.phone}</a>
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6" asChild>
                    <Link to={`/sede/${office.slug}`}>Scopri di più</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
