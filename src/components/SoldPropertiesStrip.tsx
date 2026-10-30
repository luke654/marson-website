import type { CSSProperties } from "react";
import { MapPin } from "lucide-react";
import { soldProperties, type SoldProperty } from "@/data/soldProperties";

function SoldCard({ property, hidden }: { property: SoldProperty; hidden?: boolean }) {
  const place = [property.address, property.comune].filter(Boolean).join(", ") || undefined;

  return (
    <div
      aria-hidden={hidden || undefined}
      className="shrink-0 w-56 md:w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden text-left"
    >
      <img src={property.image} alt={hidden ? "" : `Immobile venduto${place ? ` a ${place}` : ""}`} className="w-full h-24 md:h-28 object-cover" loading="lazy" />
      <div className="px-3 py-1.5 flex items-center gap-1 min-w-0 text-white/80 text-[11px] leading-tight">
        {place && <MapPin className="h-3 w-3 shrink-0" />}
        <span className="truncate">{place ?? "Venduto"}</span>
      </div>
    </div>
  );
}

export function SoldPropertiesStrip() {
  if (soldProperties.length === 0) return null;

  // Scorrimento continuo: la lista viene ripetuta finché riempie lo schermo,
  // poi duplicata per far ripartire l'animazione senza stacchi.
  const repeat = Math.max(1, Math.ceil(8 / soldProperties.length));
  const loop = Array.from({ length: repeat }, () => soldProperties).flat();
  const style = { "--marquee-duration": `${loop.length * 6}s` } as CSSProperties;

  return (
    <div className="relative z-10 w-full pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-white/80 mb-3 text-left">
          Venduti recentemente
        </p>
      </div>
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
        <div
          style={style}
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-3 md:gap-4 pr-3 md:pr-4" aria-hidden={copy === 1 || undefined}>
              {loop.map((property, i) => (
                <SoldCard key={`${copy}-${i}-${property.id}`} property={property} hidden={copy === 1 || i >= soldProperties.length} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
