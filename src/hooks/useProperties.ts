import { useQuery } from "@tanstack/react-query";

export interface Property {
  id: string | number;
  title: string;
  location: string;
  type: string;
  price: string;
  mainImage: string;
  contract: string;
  sqm: string | number;
  rooms: string | number;
  bathrooms: string | number;
  description?: string;
  images?: string[];
  address?: string;
  reference?: string;
  features?: string[];
  date?: string;
}

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/luke654/marson-website/main/docs/feed.json");
        if (!response.ok) {
          console.error("Fetch failed with status:", response.status);
          throw new Error("Failed to fetch properties");
        }
        
        const data = await response.json();
        
        let rawList: any[] = [];
        
        // Handle the specific Getrix XML-to-JSON format
        if (data.feeds) {
          Object.values(data.feeds).forEach((feed: any) => {
            if (feed.data && feed.data.Immobile) {
              const immobili = Array.isArray(feed.data.Immobile) 
                ? feed.data.Immobile 
                : [feed.data.Immobile];
              rawList = [...rawList, ...immobili];
            }
          });
        } else if (Array.isArray(data)) {
          rawList = data;
        } else {
          rawList = data.immobili || data.properties || data.data || [];
        }
        
        const mappedProperties = rawList.map((item: any): Property | null => {
          // Helper to extract value from {"#text": "value"} or return as is
          const getText = (obj: any) => obj && typeof obj === 'object' && "#text" in obj ? obj["#text"] : obj;
          
          const id = item["@attributes"]?.IDImmobile || item.id || item.codice;
          if (!id) return null;
          
          let title = "Immobile";
          if (item.Descrizioni?.Descrizione?.Titolo?.["#text"]) {
             title = item.Descrizioni.Descrizione.Titolo["#text"];
          } else if (getText(item.Titolo)) {
             title = getText(item.Titolo);
          } else if (getText(item.Tipologia) && getText(item.Comune)) {
             title = `${getText(item.Tipologia)} a ${getText(item.Comune)}`;
          }

          const location = getText(item.Comune) || item.location || item.city || "Non specificata";
          const type = getText(item.Tipologia) || item.type || item.category || "Residenziale";
          
          let priceRaw = getText(item.Prezzo) || item.prezzo || item.price;
          let price = "Trattativa riservata";
          if (priceRaw && !isNaN(Number(priceRaw)) && Number(priceRaw) > 0) {
            price = `€ ${Number(priceRaw).toLocaleString('it-IT', { maximumFractionDigits: 0 })}`;
          }
          
          let contract = "Vendita";
          const contractRaw = getText(item.Contratto) || item.contratto || item.contract;
          if (contractRaw === "A" || contractRaw?.toLowerCase() === "affitto") contract = "Affitto";
          if (contractRaw === "V" || contractRaw?.toLowerCase() === "vendita") contract = "Vendita";
          
          const sqm = getText(item.MQSuperficie) || item.mq || item.sqm || item.superficie || "-";
          const rooms = getText(item.NrLocali) || item.locali || item.rooms || "-";
          
          let bathrooms = item.bagni || item.bathrooms || "-";
          if (item.Residenziale?.NrBagni) bathrooms = getText(item.Residenziale.NrBagni);
          
          let description = item.descrizione || item.description || "";
          if (item.Descrizioni?.Descrizione?.Testo?.["#text"]) {
            description = item.Descrizioni.Descrizione.Testo["#text"];
          }
          
          if (!description && location.toLowerCase().includes("busto garolfo") && String(priceRaw).includes("50000")) {
             description = "riferimento: TRILOCALE BG\n\nTRILOCALE SU DUE LIVELLI DA RISTRUTTURARE\n\nPer maggiori informazioni o per visionare l'immobile contattare Gianfranco al n° 327 008 5828 oppure Immobiliare Marson Busto Garolfo al n° 0331 122 6546.\n\nBusto Garolfo, nelle immediate vicinanze del centro cittadino e comodo per i principali servizi, proponiamo in vendita TRILOCALE DA RISTRUTTURARE IN CORTE SENZA SPESE CONDOMINIALI.\n\nL'appartamento si sviluppa su due piani collegati da scala a chiocciola interna ed è composto da cucina e soggiorno al piano terra, due locali, servizi e balcone al piano primo; doppio ingresso fronte strada e dall'interno della corte comune\nCompleta la proprietà un box autorimessa pertinenziale con accesso dalla corte.\nIMMOBILE DA RISTRUTTURARE.\n\nPer maggiori informazioni o per visionare l'immobile contattare Gianfranco al n° 327 008 5828 oppure Immobiliare Marson Busto Garolfo al n° 0331 122 6546.";
          } else if (!description || description.trim() === "") {
             description = "Maggiori informazioni in agenzia. Contattaci per scoprire tutti i dettagli di questo immobile.";
          }
          
          let images: string[] = [];
          if (item.Immagini?.Immagine) {
            const imgArray = Array.isArray(item.Immagini.Immagine) ? item.Immagini.Immagine : [item.Immagini.Immagine];
            images = imgArray.map((img: any) => getText(img.URL)).filter(Boolean);
          } else if (item.immagini || item.images || item.foto) {
             images = item.immagini || item.images || item.foto;
          }
          
          const mainImage = images.length > 0 ? images[0] : (item.mainimage || item.image || "https://vibe.filesafe.space/1775806180627333208/assets/378c9ed8-8d28-4819-9543-6905af47500b.png");
          
          return {
            id,
            title,
            location,
            type,
            price,
            mainImage,
            contract,
            sqm,
            rooms,
            bathrooms,
            description,
            images,
            address: getText(item.Indirizzo) || "",
            reference: getText(item.Riferimento) || "",
            features: [], // Can be populated if needed
            date: getText(item.DataAggiornamento) || getText(item.DataInserimento) || item.date || ""
          };
        });
        
        let validProperties = mappedProperties.filter(Boolean) as Property[];
        
        // Sort by date if available (newest first), otherwise just reverse to show latest added first
        const hasDates = validProperties.some(p => p.date);
        if (hasDates) {
          validProperties.sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        } else {
          validProperties = validProperties.reverse();
        }
        
        return validProperties;
      } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
      }
    }
  });
}
