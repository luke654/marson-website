import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SEOHead } from "@/components/SEOHead";

interface RecensioniProps {
  forcedSede?: string;
}

export default function Recensioni({ forcedSede }: RecensioniProps) {
  const { sede: paramSede } = useParams();
  const sede = forcedSede || paramSede;
  const [copied, setCopied] = useState(false);
  
  const getSedeData = () => {
    switch(sede) {
      case "legnano": return { name: "Legnano", url: "https://www.google.com/maps/place/IMMOBILIARE+MARSON+ufficio+di+LEGNANO/@45.5876277,8.905953,15z/data=!4m12!1m2!2m1!1smarson+immobiliare+legnano!3m8!1s0x47868da3d61b814b:0xa01e65643d2b7aeb!8m2!3d45.5983192!4d8.920568!9m1!1b1!15sChptYXJzb24gaW1tb2JpbGlhcmUgbGVnbmFub5IBEnJlYWxfZXN0YXRlX2FnZW50c-ABAA!16s%2Fg%2F1tfvg2g7?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D" };
      case "canegrate": return { name: "Canegrate", url: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20Canegrate&query_place_id=ChIJT9S_Pkh-rCERP58_Q-SH6sI" };
      case "sangiorgio": return { name: "San Giorgio su Legnano", url: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20San%20Giorgio%20su%20Legnano&query_place_id=ChIJX23KrE8EBRMLX23KrE8EBBM" };
      case "sanvittoreolona": return { name: "San Vittore Olona", url: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20San%20Vittore%20Olona&query_place_id=ChIJvHEBM-O-JXvHEBM-JXvHEBM" };
      case "villacortese": return { name: "Villa Cortese", url: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20Villa%20Cortese&query_place_id=ChIJLvEBM_W_6mURCWYVI37DJkI" };
      case "bustogarolfo": return { name: "Busto Garolfo", url: "https://www.google.com/maps/search/?api=1&query=Marson%20Immobiliare%20Busto%20Garolfo&query_place_id=ChIJfcEBMzKzd5URCVcSKzoys3c" };
      default: return { name: "", url: "#" };
    }
  };

  const { name: sedeName, url: reviewUrl } = getSedeData();

  // Auto-redirect removed as requested

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(reviewUrl);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      // Fallback for environments where Clipboard API is blocked (e.g. iframes)
      const textArea = document.createElement("textarea");
      textArea.value = reviewUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (fallbackErr) {
        console.error('Fallback copy failed', fallbackErr);
      }
      textArea.remove();
    }
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <SEOHead 
        title={`Lascia una recensione per la sede di ${sedeName || 'Marson Immobiliare'} | Marson Immobiliare`}
        description="Grazie per aver scelto Marson Immobiliare. La tua recensione ci aiuta a crescere."
        noIndex={true}
      />
      <div className="w-full max-w-lg text-center space-y-10">
        <div className="flex justify-center mb-8">
          <img 
            src="https://vibe.filesafe.space/1775806180627333208/attachments/be05420e-9c6d-4154-953f-04427c1c308e.png" 
            alt="Marson Immobiliare" 
            className="h-20 w-auto object-contain"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0000FF] tracking-tight">
            La tua opinione conta
          </h1>
          {sedeName && (
            <p className="text-xl text-[#0000FF] font-semibold">Sede di {sedeName}</p>
          )}
          <p className="text-gray-600 max-w-sm mx-auto">
            Grazie per aver scelto Marson Immobiliare. La tua recensione ci aiuta a crescere.
          </p>
        </div>

        <div className="flex justify-center gap-2 py-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-12 w-12 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <div className="pt-4 flex flex-col gap-6">
          <Button 
            onClick={() => {
              window.location.href = reviewUrl;
            }}
            className="w-full py-16 text-2xl md:text-4xl font-bold rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center bg-[#0000FF] text-white uppercase text-center px-4 h-auto"
          >
            LASCIA RECENSIONE
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500 font-medium">
              Stiamo aprendo la pagina delle recensioni...
            </p>
            <p className="text-xs text-gray-400">
              Se non si apre automaticamente, clicca il pulsante sopra o copia il link qui sotto.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs text-gray-500 border-gray-200"
            onClick={handleCopy}
          >
            {copied ? "Link copiato!" : "Copia link manuale"}
          </Button>
        </div>
      </div>
    </div>
  );
}
