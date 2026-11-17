import React from "react";
import { useApp } from "../context/AppContext";
import type { LucideIcon } from "lucide-react";
import { Building2, ArrowLeft, LogOut, ChevronRight } from "lucide-react";
import { LangToggle } from "./LangToggle";

export interface ShellNav { id: string; icon: LucideIcon; am: string; en: string; badge?: number }

export const ROLE_LABEL: Record<string, [string, string]> = {
  resident: ["ተከራይ", "Tenant"],
  property_manager: ["የህንፃ አስተዳዳሪ", "Property manager"],
  executive: ["የከተማ አመራር", "City Management"],
  finance_officer: ["የፋይናንስ ባለሙያ", "Finance officer"],
  admin_officer: ["የደንበኞች አገልግሎት", "Customer Service Rep"],
  maintenance_officer: ["የጥገና ባለሙያ", "Maintenance officer"],
  field_inspector: ["የመስክ ባለሙያ", "Field Officer"],
  admin: ["የአይቲ አስተዳዳሪ", "IT Administrator"],
};

export const Arch: React.FC<{ icon: LucideIcon; className?: string }> = ({ icon: I, className = "" }) => (
  <span className={`w-12 h-14 shrink-0 flex items-center justify-center rounded-t-full rounded-b-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] ${className}`}>
    <I className="w-6 h-6" aria-hidden="true" />
  </span>
);

export const NavRow: React.FC<{ icon: LucideIcon; title: string; hint: string; onClick: () => void }> = ({ icon, title, hint, onClick }) => (
  <button type="button" onClick={onClick} className="w-full min-h-[76px] flex items-center gap-4 px-1 py-3 text-left border-b border-[var(--color-line)] outline-none hover:bg-[var(--color-subtle)] focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40">
    <Arch icon={icon} />
    <span className="flex-1 min-w-0">
      <span className="block text-xl font-bold leading-snug">{title}</span>
      <span className="block text-base text-[var(--color-slate)] leading-snug">{hint}</span>
    </span>
    <ChevronRight className="w-6 h-6 text-[var(--color-slate)] shrink-0" aria-hidden="true" />
  </button>
);

const Brand: React.FC = () => (
  <span className="flex items-center gap-2.5 font-extrabold text-lg">
    <span className="w-9 h-9 rounded-t-full rounded-b-md bg-[var(--color-accent)] text-white flex items-center justify-center">
      <Building2 className="w-5 h-5" aria-hidden="true" />
    </span>
    CBRPM
  </span>
);

interface Props { nav: ShellNav[]; tab: string; setTab: (id: string) => void; children: React.ReactNode }

/** One shell for every role: sidebar on desktop, bottom tab bar on phones (max 5 items). */
export const AppShell: React.FC<Props> = ({ nav, tab, setTab, children }) => {
  const { language, currentUser: u, setRoute, logout } = useApp();
  const L = (am: string, en: string) => (language === "am" ? am : en);
  const role = ROLE_LABEL[u?.role ?? ""] ?? ["", ""];
  const focus = "outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40";

  return (
    <div lang={language} className="min-h-[100dvh] bg-[var(--color-base)] text-[var(--color-ink)] md:flex">
      <aside className="hidden md:flex w-64 lg:w-72 shrink-0 sticky top-0 h-[100dvh] flex-col gap-6 border-r border-[var(--color-line)] bg-[var(--color-surface)] p-5">
        <Brand />
        <nav aria-label="Main" className="flex-1 space-y-1">
          {nav.map(({ id, icon: I, am, en, badge }) => (
            <button key={id} type="button" onClick={() => setTab(id)} aria-current={tab === id ? "page" : undefined}
              className={`relative w-full min-h-[52px] px-4 flex items-center gap-3 rounded-xl text-lg font-semibold text-left ${focus} ${tab === id ? "bg-[var(--color-accent-dim)] text-[var(--color-accent)]" : "hover:bg-[var(--color-subtle)]"}`}>
              {tab === id && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#F2B705]" />}
              <span className="relative"><I className="w-6 h-6 shrink-0" aria-hidden="true" />{!!badge && <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F2B705] text-[#0D1714] text-[11px] font-bold flex items-center justify-center">{badge}</span>}</span>
              {L(am, en)}
            </button>
          ))}
        </nav>
        <div className="space-y-3">
          <div className="px-1">
            <div className="font-bold truncate">{u?.name}</div>
            <div className="text-sm text-[var(--color-slate)]">{L(role[0], role[1])}</div>
          </div>
          <LangToggle />
          <button type="button" onClick={() => setRoute("home")} className={`w-full h-11 rounded-xl border border-[var(--color-line)] font-semibold flex items-center justify-center gap-2 ${focus}`}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />{L("ወደ ዋናው ገጽ", "Public site")}
          </button>
          <button type="button" onClick={logout} className={`w-full h-11 rounded-xl border border-[var(--color-line)] font-semibold flex items-center justify-center gap-2 ${focus}`}>
            <LogOut className="w-4 h-4" aria-hidden="true" />{L("ውጣ", "Sign out")}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden sticky top-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-line)] pt-[env(safe-area-inset-top)]">
          <div className="px-4 h-14 flex items-center justify-between gap-3"><Brand /><LangToggle /></div>
        </header>
        <main className="max-w-5xl mx-auto px-4 md:px-10 pt-6 md:pt-10 pb-32 md:pb-12 space-y-6">{children}</main>
      </div>

      <nav aria-label="Main" className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[var(--color-surface)] border-t border-[var(--color-line)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex">
          {nav.slice(0, 5).map(({ id, icon: I, am, en, badge }) => (
            <button key={id} type="button" onClick={() => setTab(id)} aria-current={tab === id ? "page" : undefined}
              className={`relative flex-1 min-w-0 min-h-[64px] flex flex-col items-center justify-center gap-0.5 text-[13px] font-semibold ${focus} ${tab === id ? "text-[var(--color-accent)]" : "text-[var(--color-slate)]"}`}>
              {tab === id && <span className="absolute top-0 h-1 w-10 rounded-b-full bg-[#F2B705]" />}
              <span className="relative"><I className="w-6 h-6" aria-hidden="true" />{!!badge && <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F2B705] text-[#0D1714] text-[11px] font-bold flex items-center justify-center">{badge}</span>}</span>
              <span className="truncate max-w-full px-1">{L(am, en)}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

/** Screens inside a tab: equal-width segments so nothing scrolls sideways (keep to 2-3). */
export const SubNav: React.FC<{ items: { id: string; am: string; en: string }[]; value: string; onChange: (id: string) => void }> = ({ items, value, onChange }) => {
  const { language } = useApp();
  return (
    <div role="tablist" className="flex p-1 rounded-2xl bg-[var(--color-subtle)] max-w-xl">
      {items.map((it) => (
        <button key={it.id} role="tab" type="button" aria-selected={value === it.id} onClick={() => onChange(it.id)}
          className={`flex-1 min-h-[48px] px-2 rounded-xl text-base font-bold outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40 ${value === it.id ? "bg-[var(--color-surface)] text-[var(--color-accent)] shadow-sm" : "text-[var(--color-slate)]"}`}>
          {language === "am" ? it.am : it.en}
        </button>
      ))}
    </div>
  );
};
