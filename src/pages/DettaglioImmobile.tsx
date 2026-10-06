import { useParams, Link } from "react-router-dom";
import { useProperties } from "@/hooks/useProperties";

import { Button } from "@/components/ui/button";
import { MapPin, Home, Maximize, ArrowLeft, Phone, Mail, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ContactForm } from "@/components/ContactForm";
import { SEOHead } from "@/components/SEOHead";

export default function DettaglioImmobile() {
  const { id } = useParams();
  const { data: properties = [], isLoading } = useProperties();
  
  const property = properties.find(p => String(p.id) === String(id));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <Skeleton className="h-96 w-full rounded-xl mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-5/6" />
            <Skeleton className="h-8 w-4/6" />
          </div>
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Immobile non trovato</h1>
        <p className="text-muted-foreground mb-8">L'immobile che stai cercando non esiste o è stato rimosso.</p>
        <Button asChild>
          <Link to="/">Torna alla Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/10 pb-20">
      <SEOHead 
        title={`${property.title} | Marson Immobiliare`}
        description={property.description?.substring(0, 160) || property.title}
        canonical={`/immobile/${property.id}`}
        ogImage={property.mainImage}
      />
      {/* Header */}
      <div className="bg-primary pt-10 pb-6 text-white">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6 -ml-4" asChild>
            <Link to={property.contract === 'Vendita' ? '/vendita' : '/affitto'}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Torna agli immobili
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded text-sm font-semibold mb-3 shadow-sm">
                {property.contract}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
              <p className="text-primary-foreground/80 flex items-center text-lg">
                <MapPin className="mr-2 h-5 w-5" /> {property.location} {property.address && `- ${property.address}`}
              </p>
            </div>
            <div className="text-3xl font-bold bg-white text-primary px-6 py-3 rounded-lg shadow-lg">
              {typeof property.price === 'number' ? `€ ${(property.price as number).toLocaleString('it-IT')}` : property.price}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="rounded-xl overflow-hidden shadow-lg bg-white relative group">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {property.images && property.images.length > 0 ? (
                    property.images.map((img, i) => (
                      <CarouselItem key={i}>
                        <div className="aspect-[4/3] relative bg-muted/10 flex items-center justify-center rounded-xl overflow-hidden">
                          <img src={img} alt={`${property.title} - Foto ${i + 1}`} className="w-full h-full object-contain" />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="aspect-[4/3] relative bg-muted/10 flex items-center justify-center rounded-xl overflow-hidden">
                        <img src={property.mainImage} alt={property.title} className="w-full h-full object-contain" />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                {property.images && property.images.length > 1 && (
                  <>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary border-0 shadow-md h-10 w-10 flex items-center justify-center opacity-100" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary border-0 shadow-md h-10 w-10 flex items-center justify-center opacity-100" />
                  </>
                )}
              </Carousel>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Home className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Tipologia</span>
                  <span className="font-semibold">{property.type}</span>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Maximize className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Superficie</span>
                  <span className="font-semibold">{property.sqm ? `${property.sqm} mq` : 'N/D'}</span>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-primary font-bold text-xl mb-1">{property.rooms || '-'}</div>
                  <span className="text-sm text-muted-foreground">Locali</span>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-primary font-bold text-xl mb-1">{property.bathrooms || '-'}</div>
                  <span className="text-sm text-muted-foreground">Bagni</span>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Descrizione</h2>
                <div className="prose prose-blue max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.description}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Caratteristiche</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar / Contact */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Ti interessa questo immobile?</h3>
                
                <div className="space-y-4 mb-8">
                  <Button className="w-full h-12 text-base" asChild>
                    <a href="tel:+393351333080">
                      <Phone className="mr-2 h-5 w-5" /> Chiama ora
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full h-12 text-base border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white" asChild>
                    <a href="https://wa.me/393351333080" target="_blank" rel="noreferrer">
                      Scrivici su WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Oppure invia un messaggio</span>
                  </div>
                </div>

                <ContactForm 
                  source={`Dettaglio Immobile: ${property.title} (${property.id})`}
                  defaultMessage={`Salve, vorrei maggiori informazioni sull'immobile Rif. ${property.reference || property.id} a ${property.location}.`}
                  submitText="Invia Richiesta"
                  className="mt-6"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}