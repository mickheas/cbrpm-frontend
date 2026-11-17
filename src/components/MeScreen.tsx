import React from "react";
import { useApp } from "../context/AppContext";
import { ROLE_LABEL } from "./AppShell";

const ROLES = ["resident", "property_manager", "executive", "finance_officer", "maintenance_officer", "admin_officer", "field_inspector", "admin"];

export const MeScreen: React.FC = () => {
  const { currentUser: u, language, switchPersona, setRoute, logout } = useApp();
  const L = (am: string, en: string) => (language === "am" ? am : en);
  if (!u) return null;
  const rows: [string, string][] = [
    [L("ስልክ", "Phone"), u.phone],
    [L("የፋይዳ ቁጥር", "Fayda ID"), u.faydaId ?? "-"],
    [L("አሰሪ", "Employer"), u.ministryOrEmployer ?? "-"],
  ];
  const b = "w-full h-14 rounded-2xl border-2 border-[var(--color-line)] text-lg font-semibold outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40";
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-extrabold">{u.name}</h1>
      <dl className="border-t border-[var(--color-line)]">
        {rows.map(([k, v]) => (
          <div key={k} className="py-4 border-b border-[var(--color-line)]">
            <dt className="text-base text-[var(--color-slate)]">{k}</dt>
            <dd className="text-xl font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="grid sm:grid-cols-2 gap-3">
        <button type="button" onClick={() => setRoute("home")} className={b}>{L("ወደ ዋናው ገጽ", "Back to public site")}</button>
        <button type="button" onClick={logout} className={b}>{L("ውጣ", "Sign out")}</button>
      </div>
      <div>
        <label htmlFor="demo" className="block text-sm text-[var(--color-slate)] mb-1.5">Demo only: view as another role</label>
        <select id="demo" value={u.role} onChange={(e) => switchPersona(e.target.value)} className="w-full h-14 px-4 rounded-xl border-2 border-[var(--color-line)] bg-[var(--color-surface)] text-lg">
          {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABEL[r][1]}</option>)}
        </select>
      </div>
    </div>
  );
};
