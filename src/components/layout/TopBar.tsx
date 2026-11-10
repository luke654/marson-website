import { useEffect, useState } from "react";
import { ArrowRight, Briefcase, Landmark, type LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CandidaturaForm, candidaturaDialogClass } from "@/components/CandidaturaForm";
import { ContactForm } from "@/components/ContactForm";

/** Secondi per messaggio prima di passare al successivo. */
const ROTATE_MS = 6000;

type Message = {
  key: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  cta: string;
};

const MESSAGES: Message[] = [
  {
    key: "candidatura",
    icon: Briefcase,
    title: "Cerchiamo consulenti immobiliari",
    detail: " per le nostre 6 sedi",
    cta: "Candidati ora",
  },
  {
    key: "mutuo",
    icon: Landmark,
    title: "Consulenza mutuo gratuita",
    detail: " con il nostro broker convenzionato",
    cta: "Richiedi ora",
  },
];

/**
 * Barra in cima al sito: i messaggi si alternano ogni 6 secondi (si ferma
 * quando il mouse è sopra o un modulo è aperto). Ogni messaggio apre il suo
 * modulo: candidatura o consulenza mutuo.
 */
export function TopBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    if (paused || openKey) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, openKey]);

  return (
    <div
      className="relative bg-primary text-primary-foreground overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {MESSAGES.map((m, i) => {
        const Icon = m.icon;
        const active = i === index;
        return (
          <Dialog key={m.key} open={openKey === m.key} onOpenChange={(open) => setOpenKey(open ? m.key : null)}>
            <DialogTrigger asChild>
              <button
                type="button"
                tabIndex={active ? 0 : -1}
                aria-hidden={!active}
                className={`group w-full py-2.5 text-sm md:text-base transition-opacity duration-500 ${
                  active ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
                }`}
              >
                <span className="container mx-auto px-4 flex items-center justify-center gap-3">
                  <Icon className="hidden sm:block h-4 w-4 shrink-0" />
                  <span>
                    <strong className="font-bold">{m.title}</strong>
                    <span className="hidden sm:inline">{m.detail}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white text-primary font-bold rounded-full px-3 py-1 text-xs md:text-sm shadow-sm group-hover:bg-white/90 transition-colors whitespace-nowrap">
                    {m.cta} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </span>
              </button>
            </DialogTrigger>
            {m.key === "candidatura" ? (
              <DialogContent className={candidaturaDialogClass}>
                <DialogTitle className="sr-only">Candidatura</DialogTitle>
                <CandidaturaForm />
              </DialogContent>
            ) : (
              <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-lg">
                <DialogTitle className="sr-only">Consulenza mutuo</DialogTitle>
                <ContactForm
                  title="Consulenza mutuo gratuita"
                  subtitle="Lasciaci i tuoi dati: ti ricontattiamo per capire insieme il mutuo più adatto a te."
                  context="Consulenza mutuo"
                  defaultMessage="Vorrei una consulenza mutuo gratuita."
                  submitText="Richiedi la consulenza"
                />
              </DialogContent>
            )}
          </Dialog>
        );
      })}
    </div>
  );
}
