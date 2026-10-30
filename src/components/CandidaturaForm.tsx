import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { offices } from "@/data/offices";
import { cn } from "@/lib/utils";
import { FUSION_FORMS, normalizePhone, submitFusionForm } from "@/lib/fusionForms";

const STEP_TITLES = ["Il tuo profilo", "Dove e come", "I tuoi contatti"];

const EMPTY = {
  esperienza: "",
  rea: "",
  sede: "",
  disponibilita: "",
  nome: "",
  telefono: "",
  email: "",
  privacy: false,
};

function Choice({ options, value, onChange }: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "h-11 md:h-10 px-4 rounded-lg border text-sm font-medium transition-colors",
            value === option
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input bg-white hover:border-primary/50"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function CandidaturaForm() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAt = useRef(Date.now());

  const next = () => {
    if (step === 1 && !data.esperienza) {
      toast.error("Indica la tua esperienza per proseguire");
      return;
    }
    if (step === 2 && !data.sede) {
      toast.error("Scegli una sede per proseguire");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      next();
      return;
    }
    if (!data.nome || !data.telefono || !data.privacy) {
      toast.error("Compila nome, telefono e accetta la privacy");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitFusionForm(FUSION_FORMS.candidatura, {
        esperienza: data.esperienza,
        iscrizione_rea: data.rea,
        sede_preferita: data.sede,
        disponibilita: data.disponibilita,
        fullName: data.nome,
        phone: normalizePhone(data.telefono),
        email: data.email,
        provenienza: window.location.pathname,
      }, startedAt.current);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Si è verificato un errore. Riprova.");
      return;
    } finally {
      setIsSubmitting(false);
    }
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">Candidatura inviata!</h3>
        <p className="text-muted-foreground">Grazie {data.nome.split(" ")[0]}, ti contatteremo a breve per conoscerti.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl w-full">
      <h3 className="text-2xl font-bold mb-1">Entra nel team Marson</h3>
      <p className="text-muted-foreground text-sm mb-5">Tre domande veloci, ci vuole meno di un minuto.</p>

      <div className="space-y-2 mb-5">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Passo {step} di 3</span>
          <span>{STEP_TITLES[step - 1]}</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {step > 1 && (
          <Button type="button" variant="ghost" size="sm" onClick={() => setStep(step - 1)} className="text-muted-foreground -ml-3 -mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Indietro
          </Button>
        )}

        {step === 1 && (
          <div key="c1" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Che esperienza hai? *</label>
              <Choice
                options={["Consulente immobiliare", "Altro settore commerciale", "Prima esperienza"]}
                value={data.esperienza}
                onChange={(v) => setData({ ...data, esperienza: v })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Sei iscritto al REA per la mediazione immobiliare?</label>
              <Choice
                options={["Sì", "In corso", "No"]}
                value={data.rea}
                onChange={(v) => setData({ ...data, rea: v })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div key="c2" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">In quale sede ti piacerebbe lavorare? *</label>
              <Choice
                options={[...offices.map((o) => o.city), "Indifferente"]}
                value={data.sede}
                onChange={(v) => setData({ ...data, sede: v })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Disponibilità</label>
              <Choice
                options={["Full time", "Part time"]}
                value={data.disponibilita}
                onChange={(v) => setData({ ...data, disponibilita: v })}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div key="c3" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Nome e Cognome *</label>
              <Input
                autoFocus
                autoComplete="name"
                placeholder="Il tuo nome completo"
                className="h-12 text-base md:h-10 md:text-sm"
                value={data.nome}
                onChange={(e) => setData({ ...data, nome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Telefono *</label>
              <Input
                type="tel"
                autoComplete="tel"
                placeholder="Es. 333 1234567"
                className="h-12 text-base md:h-10 md:text-sm"
                value={data.telefono}
                onChange={(e) => setData({ ...data, telefono: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium">Email</label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="nome@email.it"
                className="h-12 text-base md:h-10 md:text-sm"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="flex items-start space-x-2 pt-1">
              <Checkbox
                id="privacy-candidatura"
                className="w-5 h-5 md:w-4 md:h-4 mt-0.5"
                checked={data.privacy}
                onCheckedChange={(c) => setData({ ...data, privacy: c as boolean })}
              />
              <label htmlFor="privacy-candidatura" className="text-sm md:text-xs leading-tight text-muted-foreground mt-0.5">
                Ho letto e accetto la <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link> *
              </label>
            </div>
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg md:h-12 md:text-base shadow-md">
          {step < 3 ? <>Avanti <ArrowRight className="ml-2 h-4 w-4" /></> : "Invia candidatura"}
        </Button>
      </form>
    </div>
  );
}

/** Contenuto del dialog: da usare dentro <DialogContent>. */
export const candidaturaDialogClass = "p-0 border-none bg-transparent shadow-none max-w-lg max-h-[90vh] overflow-y-auto";
