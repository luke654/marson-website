import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Home, Maximize, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

import { useProperties } from "@/hooks/useProperties";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";

export default function Affitto() {
  const { data: allProperties = [], isLoading } = useProperties();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("all");
  const [maxPrice, setMaxPrice] = useState("all");
  const [rooms, setRooms] = useState("all");
  const [sortBy, setSortBy] = useState("recenti");

  const properties = allProperties.filter(p => {
    const c = String(p.contract).toLowerCase();
    if (!c.includes('affitto') && !c.includes('rent') && c !== 'a') return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!p.location?.toLowerCase().includes(term) && !p.title?.toLowerCase().includes(term) && !p.address?.toLowerCase().includes(term)) {
        return false;
      }
    }

    if (type !== "all" && p.type) {
      const pType = p.type.toLowerCase();
      if (type === "appartamento" && !pType.includes("appartamento") && !pType.includes("attico") && !pType.includes("monolocale") && !pType.includes("bilocale") && !pType.includes("trilocale") && !pType.includes("quadrilocale")) return false;
      if (type === "villa" && !pType.includes("villa") && !pType.includes("indipendente") && !pType.includes("schiera") && !pType.includes("cascina") && !pType.includes("rustico")) return false;
      if (type === "commerciale" && !pType.includes("commerciale") && !pType.includes("negozio") && !pType.includes("ufficio") && !pType.includes("capannone") && !pType.includes("magazzino") && !pType.includes("laboratorio")) return false;
      if (type === "terreno" && !pType.includes("terreno") && !pType.includes("agricolo") && !pType.includes("edificabile")) return false;
    }

    if (maxPrice !== "all" && p.price) {
      const priceNum = typeof p.price === 'number' ? p.price : Number(String(p.price).replace(/[^0-9]/g, ''));
      if (priceNum > 0) {
        if (maxPrice === "500" && priceNum > 500) return false;
        if (maxPrice === "800" && priceNum > 800) return false;
        if (maxPrice === "1500" && priceNum > 1500) return false;
        if (maxPrice === "2000" && priceNum > 2000) return false;
      }
    }

    if (rooms !== "all" && p.rooms) {
      const roomsNum = Number(String(p.rooms).replace(/[^0-9]/g, ''));
      if (roomsNum > 0) {
        if (rooms === "1" && roomsNum > 1) return false;
        if (rooms === "2" && roomsNum < 2) return false;
        if (rooms === "3" && roomsNum < 3) return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "prezzo_asc" || sortBy === "prezzo_desc") {
      const priceA = typeof a.price === 'number' ? a.price : Number(String(a.price).replace(/[^0-9]/g, ''));
      const priceB = typeof b.price === 'number' ? b.price : Number(String(b.price).replace(/[^0-9]/g, ''));
      if (sortBy === "prezzo_asc") return priceA - priceB;
      if (sortBy === "prezzo_desc") return priceB - priceA;
    }
    return 0;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setType("all");
    setMaxPrice("all");
    setRooms("all");
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <SEOHead 
        title="Immobili in Affitto | Marson Immobiliare" 
        description="Trova la soluzione in affitto più adatta alle tue esigenze, con la sicurezza di un'agenzia che ti tutela."
        canonical="/affitto"
      />
      {/* Hero */}
      <section className="bg-primary pt-20 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Immobili in Affitto</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Trova la soluzione in affitto più adatta alle tue esigenze, con la sicurezza di un'agenzia che ti tutela.
          </p>
        </div>
      </section>

      {/* Search Filters */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Input 
                  placeholder="Località, titolo o indirizzo" 
                  className="bg-muted/50" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="Tipologia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le tipologie</SelectItem>
                    <SelectItem value="appartamento">Appartamento</SelectItem>
                    <SelectItem value="villa">Villa / Indipendente</SelectItem>
                    <SelectItem value="commerciale">Commerciale / Ufficio</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="Canone Massimo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualsiasi prezzo</SelectItem>
                    <SelectItem value="500">Fino a 500 €</SelectItem>
                    <SelectItem value="800">Fino a 800 €</SelectItem>
                    <SelectItem value="1500">Fino a 1.500 €</SelectItem>
                    <SelectItem value="2000">Fino a 2.000 €</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="Locali" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualsiasi</SelectItem>
                    <SelectItem value="1">Monolocale</SelectItem>
                    <SelectItem value="2">Da 2 locali in su</SelectItem>
                    <SelectItem value="3">Da 3 locali in su</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="px-3" title="Resetta Filtri" onClick={resetFilters}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button className="flex-1 md:flex-none px-8" onClick={() => {}}>
                  <Search className="mr-2 h-4 w-4" /> Cerca
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">{properties.length} immobili trovati</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ordina per:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Ordina per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recenti">Più recenti</SelectItem>
                <SelectItem value="prezzo_asc">Canone crescente</SelectItem>
                <SelectItem value="prezzo_desc">Canone decrescente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-border/50 bg-white">
                <Skeleton className="h-60 w-full rounded-none" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-1/3 mt-4" />
                </CardContent>
              </Card>
            ))
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <Card key={property.id} className="relative overflow-hidden border-border/50 hover:shadow-xl transition-shadow flex flex-col group">
                <Link to={`/immobile/${property.id}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Vedi dettagli</span>
                </Link>
                <div className="relative h-60 shrink-0">
                  <img src={property.mainImage} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-bold rounded shadow">
                    Affitto
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2">{property.title}</h3>
                    <div className="flex flex-wrap gap-y-2 text-muted-foreground text-sm mb-4">
                      <span className="flex items-center w-1/2"><MapPin className="h-4 w-4 mr-1.5 text-primary/60"/> {property.location}</span>
                      <span className="flex items-center w-1/2"><Home className="h-4 w-4 mr-1.5 text-primary/60"/> {property.type}</span>
                      {property.sqm && <span className="flex items-center w-1/2"><Maximize className="h-4 w-4 mr-1.5 text-primary/60"/> {property.sqm} mq</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50 relative z-20">
                    <span className="text-xl font-bold text-primary">
                        {typeof property.price === 'number' ? `€ ${(property.price as number).toLocaleString('it-IT')}` : property.price}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/immobile/${property.id}`}>Scopri</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              Nessun immobile in affitto trovato con i filtri selezionati.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Vuoi affittare il tuo immobile?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Affidati a noi per trovare l'inquilino ideale. Selezioniamo referenze e garantiamo contratti sicuri.
          </p>
          <Button size="lg" asChild>
            <Link to="/contattaci">Proponi Immobile</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
