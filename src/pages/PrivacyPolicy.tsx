import { SEOHead } from "@/components/SEOHead";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <SEOHead 
        title="Privacy Policy — Marson Immobiliare" 
        description="Informativa sulla privacy di Marson Immobiliare (Immobiliare San Giorgio SRL)."
        canonical="/privacy-policy"
      />
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none space-y-6">
        <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}</p>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Titolare del Trattamento</h2>
          <p>Il Titolare del Trattamento dei dati personali è:<br/>
          <strong>Immobiliare San Giorgio SRL</strong><br/>
          Via Roma, 53<br/>
          20034 San Giorgio su Legnano (MI)<br/>
          P.IVA: 14153210969</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Tipologia di dati raccolti</h2>
          <p>Raccogliamo i seguenti dati personali:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Dati identificativi (nome, cognome)</li>
            <li>Dati di contatto (email, numero di telefono)</li>
            <li>Dati relativi agli immobili di interesse o di proprietà</li>
            <li>Dati di navigazione e utilizzo del sito web</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Finalità del trattamento</h2>
          <p>I dati vengono trattati per le seguenti finalità:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Rispondere alle richieste di informazioni o di valutazione immobiliare.</li>
            <li>Fornire i servizi di intermediazione immobiliare richiesti.</li>
            <li>Inviare comunicazioni commerciali e promozionali (solo previo consenso esplicito).</li>
            <li>Adempiere agli obblighi di legge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Base giuridica del trattamento</h2>
          <p>Il trattamento dei dati si basa su:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Consenso dell'interessato (es. per il marketing).</li>
            <li>Esecuzione di un contratto o di misure precontrattuali (es. richiesta valutazione).</li>
            <li>Obbligo legale al quale è soggetto il Titolare.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Conservazione dei dati</h2>
          <p>I dati personali sono conservati per il tempo strettamente necessario al conseguimento delle finalità per cui sono stati raccolti, e comunque non oltre i termini previsti dalla legge.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Diritti dell'interessato</h2>
          <p>Ai sensi del GDPR, l'utente ha il diritto di:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Accedere ai propri dati personali.</li>
            <li>Chiederne la rettifica o la cancellazione.</li>
            <li>Limitare o opporsi al trattamento.</li>
            <li>Richiedere la portabilità dei dati.</li>
            <li>Revocare il consenso in qualsiasi momento.</li>
          </ul>
          <p className="mt-2">Per esercitare tali diritti, è possibile contattare il Titolare all'indirizzo della sede o tramite i canali di contatto presenti sul sito.</p>
        </section>
      </div>
    </div>
  );
}
