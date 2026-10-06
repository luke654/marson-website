import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { offices } from "@/data/offices";
import { RecruitingBanner } from "../RecruitingBanner";


export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <RecruitingBanner />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-2 rounded-lg">
              <img 
                src="https://vibe.filesafe.space/1775806180627333208/attachments/be05420e-9c6d-4154-953f-04427c1c308e.png" 
                alt="Marson Immobiliare" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm mt-4 leading-relaxed">
              Dal 1986 la famiglia Marson è il punto di riferimento immobiliare sul territorio. Oltre 40 anni di esperienza, continuità e rapporto umano al servizio dei vostri progetti di casa.
            </p>

          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Link Rapidi</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/chi-siamo" className="text-primary-foreground/80 hover:text-white transition-colors">Chi Siamo</Link></li>
              <li><Link to="/vendita" className="text-primary-foreground/80 hover:text-white transition-colors">Case e Immobili in Vendita</Link></li>
              <li><Link to="/affitto" className="text-primary-foreground/80 hover:text-white transition-colors">Case e Immobili in Affitto</Link></li>
              <li><Link to="/vendi-immobile" className="text-primary-foreground/80 hover:text-white transition-colors font-semibold">Vendi il tuo immobile</Link></li>
              <li><Link to="/dove-siamo" className="text-primary-foreground/80 hover:text-white transition-colors">Le nostre Sedi</Link></li>
              <li><Link to="/contattaci" className="text-primary-foreground/80 hover:text-white transition-colors">Contattaci</Link></li>
            </ul>
          </div>

          {/* Le Nostre Sedi */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-white/20 pb-2 inline-block">Le nostre Sedi</h3>
            <ul className="space-y-4">
              {offices.map((office, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-white/70 shrink-0 mt-0.5" />
                  <div>
                    <Link to={`/sede/${office.slug}`} className="text-primary-foreground/80 text-sm hover:text-white font-medium block">
                      Agenzia Immobiliare {office.city}
                    </Link>
                    <div className="flex gap-3 mt-1 items-center">
                      <a href={`tel:${office.phone?.replace(/\s/g, '') || ''}`} className="text-primary-foreground/60 text-xs hover:text-white">
                        {office.phone}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>


        </div>

        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Immobiliare San Giorgio SRL. Tutti i diritti riservati. P.IVA: 14153210969</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
