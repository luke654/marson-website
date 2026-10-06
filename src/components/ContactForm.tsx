import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

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
  showValuationFields
}: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    comune: "",
    interesse: "",
    nome: "",
    telefono: "",
    messaggio: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefono || !formData.privacy) {
      toast.error("Compila nome, telefono e accetta la privacy");
      return;
    }
    
    const formDataPayload: Record<string, any> = {
      name: formData.nome,
      first_name: formData.nome,
      phone: formData.telefono.startsWith("+") ? formData.telefono.replace(/ /g, '') : `+39${formData.telefono.replace(/ /g, '')}`,
    };

    const formLabelsPayload: Record<string, string> = {
      name: "Nome",
      first_name: "Nome",
      phone: "Telefono",
    };

    if (formData.comune) {
      formDataPayload["contact.comune_immobile"] = formData.comune;
      formLabelsPayload["contact.comune_immobile"] = "Comune";
    }
    if (formData.interesse) {
      formDataPayload["contact.interesse"] = formData.interesse;
      formLabelsPayload["contact.interesse"] = "Cosa vuoi fare?";
    }
    if (formData.messaggio) {
      formDataPayload["contact.messaggio"] = formData.messaggio;
      formLabelsPayload["contact.messaggio"] = "Messaggio";
    }

    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "Modulo Contatti Marson",
      formData: formDataPayload,
      formLabels: formLabelsPayload,
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: "tk_8aa01e08f6644e53b972b2160c5d9120",
      locationId: "ex5ANvHlbpBQcbqlNsx5",
      sessionId: crypto.randomUUID(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
      },
    };

    fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        version: "2021-07-28",
      },
      body: JSON.stringify(trackingPayload),
    }).catch(() => {});

    setIsSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setFormData({
        comune: "",
        interesse: "",
        nome: "",
        telefono: "",
        messaggio: "",
        privacy: false,
        marketing: false
      });
    }, 4000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-border/50 w-full max-w-lg mx-auto">
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
            {step === 1 ? (
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

                <Button type="submit" className="w-full mt-6 h-14 text-lg md:h-12 md:text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
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
