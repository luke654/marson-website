import { useProperties } from "@/hooks/useProperties";

export default function DebugDescriptions() {
  const { data: properties = [], isLoading } = useProperties();

  if (isLoading) return <div>Loading...</div>;

  const noDesc = properties.filter(p => !p.description || p.description === "Maggiori informazioni in agenzia. Contattaci per scoprire tutti i dettagli di questo immobile.");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Immobili senza descrizione vera ({noDesc.length})</h1>
      <ul className="space-y-4">
        {noDesc.map(p => (
          <li key={p.id} className="border p-4 rounded">
            <strong>ID:</strong> {p.id} <br />
            <strong>Titolo:</strong> {p.title} <br />
            <strong>Comune:</strong> {p.location} <br />
            <strong>Prezzo:</strong> {p.price} <br />
            <strong>Riferimento:</strong> {p.reference}
          </li>
        ))}
      </ul>
    </div>
  );
}
