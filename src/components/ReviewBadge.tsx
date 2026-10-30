import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { reviewQuotes, reviewsSummary } from "@/data/reviews";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5000;

/**
 * Badge di fiducia compatto: stelle, media, numero recensioni e una citazione che ruota.
 * Cliccandolo si scende alla sezione recensioni completa.
 */
export function ReviewBadge({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % reviewQuotes.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const quote = reviewQuotes[index];
  const dark = tone === "dark";

  return (
    <button
      type="button"
      onClick={() => document.getElementById("recensioni")?.scrollIntoView({ behavior: "smooth" })}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "group flex flex-col gap-2 text-left rounded-xl px-4 py-3 transition-colors w-full",
        dark ? "max-w-3xl sm:flex-row sm:items-center sm:gap-4 text-white hover:bg-white/5" : "bg-muted/50 hover:bg-muted border border-border/60 text-foreground",
        className
      )}
      aria-label={`Valutazione ${reviewsSummary.rating} su 5, ${reviewsSummary.count} recensioni Google. Vai alle recensioni`}
    >
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-amber-400 text-amber-400 animate-in zoom-in fill-mode-both duration-500 group-hover:scale-110 transition-transform"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
        <span className="text-sm font-bold">{reviewsSummary.rating.toLocaleString("it-IT", { minimumFractionDigits: 1 })}</span>
        <span className={cn("text-sm underline-offset-2 group-hover:underline", dark ? "text-white/75" : "text-muted-foreground")}>
          · {reviewsSummary.count} recensioni Google
        </span>
      </div>
      {dark && <div className="hidden sm:block self-stretch w-px bg-white/20" />}
      <p
        key={index}
        // Altezza fissa: la citazione cambia ma il badge non si ridimensiona
        className={cn(
          "flex-1 italic leading-snug overflow-hidden animate-in fade-in slide-in-from-bottom-1 duration-500",
          dark ? "text-sm text-white/85 h-[4.125em] line-clamp-3 sm:h-[2.75em] sm:line-clamp-2" : "text-xs sm:text-sm text-muted-foreground h-[4.125em] line-clamp-3"
        )}
      >
        “{quote.text}” <span className="not-italic font-medium whitespace-nowrap">— {quote.author}</span>
      </p>
    </button>
  );
}
