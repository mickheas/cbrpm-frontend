import React from "react";
import { X, Search } from "lucide-react";

export type Tone = "ok" | "wait" | "act" | "idle";
const T: Record<Tone, string> = {
  ok: "bg-[var(--color-success-dim)] text-[var(--color-success)]",
  wait: "bg-[var(--color-warning-dim)] text-[var(--color-warning)]",
  act: "bg-[var(--color-danger-dim)] text-[var(--color-danger)]",
  idle: "bg-[var(--color-subtle)] text-[var(--color-slate)]",
};
const OK = ["Active", "Occupied", "Completed", "Healthy", "Renewed", "Active for Leasing", "Good", "Excellent", "Synced", "Success", "Verified", "Ready for Occupancy", "On"];
const WAIT = ["Pending Verification", "Running", "Queued", "Retrying", "Renewal Pending", "Reserved", "Degraded", "Draft", "Fair", "Vacant", "Minor Repair Needed", "Under Maintenance"];
const ACT = ["Failed", "Down", "Expired", "Terminated", "Poor", "Critical", "Deactivated", "Major Repair Needed", "Blacklisted"];
export const toneFor = (s: string): Tone => (OK.includes(s) ? "ok" : WAIT.includes(s) ? "wait" : ACT.includes(s) ? "act" : "idle");
export const Pill: React.FC<{ s?: string; tone?: Tone; children?: React.ReactNode }> = ({ s, tone, children }) => (
  <span className={`inline-flex items-center px-2.5 min-h-7 py-0.5 rounded-full text-sm font-semibold ${T[tone ?? toneFor(s ?? "")]}`}>{children ?? s}</span>
);

