import { useEffect, useState } from "react";
import { EVENT_CONFIG } from "../config/eventConfig";
import { cn } from "../lib/utils";

interface StickyRSVPProps {
  onRSVP: () => void;
  /** Hide the bar (e.g. while the RSVP dialog is open). */
  hidden?: boolean;
}

/**
 * A bottom bar with an RSVP button that stays on screen while scrolling.
 * It hides itself while the inline RSVP section (#rsvp) is visible, so
 * there are never two RSVP buttons on screen at once.
 */
export default function StickyRSVP({ onRSVP, hidden = false }: StickyRSVPProps) {
  const [inlineVisible, setInlineVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("rsvp");
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInlineVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const show = !hidden && !inlineVisible;

  return (
    <div
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      )}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3 rounded-full bg-white/90 p-2 pl-5 shadow-2xl ring-1 ring-pink-200 backdrop-blur">
        <p className="flex-1 text-left leading-tight">
          <span className="block text-sm font-semibold text-violet-700">
            Can you come?
          </span>
          <span className="block text-xs text-gray-500">
            Kindly reply by {EVENT_CONFIG.rsvp.deadline.short}
          </span>
        </p>
        <button
          type="button"
          onClick={onRSVP}
          className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:from-pink-600 hover:to-violet-600 focus-magical"
        >
          <span aria-hidden="true">🦄 </span>RSVP
        </button>
      </div>
    </div>
  );
}
