import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Cookie, Settings, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem("marson_cookie_consent");
    if (!savedConsent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const saveConsent = (newConsent: Consent) => {
    setConsent(newConsent);
    localStorage.setItem("marson_cookie_consent", JSON.stringify(newConsent));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const savePreferences = () => {
    saveConsent(consent);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:max-w-2xl md:bottom-6 md:left-6 md:right-auto bg-background border rounded-lg shadow-2xl animate-in slide-in-from-bottom-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg">Informativa sui Cookie</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Utilizziamo cookie tecnici per garantire il corretto funzionamento del sito e, previo tuo consenso, cookie analitici e di profilazione per migliorare la tua esperienza e offrirti contenuti personalizzati. Puoi leggere di più nella nostra <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button onClick={acceptAll} className="w-full sm:w-auto">Accetta tutti</Button>
            <Button onClick={rejectAll} variant="outline" className="w-full sm:w-auto">Solo necessari</Button>
            <Button onClick={() => setShowPreferences(true)} variant="ghost" className="w-full sm:w-auto">
              <Settings className="w-4 h-4 mr-2" /> Personalizza
            </Button>
          </div>
        </div>
      )}

      {!showBanner && (
        <button
          onClick={() => setShowPreferences(true)}
          className="fixed bottom-6 left-6 z-40 p-3 bg-background border shadow-md rounded-full hover:bg-muted transition-colors group"
          aria-label="Modifica preferenze cookie"
          title="Modifica preferenze cookie"
        >
          <ShieldCheck className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      )}

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-[500px] z-[110]">
          <DialogHeader>
            <DialogTitle>Preferenze Cookie</DialogTitle>
            <DialogDescription>
              Gestisci le tue preferenze per i cookie. I cookie necessari non possono essere disabilitati in quanto essenziali per il funzionamento del sito.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-6">
                <h4 className="font-medium text-sm">Strettamente Necessari</h4>
                <p className="text-xs text-muted-foreground">Essenziali per la navigazione e le funzioni base del sito.</p>
              </div>
              <Switch checked={true} disabled />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-6">
                <h4 className="font-medium text-sm">Analitici</h4>
                <p className="text-xs text-muted-foreground">Ci aiutano a capire come i visitatori interagiscono con il sito.</p>
              </div>
              <Switch 
                checked={consent.analytics} 
                onCheckedChange={(c) => setConsent({...consent, analytics: c})} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-6">
                <h4 className="font-medium text-sm">Marketing e Profilazione</h4>
                <p className="text-xs text-muted-foreground">Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti.</p>
              </div>
              <Switch 
                checked={consent.marketing} 
                onCheckedChange={(c) => setConsent({...consent, marketing: c})} 
              />
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={rejectAll} className="w-full sm:w-auto">Rifiuta tutti</Button>
            <Button onClick={savePreferences} className="w-full sm:w-auto">Salva Preferenze</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
