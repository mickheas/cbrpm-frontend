import React from "react";
import { useApp } from "../context/AppContext";

export const LangToggle: React.FC = () => {
  const { language, setLanguage } = useApp();
  return (
    <div role="group" aria-label="Language / ቋንቋ" className="inline-flex p-1 rounded-full border border-[var(--color-line)] shrink-0">
      {(["am", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={language === l}
          onClick={() => setLanguage(l)}
          className={`h-10 px-4 rounded-full text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40 ${
            language === l ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
          }`}
        >
          {l === "am" ? "አማ" : "EN"}
        </button>
      ))}
    </div>
  );
};
