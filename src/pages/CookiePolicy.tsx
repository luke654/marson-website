import { SEOHead } from "@/components/SEOHead";

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <SEOHead 
        title="Cookie Policy — Marson Immobiliare" 
        description="Informativa sui cookie utilizzati da Marson Immobiliare."
        canonical="/cookie-policy"
      />
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Titolare del Trattamento</h2>
          <p><strong>Immobiliare San Giorgio SRL</strong><br/>
          Via Roma, 53<br/>
          20034 San Giorgio su Legnano (MI)<br/>
          P.IVA: 14153210969</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Cosa sono i Cookie?</h2>
          <p>I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Tipologie di Cookie utilizzati</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">Cookie Tecnici (Essenziali)</h3>
          <p>Questi cookie sono necessari per il corretto funzionamento del sito e non possono essere disattivati. Includono, ad esempio, i cookie che ricordano le tue preferenze sulla privacy.</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Cookie di Analisi e Prestazioni (Non essenziali)</h3>
          <p>Ci permettono di riconoscere e contare il numero di visitatori e di vedere come i visitatori si muovono all'interno del nostro sito web quando lo usano. Questo ci aiuta a migliorare il modo in cui il nostro sito web funziona.</p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Cookie di Profilazione e Marketing (Non essenziali)</h3>
          <p>Questi cookie possono essere impostati tramite il nostro sito dai nostri partner pubblicitari. Possono essere utilizzati da tali aziende per costruire un profilo dei tuoi interessi e mostrarti annunci pertinenti su altri siti.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Gestione delle preferenze</h2>
          <p>Puoi gestire le tue preferenze sui cookie in qualsiasi momento tramite il banner presente sul nostro sito o modificando le impostazioni del tuo browser. Ricorda che la disabilitazione di alcuni cookie potrebbe compromettere alcune funzionalità del sito.</p>
        </section>
      </div>
    </div>
  );
}
