import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ReviewBadge } from "./ReviewBadge";
import { FUSION_FORMS, normalizePhone, submitFusionForm } from "@/lib/fusionForms";

const VALUATION_STEPS = 4;
const VALUATION_STEP_TITLES = ["L'immobile", "Caratteristiche", "Prezzo e tempistica", "I tuoi contatti"];

function OptionChips({ options, value, onChange }: {
  options: string[][];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([optionValue, label]) => (
        <button
          key={optionValue}
          type="button"
          onClick={() => onChange(value === optionValue ? "" : optionValue)}
          className={cn(
            "min-w-[3rem] h-11 md:h-10 px-4 rounded-lg border text-sm font-medium transition-colors",
            value === optionValue
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input bg-white hover:border-primary/50"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  context?: string;
  hideMessage?: boolean;
  source?: string;
  submitText?: string;
  className?: string;
  defaultMessage?: string;
  showValuationFields?: boolean;
  valuationForm?: boolean;
}

export function ContactForm({ 
  title = "Richiedi Informazioni", 
  subtitle = "Compila il modulo e ti ricontatteremo il prima possibile.",
  context = "Generale",
  hideMessage = false,
  source,
  submitText,
  className,
  defaultMessage,
  showValuationFields,
  valuationForm = false
}: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [valStep, setValStep] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cambiando step la card si accorcia: se l'inizio è finito sopra lo schermo, lo riportiamo in vista
  useEffect(() => {
    const card = cardRef.current;
    if (valStep > 1 && card && card.getBoundingClientRect().top < 140) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [valStep]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAt = useRef(Date.now());
  const [formData, setFormData] = useState({
    comune: "",
    indirizzo: "",
    interesse: "",
    nome: "",
    telefono: "",
    email: "",
    messaggio: "",
    metratura: "",
    locali: "",
    ristrutturato: "",
    piano: "",
    giardino: "",
    pertinenze: "",
    tempistica: "",
    prezzo: "",
    privacy: false,
    marketing: false
  });

  const handleNext = () => {
    if (!formData.comune || !formData.interesse) {
      toast.error("Seleziona comune e interesse per proseguire");
      return;
    }
    setStep(2);
  };

  const handleValuationNext = () => {
    if (valStep === 1 && (!formData.indirizzo || !formData.metratura)) {
      toast.error("Inserisci indirizzo e metratura per proseguire");
      return;
    }
    setValStep(valStep + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Invio da tastiera negli step intermedi: si va avanti invece di inviare
    if (valuationForm && valStep < VALUATION_STEPS) {
      if (valStep < 3) handleValuationNext();
      return;
    }
    if (!formData.nome || !formData.telefono || !formData.privacy) {
      toast.error("Compila nome, telefono e accetta la privacy");
      return;
    }
    if (valuationForm && (!formData.indirizzo || !formData.metratura || !formData.tempistica)) {
      toast.error("Compila indirizzo, metratura e tempistica di vendita");
      return;
    }
    
    const values: Record<string, string | boolean> = {
      fullName: formData.nome,
      phone: normalizePhone(formData.telefono),
      email: formData.email,
      consenso_marketing: formData.marketing,
      provenienza: [source || context, window.location.pathname].join(" – "),
    };
    if (valuationForm) {
      Object.assign(values, {
        indirizzo_immobile: formData.indirizzo,
        metratura: formData.metratura,
        numero_locali: formData.locali,
        immobile_ristrutturato: formData.ristrutturato,
        piano: formData.piano,
        giardino: formData.giardino,
        pertinenze: formData.pertinenze,
        tempistica_vendita: formData.tempistica,
        prezzo_richiesto: formData.prezzo,
      });
    } else {
      Object.assign(values, {
        comune_immobile: formData.comune,
        interesse: formData.interesse,
        messaggio: formData.messaggio || defaultMessage || "",
      });
    }

    setIsSubmitting(true);
    try {
      await submitFusionForm(valuationForm ? FUSION_FORMS.valutazione : FUSION_FORMS.contatti, values, startedAt.current);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Si è verificato un errore. Riprova.");
      return;
    } finally {
      setIsSubmitting(false);
    }

    setIsSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setValStep(1);
      setFormData({
        comune: "",
    indirizzo: "",
        interesse: "",
        nome: "",
        telefono: "",
        email: "",
        messaggio: "",
        metratura: "",
        locali: "",
        ristrutturato: "",
        piano: "",
        giardino: "",
        pertinenze: "",
        tempistica: "",
    prezzo: "",
        privacy: false,
        marketing: false
      });
    }, 4000);
  };

  return (
    <div ref={cardRef} className="scroll-mt-36 bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-border/50 w-full max-w-lg mx-auto">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">Richiesta Inviata!</h3>
          <p className="text-muted-foreground">Grazie per averci contattato. Un nostro consulente ti risponderà il prima possibile.</p>
        </div>
      ) : (
        <>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">{subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {valuationForm ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>Passo {valStep} di {VALUATION_STEPS}</span>
                    <span>{VALUATION_STEP_TITLES[valStep - 1]}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(valStep / VALUATION_STEPS) * 100}%` }} />
                  </div>
                </div>

                {valStep > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setValStep(valStep - 1)} className="text-muted-foreground -ml-3 -mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Indietro
                  </Button>
                )}

                {valStep === 1 && (
                  <div key="v1" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Indirizzo dell'immobile *</label>
                      <Input
                        autoFocus
                        autoComplete="street-address"
                        placeholder="Es. Via Roma 12, Legnano"
                        className="h-12 text-base md:h-10 md:text-sm"
                        value={formData.indirizzo}
                        onChange={(e) => setFormData({...formData, indirizzo: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Quanti metri quadri? *</label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        placeholder="Es. 90"
                        className="h-12 text-base md:h-10 md:text-sm"
                        value={formData.metratura}
                        onChange={(e) => setFormData({...formData, metratura: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Numero locali</label>
                      <OptionChips
                        options={["1", "2", "3", "4", "5", "6+"].map((n) => [n, n])}
                        value={formData.locali}
                        onChange={(v) => setFormData({...formData, locali: v})}
                      />
                    </div>
                  </div>
                )}

                {valStep === 2 && (
                  <div key="v2" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">È ristrutturato?</label>
                      <OptionChips
                        options={[["si", "Sì"], ["parzialmente", "In parte"], ["no", "No"]]}
                        value={formData.ristrutturato}
                        onChange={(v) => setFormData({...formData, ristrutturato: v})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Piano</label>
                      <Select value={formData.piano} onValueChange={(v) => setFormData({...formData, piano: v})}>
                        <SelectTrigger className="h-12 text-base md:h-10 md:text-sm">
                          <SelectValue placeholder="Seleziona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seminterrato">Seminterrato</SelectItem>
                          <SelectItem value="terra">Piano terra</SelectItem>
                          <SelectItem value="1">1°</SelectItem>
                          <SelectItem value="2">2°</SelectItem>
                          <SelectItem value="3">3°</SelectItem>
                          <SelectItem value="4+">4° o superiore</SelectItem>
                          <SelectItem value="indipendente">Indipendente / villa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Giardino</label>
                      <OptionChips
                        options={[["privato", "Privato"], ["condominiale", "Condominiale"], ["no", "No"]]}
                        value={formData.giardino}
                        onChange={(v) => setFormData({...formData, giardino: v})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Pertinenze</label>
                      <OptionChips
                        options={[["box", "Box"], ["cantina", "Cantina"], ["box_cantina", "Box e cantina"], ["posto_auto", "Posto auto"], ["nessuna", "Nessuna"]]}
                        value={formData.pertinenze}
                        onChange={(v) => setFormData({...formData, pertinenze: v})}
                      />
                    </div>
                  </div>
                )}

                {valStep === 3 && (
                  <div key="v3" className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2 pb-2">
                      <label className="text-sm md:text-base font-medium">Prezzo richiesto (facoltativo)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                        <Input
                          inputMode="numeric"
                          placeholder="Es. 250.000"
                          className="h-12 text-base md:h-10 md:text-sm pl-7"
                          value={formData.prezzo}
                          onChange={(e) => {
                            // Solo cifre, con i punti delle migliaia
                            const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
                            setFormData({...formData, prezzo: digits ? Number(digits).toLocaleString("it-IT") : ""});
                          }}
                        />
                      </div>
                    </div>
                    <label className="text-sm md:text-base font-medium">Quando vorresti vendere? *</label>
                    <div className="grid gap-2">
                      {[
                        ["il_prima_possibile", "Il prima possibile"],
                        ["entro_3_mesi", "Entro 3 mesi"],
                        ["entro_6_mesi", "Entro 6 mesi"],
                        ["entro_12_mesi", "Entro 12 mesi"],
                        ["sto_valutando", "Sto solo valutando"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, tempistica: value});
                            setValStep(4);
                          }}
                          className={cn(
                            "w-full h-12 px-4 rounded-lg border text-left text-base md:text-sm font-medium flex items-center justify-between transition-colors",
                            formData.tempistica === value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-input hover:border-primary/50 hover:bg-muted/50"
                          )}
                        >
                          {label} <ArrowRight className="h-4 w-4 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {valStep === 4 && (
                  <div key="v4" className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <p className="text-sm bg-primary/5 text-primary rounded-lg px-3 py-2 font-medium">
                      Ultimo passo: a chi inviamo la stima del tuo immobile?
                    </p>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Nome e Cognome *</label>
                      <Input
                        required
                        autoFocus
                        autoComplete="name"
                        placeholder="Il tuo nome completo"
                        className="h-12 text-base md:h-10 md:text-sm"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Telefono *</label>
                      <Input
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder="Es. 333 1234567"
                        className="h-12 text-base md:h-10 md:text-sm"
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm md:text-base font-medium">Email</label>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="nome@email.it"
                        className="h-12 text-base md:h-10 md:text-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy-valutazione"
                          className="w-5 h-5 md:w-4 md:h-4 mt-0.5"
                          checked={formData.privacy}
                          onCheckedChange={(c) => setFormData({...formData, privacy: c as boolean})}
                        />
                        <label htmlFor="privacy-valutazione" className="text-sm md:text-xs leading-tight text-muted-foreground mt-0.5">
                          Ho letto e accetto la <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link> *
                        </label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="marketing-valutazione"
                          className="w-5 h-5 md:w-4 md:h-4 mt-0.5"
                          checked={formData.marketing}
                          onCheckedChange={(c) => setFormData({...formData, marketing: c as boolean})}
                        />
                        <label htmlFor="marketing-valutazione" className="text-sm md:text-xs leading-tight text-muted-foreground mt-0.5">
                          Acconsento a ricevere comunicazioni di marketing via WhatsApp/SMS
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {valStep < 3 && (
                  <Button type="submit" className="w-full h-14 text-lg md:h-12 md:text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                    Avanti <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {valStep === 4 && (
                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg md:h-12 md:text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                    {submitText || "Valuta il mio immobile"}
                  </Button>
                )}

                <ReviewBadge tone="light" className="!mt-6" />
              </div>
            ) : step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="space-y-2">
                        <label className="text-sm md:text-base font-medium">Comune di interesse *</label>
                  <Input 
                    placeholder="Es. Legnano" 
                    className="h-12 text-base md:h-10 md:text-sm"
                    value={formData.comune}
                    onChange={(e) => setFormData({...formData, comune: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">Cosa vuoi fare? *</label>
                  <Select 
                    value={formData.interesse} 
                    onValueChange={(v) => setFormData({...formData, interesse: v})}
                  >
                    <SelectTrigger className="h-12 text-base md:h-10 md:text-sm">
                      <SelectValue placeholder="Seleziona un'opzione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendere">Voglio Vendere</SelectItem>
                      <SelectItem value="affittare">Voglio Affittare</SelectItem>
                      <SelectItem value="comprare">Voglio Comprare</SelectItem>
                      <SelectItem value="cercare_affitto">Cerco in Affitto</SelectItem>
                      <SelectItem value="altro">Altro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="button" onClick={handleNext} className="w-full mt-6 h-14 text-lg md:h-12 md:text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                  Avanti <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center mb-4">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setStep(1)} className="text-muted-foreground -ml-3">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Indietro
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">Nome e Cognome *</label>
                  <Input 
                    required
                    placeholder="Il tuo nome completo" 
                    className="h-12 text-base md:h-10 md:text-sm"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">Telefono *</label>
                  <Input 
                    required
                    type="tel"
                    placeholder="Es. 333 1234567" 
                    className="h-12 text-base md:h-10 md:text-sm"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm md:text-base font-medium">Email</label>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="nome@email.it"
                    className="h-12 text-base md:h-10 md:text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                {!hideMessage && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Messaggio (Opzionale)</label>
                    <Textarea 
                      placeholder="Scrivi qui ulteriori dettagli..." 
                      className="min-h-[100px]"
                      value={formData.messaggio}
                      onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                    />
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      required
                      id="privacy" 
                      className="w-5 h-5 md:w-4 md:h-4 mt-0.5"
                      checked={formData.privacy}
                      onCheckedChange={(c) => setFormData({...formData, privacy: c as boolean})}
                    />
                    <label htmlFor="privacy" className="text-sm md:text-xs leading-tight text-muted-foreground mt-0.5">
                      Ho letto e accetto la <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link> *
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="marketing" 
                      className="w-5 h-5 md:w-4 md:h-4 mt-0.5"
                      checked={formData.marketing}
                      onCheckedChange={(c) => setFormData({...formData, marketing: c as boolean})}
                    />
                    <label htmlFor="marketing" className="text-sm md:text-xs leading-tight text-muted-foreground mt-0.5">
                      Acconsento a ricevere comunicazioni di marketing via WhatsApp/SMS
                    </label>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full mt-6 h-14 text-lg md:h-12 md:text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                  {submitText || "Invia Richiesta"}
                </Button>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}
