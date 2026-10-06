import { ShieldCheck } from "lucide-react";

export function TutelaSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/50 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-3xl"></div>
              <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-2xl shadow-xl flex items-center justify-center p-6 md:p-8 relative z-10 border border-border/50">
                <img
                  src="https://vibe.filesafe.space/1775806180627333208/attachments/232d014c-0b7a-4898-bec5-1e556e3c5ab8.png"
                  alt="Vittoria Assicurazioni"
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </div>
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
              <ShieldCheck className="h-5 w-5" /> Garanzia Professionale
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">La vostra tutela, da sempre.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Marson Immobiliare garantisce la massima serietà professionale grazie alla partnership con <strong>Vittoria Assicurazioni</strong>, attiva da oltre 35 anni. In quasi quattro decenni di storia, questa tutela non è mai stata utilizzata: la prova più concreta della precisione e della correttezza con cui la famiglia Marson gestisce ogni singola pratica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
