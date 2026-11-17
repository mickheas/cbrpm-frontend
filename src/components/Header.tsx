import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import type { RouteName } from "../context/AppContext";
import { Building2, Menu, X, Moon, Sun, ChevronRight } from "lucide-react";
import { LangToggle } from "./LangToggle";

const NAV: { route: RouteName; am: string; en: string }[] = [
  { route: "rent", am: "ቤት ፈልግ", en: "Find a place" },
  { route: "sites", am: "ህንፃዎች", en: "Buildings" },
  { route: "services", am: "አገልግሎቶች", en: "Services" },
  { route: "records", am: "ደረሰኝ አረጋግጥ", en: "Verify a record" },
];

export const Header: React.FC = () => {
  const { route, setRoute, isLoggedIn, language, darkMode, toggleDarkMode } = useApp();
  const [open, setOpen] = useState(false);
  const L = (am: string, en: string) => (language === "am" ? am : en);
  const go = (r: RouteName) => { setRoute(r); setOpen(false); };
  const ring = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40";
  const signIn = isLoggedIn ? L("የእኔ ገጽ", "My account") : L("ግባ", "Sign in");

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-line)] pt-[env(safe-area-inset-top)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <button type="button" onClick={() => go("home")} className={`flex items-center gap-3 min-w-0 rounded-lg ${ring}`}>
          <span className="w-10 h-10 rounded-t-full rounded-b-md bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="text-left leading-tight min-w-0">
            <span className="block text-lg font-extrabold">CBRPM</span>
            <span className="hidden sm:block text-sm text-[var(--color-slate)] truncate">
              {L("የአዲስ አበባ ከተማ አስተዳደር", "Addis Ababa City Administration")}
            </span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {NAV.map((n) => (
            <button
              key={n.route}
              type="button"
              onClick={() => go(n.route)}
              aria-current={route === n.route ? "page" : undefined}
              className={`relative h-12 px-4 text-base font-semibold rounded-lg hover:bg-[var(--color-subtle)] ${ring} ${route === n.route ? "text-[var(--color-accent)]" : ""}`}
            >
              {L(n.am, n.en)}
              {route === n.route && <span className="absolute left-4 right-4 bottom-1 h-1 rounded-full bg-[#F2B705]" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <button type="button" onClick={toggleDarkMode} aria-label={L("ብሩህ / ጨለማ", "Light / dark")} className={`hidden sm:flex w-11 h-11 items-center justify-center rounded-full hover:bg-[var(--color-subtle)] ${ring}`}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button type="button" onClick={() => go("portal-login")} className={`hidden lg:inline-flex h-11 px-5 items-center rounded-full bg-[var(--color-accent)] text-white text-base font-bold ${ring}`}>
            {signIn}
          </button>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={L("ዝርዝር", "Menu")} className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-line)] ${ring}`}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(4rem+env(safe-area-inset-top))] bottom-0 bg-[var(--color-base)] overflow-y-auto px-4 py-4 space-y-2">
          <button type="button" onClick={() => go("portal-login")} className={`w-full h-14 rounded-2xl bg-[var(--color-accent)] text-white text-lg font-bold ${ring}`}>
            {signIn}
          </button>
          {NAV.map((n) => (
            <button key={n.route} type="button" onClick={() => go(n.route)} className={`w-full min-h-[60px] px-4 flex items-center justify-between text-left text-xl font-semibold border-b border-[var(--color-line)] ${ring}`}>
              {L(n.am, n.en)}
              <ChevronRight className="w-6 h-6 text-[var(--color-slate)]" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
