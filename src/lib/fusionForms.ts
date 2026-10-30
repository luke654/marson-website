// Invio dei moduli del sito ai form di Fusion CRM (sub-account "Immobiliare Marson Srl").
// I campi e le email di conferma/notifica sono configurati nel CRM: qui mandiamo solo i valori.

const SUBMIT_URL = "https://crm.fusionsoft.it/api/forms/submit";

export const FUSION_FORMS = {
  contatti: "cmvutbbjl001t01pjwb8lons1",
  valutazione: "cmvutbc3e001v01pjt54szjds",
  candidatura: "cmvutbcng001x01pjdmv9odqq",
} as const;

export function normalizePhone(phone: string) {
  const compact = phone.replace(/\s/g, "");
  return compact.startsWith("+") ? compact : `+39${compact}`;
}

/** Le chiavi di `values` sono quelle dei campi del form nel CRM. Lancia un errore con il messaggio del server. */
export async function submitFusionForm(
  formId: string,
  values: Record<string, string | boolean | undefined>,
  startedAt: number
) {
  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "boolean") payload[key] = value ? "true" : "";
    else payload[key] = value ?? "";
  }

  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formId,
      values: payload,
      website: "",
      privacyConsent: true,
      elapsedMs: Date.now() - startedAt,
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || "Si è verificato un errore. Riprova.");
  }
}
