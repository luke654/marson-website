import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { offices } from "@/data/offices";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";


export default function DoveSiamo() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <SEOHead 
        title="Dove Siamo | Marson Immobiliare" 
        description="Vieni a trovarci nelle nostre sedi. Un team di professionisti è pronto ad accoglierti per ogni tua esigenza immobiliare."
        canonical="/dove-siamo"
        schemaJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Marson Immobiliare Sedi",
          "url": "https://marson.it/dove-siamo",
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
      {/* Hero */}
      <section className="bg-primary pt-20 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dove Siamo</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Vieni a trovarci nelle nostre sedi. Un team di professionisti è pronto ad accoglierti per ogni tua esigenza immobiliare.
          </p>
        </div>
      </section>



      {/* Offices Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office, i) => (
            <Card key={i} className="border-border/50 hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
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
              <CardContent className="p-8 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-4">
                  Sede di {office.city}
                </h2>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Indirizzo</p>
                      <p className="text-muted-foreground">{office.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Contatti</p>
                      <p className="text-muted-foreground">
                        Tel: <a href={`tel:${office.phone?.replace(/\s/g, '') || ''}`} className="hover:text-primary transition-colors">{office.phone}</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <Button className="w-full" asChild>
                    <Link to={`/sede/${office.slug}`}>Scopri la sede <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