export const Kpi: React.FC<{ label: string; value: string; sub?: string; tone?: Tone; spark?: number[] }> = ({ label, value, sub, tone, spark }) => {
  const mx = spark ? Math.max(...spark, 1) : 1;
  const pts = spark?.map((v, i) => `${(i / (spark.length - 1)) * 100},${26 - (v / mx) * 24}`).join(" ");
  return (
    <div className="rounded-2xl border-2 border-[var(--color-line)] p-4 space-y-1 bg-[var(--color-surface)]">
      <div className="text-sm font-semibold text-[var(--color-slate)]">{label}</div>
      <div className="flex items-end justify-between gap-2">
        <div className="text-3xl font-extrabold leading-tight">{value}</div>
        {pts && <svg viewBox="0 0 100 28" className="w-16 h-7 text-[var(--color-accent)]" aria-hidden="true"><polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      {sub && <div className={`inline-block text-sm rounded-full ${tone ? `px-2 ${T[tone]}` : "text-[var(--color-slate)]"}`}>{sub}</div>}
    </div>
  );
};

export const Panel: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({ title, note, children }) => (
  <section className="space-y-3"><div><h2 className="text-xl font-bold">{title}</h2>{note && <p className="text-sm text-[var(--color-slate)]">{note}</p>}</div>{children}</section>
);

export const Bars: React.FC<{ rows: [string, number][]; unit?: string }> = ({ rows, unit = "" }) => {
  const mx = Math.max(...rows.map((r) => r[1]), 1);
  return <ul className="space-y-3">{rows.map(([k, v]) => (
    <li key={k}><div className="flex justify-between text-base font-semibold mb-1"><span>{k}</span><span>{v}{unit}</span></div>
      <div className="h-3 rounded-full bg-[var(--color-subtle)]"><div className="h-3 rounded-full bg-[var(--color-accent)]" style={{ width: `${(v / mx) * 100}%` }} /></div></li>))}</ul>;
};

export interface Col<R> { k: string; h: string; r?: (row: R) => React.ReactNode }
/** Table on desktop, stacked cards on phones, from the same column list. */
export function Table<R>({ cols, rows, onRow, empty = "Nothing matches." }: { cols: Col<R>[]; rows: R[]; onRow?: (r: R) => void; empty?: string }) {
  const val = (c: Col<R>, r: R) => (c.r ? c.r(r) : String((r as Record<string, unknown>)[c.k] ?? ""));
  if (!rows.length) return <p className="text-lg text-[var(--color-slate)] py-6">{empty}</p>;
  return (
    <>
      <div className="hidden md:block rounded-2xl border-2 border-[var(--color-line)] overflow-hidden bg-[var(--color-surface)]">
        <table className="w-full text-left"><thead className="bg-[var(--color-subtle)] text-sm"><tr>{cols.map((c) => <th key={c.k} className="px-4 py-3 font-semibold">{c.h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={i} tabIndex={onRow ? 0 : undefined} onClick={() => onRow?.(r)} onKeyDown={(e) => e.key === "Enter" && onRow?.(r)} className={`border-t border-[var(--color-line)] ${onRow ? "cursor-pointer hover:bg-[var(--color-subtle)] focus-visible:bg-[var(--color-subtle)] outline-none" : ""}`}>
              {cols.map((c) => <td key={c.k} className="px-4 py-3 align-top">{val(c, r)}</td>)}</tr>))}</tbody></table>
      </div>
      <ul className="md:hidden space-y-3">{rows.map((r, i) => (
        <li key={i}><button type="button" onClick={() => onRow?.(r)} className="w-full text-left rounded-2xl border-2 border-[var(--color-line)] p-4 space-y-1.5 bg-[var(--color-surface)]">
          <div className="text-lg font-bold">{val(cols[0], r)}</div>
          {cols.slice(1).map((c) => <div key={c.k} className="flex justify-between gap-3 text-base"><span className="text-[var(--color-slate)]">{c.h}</span><span className="text-right font-semibold">{val(c, r)}</span></div>)}
        </button></li>))}</ul>
    </>
  );
}

export const Toolbar: React.FC<{ q: string; setQ: (v: string) => void; placeholder: string; children?: React.ReactNode }> = ({ q, setQ, placeholder, children }) => (
  <div className="flex flex-col sm:flex-row gap-3">
    <label className="relative flex-1"><span className="sr-only">{placeholder}</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-slate)]" aria-hidden="true" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-[var(--color-line)] bg-[var(--color-surface)] text-base focus:outline-none focus:border-[var(--color-accent)]" /></label>
    {children}
  </div>
);
export const Select: React.FC<{ value: string; onChange: (v: string) => void; options: string[]; label: string; all?: string }> = ({ value, onChange, options, label, all }) => (
  <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className="h-12 px-3 rounded-xl border-2 border-[var(--color-line)] bg-[var(--color-surface)] text-base">
    {all && <option value="">{all}</option>}{options.map((o) => <option key={o}>{o}</option>)}</select>
);
export const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <label className="block"><span className="block text-base font-semibold mb-1.5">{label}</span>{children}{hint && <span className="block text-sm text-[var(--color-slate)] mt-1">{hint}</span>}</label>
);
export const inputCls = "w-full h-12 px-4 rounded-xl border-2 border-[var(--color-line)] bg-[var(--color-surface)] text-base focus:outline-none focus:border-[var(--color-accent)]";
export const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { kind?: "primary" | "ghost" | "danger" }> = ({ kind = "primary", className = "", ...p }) => (
  <button type="button" {...p} className={`h-12 px-5 rounded-xl text-base font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40 ${kind === "primary" ? "bg-[var(--color-accent)] text-white" : kind === "danger" ? "bg-[var(--color-danger)] text-white" : "border-2 border-[var(--color-line)]"} ${className}`} />
);
export const Sheet: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center" role="dialog" aria-modal="true" aria-label={title}>
    <button type="button" aria-label="Close" className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="relative w-full md:max-w-xl bg-[var(--color-surface)] rounded-t-3xl md:rounded-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] space-y-4 max-h-[92dvh] overflow-y-auto">
      <div className="flex items-center justify-between gap-3"><h2 className="text-2xl font-bold">{title}</h2>
        <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border border-[var(--color-line)]"><X className="w-6 h-6" /></button></div>
      {children}
    </div>
  </div>
);
export const Facts: React.FC<{ rows: [string, React.ReactNode][] }> = ({ rows }) => (
  <dl className="grid grid-cols-2 gap-x-4 gap-y-3">{rows.map(([k, v]) => <div key={k}><dt className="text-sm text-[var(--color-slate)]">{k}</dt><dd className="text-base font-bold break-words">{v}</dd></div>)}</dl>
);
export const SampleBar: React.FC<{ at: string; onRefresh: () => void }> = ({ at, onRefresh }) => (
  <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-slate)]"><Pill tone="wait">Sample figures</Pill><span>as of {at}</span>
    <button type="button" onClick={onRefresh} className="h-9 px-3 rounded-full border border-[var(--color-line)] font-semibold text-[var(--color-ink)]">Refresh</button></div>
);
export const now = () => new Date().toTimeString().slice(0, 5);
export const addDays = (n: number) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
export const stamp = () => new Date().toISOString().slice(0, 16).replace("T", " ");
