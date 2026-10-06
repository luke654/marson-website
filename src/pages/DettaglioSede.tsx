import { useParams, Link } from "react-router-dom";
import { offices } from "@/data/offices";
import { MapPin, Phone, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SEOHead } from "@/components/SEOHead";
import { ContactForm } from "@/components/ContactForm";


export default function DettaglioSede() {
  const { slug } = useParams();
  const office = offices.find(o => o.slug === slug);





  if (!office) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Sede non trovata</h1>
        <Button asChild>
          <Link to="/dove-siamo">Torna alle Sedi</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead 
        title={`Agenzia Immobiliare a ${office.city} | Marson Immobiliare`}
        description={`Cerchi casa a ${office.city}? Affidati a Marson Immobiliare, la tua agenzia di fiducia in ${office.address}. Scopri i nostri servizi di compravendita e locazione.`}
        canonical={`/sede/${office.slug}`}
        schemaJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": `Marson Immobiliare ${office.city}`,
          "image": office.images[0],
          "@id": `https://marson.it/sede/${office.slug}`,
          "url": `https://marson.it/sede/${office.slug}`,
          "telephone": office.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": office.address,
            "addressLocality": office.city,
            "addressCountry": "IT"
          }
        })}
      />
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 mb-6" asChild>
            <Link to="/dove-siamo"><ArrowLeft className="mr-2 h-4 w-4" /> Tutte le sedi</Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenzia immobiliare a {office.city}</h1>
          <p className="text-xl text-primary-foreground/90 flex items-center gap-2">
            <MapPin className="h-5 w-5" /> {office.address}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Col: Info & Slider */}
            <div className="lg:col-span-2 space-y-12">
              {/* Slider */}
              <div>
                <h2 className="text-2xl font-bold mb-6">La nostra sede</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {office.images.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted/10 flex items-center justify-center">
                          <img src={img} alt={`Agenzia immobiliare Marson sede di ${office.city} - Foto vetrina e uffici ${idx + 1}`} className="w-full h-full object-contain" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>

              {/* SEO Text */}
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Vendita e affitto case a {office.city}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{office.seoText.description}</p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Affidarsi alla nostra sede di {office.city} significa scegliere un team di professionisti che vive e respira il mercato locale ogni giorno. Che tu voglia vendere, comprare o affittare, ti garantiamo un'assistenza completa e personalizzata dalla prima valutazione fino al rogito o alla stipula del contratto.
                </p>
              </div>
            </div>

            {/* Right Col: Contact Form */}
            <div className="space-y-6 sticky top-24">
              <div className="space-y-4">
                <a href={`tel:${office.phone?.replace(/\s/g, '') || ''}`} className="flex items-center gap-4 p-4 bg-white border border-border/50 shadow-sm rounded-2xl hover:bg-muted/50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Chiama la sede</div>
                    <div className="font-semibold text-lg">{office.phone}</div>
                  </div>
                </a>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = office.reviewUrl}
                  className="w-full flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-100 rounded-2xl hover:bg-yellow-100 transition-colors text-left h-auto group"
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0 group-hover:bg-yellow-200 transition-colors">
                    <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-yellow-700">Google My Business</div>
                    <div className="font-semibold text-yellow-900">Lascia una recensione</div>
                  </div>
                </Button>
              </div>

              <ContactForm 
                title="Contatta questa sede" 
                subtitle={`Invia un messaggio diretto alla sede di ${office.city}.`}
                context={`Sede di ${office.city}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Dove trovarci a {office.city}</h2>
              <p className="text-muted-foreground mt-2 text-lg">Vieni a trovarci in {office.address}</p>
            </div>
            <Button asChild variant="outline" size="lg" className="shrink-0 gap-2 w-full md:w-auto">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
              >
                <MapPin className="h-5 w-5" />
                Apri in Google Maps
              </a>
            </Button>
          </div>
          <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md border border-border/50 relative">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(office.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mappa agenzia immobiliare Marson a ${office.city}`}
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}