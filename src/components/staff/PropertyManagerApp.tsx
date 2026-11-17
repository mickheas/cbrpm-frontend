import React, { useContext, useState } from "react";
import { useApp } from "../../context/AppContext";
import { LayoutDashboard, Building2, Users, DoorOpen, Plus } from "lucide-react";
import { ModuleApp, ModNav } from "./ModuleApp";
import type { ModTab } from "./ModuleApp";
import { Pill, Kpi, Panel, Bars, Table, Toolbar, Select, Field, inputCls, Btn, Sheet, Facts, SampleBar, now, addDays, stamp } from "../ui";

const USAGE = ["Residential", "Commercial Retail", "Commercial Office", "Warehouse", "Municipal"];
const UNIT_STATUS = ["Occupied", "Vacant", "Reserved", "Under Maintenance", "Under Reconstruction", "Unavailable", "Decommissioned"];
const CONDITION = ["Excellent", "Good", "Fair", "Poor", "Critical"];
const TENANT_TYPE = ["Individual", "Commercial Entity", "Government Agency", "NGO"];
const THRESHOLD = 30;
const daysLeft = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
const etb = (n: number) => `ETB ${Math.round(n).toLocaleString("en-US")}`;

interface Bld { id: string; name: string; usage: string; floors: number; status: string; cond: string; woreda: string }
interface Unit { id: string; pid: string; no: string; floor: number; usage: string; area: number; rent: number; status: string; history: [string, string, string, string][] }
interface Tenant { id: string; name: string; type: string; phone: string; unit: string; account: string; idCheck: string }
interface Lease { id: string; tenant: string; unit: string; end: string; rent: number; status: string }
interface Vac { id: string; unit: string; reason: string; days: number; grade: string; ref: string }

const mk = (pid: string, suf: string, no: string, floor: number, usage: string, area: number, rent: number, status: string): Unit =>
  ({ id: `${pid}-${suf}`, pid, no, floor, usage, area, rent, status, history: [[addDays(-90), "Vacant", status, "Initial indexing"]] });

function usePm() {
  const [blds, setBlds] = useState<Bld[]>([
    { id: "BLD-KK-03-00142", name: "Kirkos Block A", usage: "Residential", floors: 6, status: "Active for Leasing", cond: "Good", woreda: "03" },
    { id: "BLD-KK-03-00157", name: "Kirkos Block B", usage: "Commercial Retail", floors: 4, status: "Active for Leasing", cond: "Fair", woreda: "03" },
    { id: "BLD-KK-05-00201", name: "Kirkos Annex", usage: "Municipal", floors: 5, status: "Draft", cond: "Poor", woreda: "05" },
  ]);
  const [units, setUnits] = useState<Unit[]>([
    mk("BLD-KK-03-00142", "U01001", "101", 1, "Residential", 64, 4200, "Occupied"), mk("BLD-KK-03-00142", "U01002", "102", 1, "Residential", 58, 3900, "Vacant"),
    mk("BLD-KK-03-00142", "U02005", "205", 2, "Residential", 72, 4800, "Occupied"), mk("BLD-KK-03-00142", "U03003", "303", 3, "Residential", 70, 4600, "Under Maintenance"),
    mk("BLD-KK-03-00157", "U01001", "S-01", 1, "Commercial Retail", 40, 9500, "Occupied"), mk("BLD-KK-03-00157", "U01002", "S-02", 1, "Commercial Retail", 42, 9900, "Vacant"),
    mk("BLD-KK-03-00157", "U02001", "O-01", 2, "Commercial Office", 55, 8000, "Reserved"),
  ]);
  const [tenants, setTenants] = useState<Tenant[]>([
    { id: "TNT-0000123", name: "Abebe Kebede", type: "Individual", phone: "+251911000123", unit: "BLD-KK-03-00142-U01001", account: "Active", idCheck: "Verified" },
    { id: "TNT-0000124", name: "Meseret Alemu", type: "Individual", phone: "+251922000124", unit: "BLD-KK-03-00142-U02005", account: "Active", idCheck: "Verified" },
    { id: "TNT-0000131", name: "Selam Trading PLC", type: "Commercial Entity", phone: "+251911000131", unit: "BLD-KK-03-00157-U01001", account: "Active", idCheck: "Pending Verification" },
  ]);
  const [leases, setLeases] = useState<Lease[]>([
    { id: "LSE-0000045", tenant: "Abebe Kebede", unit: "BLD-KK-03-00142-U01001", end: addDays(25), rent: 4200, status: "Active" },
    { id: "LSE-0000052", tenant: "Meseret Alemu", unit: "BLD-KK-03-00142-U02005", end: addDays(52), rent: 4800, status: "Renewal Pending" },
    { id: "LSE-0000060", tenant: "Selam Trading PLC", unit: "BLD-KK-03-00157-U01001", end: addDays(84), rent: 9500, status: "Active" },
    { id: "LSE-0000071", tenant: "Hana Tesfaye", unit: "BLD-KK-03-00157-U02001", end: addDays(300), rent: 8000, status: "Draft" },
  ]);
  const [vacs, setVacs] = useState<Vac[]>([
    { id: "VAC-2026-000007", unit: "BLD-KK-03-00142-U01002", reason: "Lease Expired", days: 47, grade: "Minor Repair Needed", ref: "" },
    { id: "VAC-2026-000011", unit: "BLD-KK-03-00157-U01002", reason: "New Handover", days: 12, grade: "Ready for Occupancy", ref: "" },
    { id: "VAC-2026-000004", unit: "BLD-KK-03-00142-U03003", reason: "Renovation", days: 71, grade: "Major Repair Needed", ref: "" },
  ]);
  const rentOf = (uid: string) => units.find((u) => u.id === uid)?.rent ?? 0;
  return { blds, setBlds, units, setUnits, tenants, setTenants, leases, setLeases, vacs, setVacs, rentOf };
}
type S = ReturnType<typeof usePm>;

const Overview: React.FC<{ s: S }> = ({ s }) => {
  const go = useContext(ModNav); const { currentUser: u } = useApp();
  const [at, setAt] = useState(now());
  const occ = s.units.filter((x) => x.status === "Occupied").length;
  const over = s.vacs.filter((v) => v.days > THRESHOLD);
  const soon = s.leases.filter((l) => daysLeft(l.end) <= 90);
  const b = (lo: number, hi: number) => s.leases.filter((l) => daysLeft(l.end) > lo && daysLeft(l.end) <= hi).length;
  const pend = s.tenants.filter((t) => t.idCheck === "Pending Verification");
  const W = [0.4, 0.4, 0.1, 0.1];
  const rank = ([["Kirkos Block A", 94, 91, 6, 4], ["Kirkos Block B", 88, 84, 11, 7], ["Kirkos Annex", 61, 70, 19, 15]] as [string, number, number, number, number][])
    .map(([n, o, c, a, m]) => ({ n, o, c, a, m, score: W[0] * o + W[1] * c - W[2] * a - W[3] * m })).sort((x, y) => y.score - x.score).map((r, i) => ({ ...r, rank: i + 1 }));
  const items: [string, string, () => void][] = [
    ...soon.filter((l) => daysLeft(l.end) <= 30).map((l): [string, string, () => void] => [`Lease ${l.id} ends in ${daysLeft(l.end)} days`, l.tenant, () => go("tenancy", "leases")]),
    ...over.map((v): [string, string, () => void] => [`${v.unit.slice(-6)} vacant ${v.days} days`, `${v.reason}, over the ${THRESHOLD}-day threshold`, () => go("vacancies")]),
    ...pend.map((t): [string, string, () => void] => [`${t.name}: ID check pending`, "Tenant verification", () => go("tenancy", "tenants")]),
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-extrabold">Portfolio overview</h1><p className="text-lg text-[var(--color-slate)]">Scope: {u?.subCity ?? "your sub-city"} only</p></div>
      <SampleBar at={at} onRefresh={() => setAt(now())} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi label="Occupancy" value={`${Math.round((occ / s.units.length) * 100)}%`} sub={`${occ} of ${s.units.length} units`} />
        <Kpi label="Vacant over threshold" value={String(over.length)} sub={`${THRESHOLD}-day limit`} tone={over.length ? "act" : "ok"} />
        <Kpi label="Leases ending in 90 days" value={String(soon.length)} sub={`${b(-999, 30)} within 30 days`} tone={b(-999, 30) ? "wait" : undefined} />
        <Kpi label="Rent lost to vacancy" value={etb(s.vacs.reduce((a, v) => a + (s.rentOf(v.unit) * v.days) / 30, 0))} sub="Estimated" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <Panel title="Needs your attention">
          {items.length === 0 ? <p className="text-lg text-[var(--color-slate)]">Nothing urgent.</p> :
            <ul className="border-t border-[var(--color-line)]">{items.map(([t, m, f], i) => <li key={i}><button type="button" onClick={f} className="w-full text-left py-3 border-b border-[var(--color-line)] hover:bg-[var(--color-subtle)] px-1"><div className="font-bold text-lg">{t}</div><div className="text-base text-[var(--color-slate)]">{m}</div></button></li>)}</ul>}
        </Panel>
        <Panel title="Lease expiry" note="Reminders go to you and the tenant at 90, 60 and 30 days."><Bars rows={[["Within 30 days", b(-999, 30)], ["31 to 60 days", b(30, 60)], ["61 to 90 days", b(60, 90)]]} /></Panel>
      </div>
      <Panel title="Property ranking" note="Score = 0.4 × Occupancy + 0.4 × Collection − 0.1 × Arrears − 0.1 × Maintenance cost. City Management sets the weights; these are sample weights.">
        <Table cols={[{ k: "n", h: "Property" }, { k: "rank", h: "Rank" }, { k: "score", h: "Score", r: (r) => r.score.toFixed(1) }, { k: "o", h: "Occupancy", r: (r) => `${r.o}%` }, { k: "c", h: "Collection", r: (r) => `${r.c}%` }, { k: "a", h: "Arrears", r: (r) => `${r.a}%` }, { k: "m", h: "Maintenance", r: (r) => `${r.m}%` }]} rows={rank} />
      </Panel>
    </div>
  );
};

const Buildings: React.FC<{ s: S }> = ({ s }) => {
  const [q, setQ] = useState(""); const [st, setSt] = useState(""); const [sel, setSel] = useState<Bld | null>(null); const [reg, setReg] = useState(false);
  const [f, setF] = useState({ name: "", woreda: "", usage: USAGE[0], floors: "", cond: "Good" }); const [err, setErr] = useState("");
  const rows = s.blds.filter((b) => (b.name + b.id).toLowerCase().includes(q.toLowerCase()) && (!st || b.status === st));
  const save = () => {
    const fl = Number(f.floors);
    if (!f.name.trim() || f.name.length > 150) return setErr("Name is required, up to 150 characters.");
    if (!/^\d{1,2}$/.test(f.woreda)) return setErr("Woreda code is up to 2 digits.");
    if (!(fl >= 1 && fl <= 150)) return setErr("Floors must be 1 to 150.");
    s.setBlds((p) => [...p, { id: `BLD-KK-${f.woreda.padStart(2, "0")}-${String(142 + p.length * 15).padStart(5, "0")}`, name: f.name.trim(), usage: f.usage, floors: fl, status: "Draft", cond: f.cond, woreda: f.woreda }]);
    setReg(false); setErr(""); setF({ name: "", woreda: "", usage: USAGE[0], floors: "", cond: "Good" });
  };
  const bu = (id: string) => s.units.filter((u) => u.pid === id);
  return (
    <div className="space-y-4">
      <Toolbar q={q} setQ={setQ} placeholder="Search by name or building ID">
        <Select label="Status" value={st} onChange={setSt} options={["Draft", "Active for Leasing", "Inactive"]} all="All statuses" />
        <Btn onClick={() => setReg(true)}><Plus className="w-5 h-5" aria-hidden="true" />Register building</Btn>
      </Toolbar>
      <Table rows={rows} onRow={setSel} cols={[{ k: "name", h: "Building" }, { k: "id", h: "ID" }, { k: "usage", h: "Usage" }, { k: "floors", h: "Floors" }, { k: "u", h: "Units", r: (b) => bu(b.id).length }, { k: "cond", h: "Condition", r: (b) => <Pill s={b.cond} /> }, { k: "status", h: "Status", r: (b) => <Pill s={b.status} /> }]} />
      {sel && <Sheet title={sel.name} onClose={() => setSel(null)}>
        <Facts rows={[["Building ID", sel.id], ["Usage", sel.usage], ["Floors", String(sel.floors)], ["Woreda", sel.woreda], ["Condition", <Pill key="c" s={sel.cond} />], ["Status", <Pill key="s" s={sel.status} />]]} />
        <h3 className="font-bold text-lg">Units ({bu(sel.id).length})</h3>
        <ul className="divide-y divide-[var(--color-line)]">{bu(sel.id).map((u) => <li key={u.id} className="py-2 flex justify-between gap-3"><span className="font-semibold">{u.no} · {u.usage}</span><Pill s={u.status} /></li>)}</ul>
      </Sheet>}
      {reg && <Sheet title="Register a building" onClose={() => setReg(false)}>
        <p className="text-sm text-[var(--color-slate)]">Saved as a draft. You can come back and finish it.</p>
        <Field label="Building name"><input className={inputCls} maxLength={150} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
        <div className="grid grid-cols-2 gap-3"><Field label="Woreda code"><input className={inputCls} maxLength={2} inputMode="numeric" value={f.woreda} onChange={(e) => setF({ ...f, woreda: e.target.value.replace(/\D/g, "") })} /></Field>
          <Field label="Floors (1 to 150)"><input className={inputCls} inputMode="numeric" value={f.floors} onChange={(e) => setF({ ...f, floors: e.target.value.replace(/\D/g, "") })} /></Field></div>
        <div className="grid grid-cols-2 gap-3"><Field label="Usage"><Select label="Usage" value={f.usage} onChange={(v) => setF({ ...f, usage: v })} options={USAGE} /></Field>
          <Field label="Condition"><Select label="Condition" value={f.cond} onChange={(v) => setF({ ...f, cond: v })} options={CONDITION} /></Field></div>
        {err && <p role="alert" className="text-[var(--color-danger)] font-semibold">{err}</p>}
        <Btn className="w-full" onClick={save}>Save draft</Btn>
      </Sheet>}
    </div>
  );
};

const Units: React.FC<{ s: S }> = ({ s }) => {
  const [q, setQ] = useState(""); const [b, setB] = useState(""); const [st, setSt] = useState(""); const [sel, setSel] = useState<Unit | null>(null);
  const [to, setTo] = useState(""); const [why, setWhy] = useState("");
  const rows = s.units.filter((u) => (u.id + u.no).toLowerCase().includes(q.toLowerCase()) && (!b || u.pid === b) && (!st || u.status === st));
  const live = sel ? s.units.find((u) => u.id === sel.id)! : null;
  const change = () => {
    if (!live || !to || !why.trim()) return;
    s.setUnits((p) => p.map((u) => (u.id === live.id ? { ...u, status: to, history: [[stamp(), u.status, to, why.trim()], ...u.history] } : u)));
    setTo(""); setWhy("");
  };
  return (
    <div className="space-y-4">
      <Toolbar q={q} setQ={setQ} placeholder="Search by unit number or ID">
        <Select label="Building" value={b} onChange={setB} options={s.blds.map((x) => x.id)} all="All buildings" />
        <Select label="Status" value={st} onChange={setSt} options={UNIT_STATUS} all="All statuses" />
      </Toolbar>
      <Table rows={rows} onRow={setSel} cols={[{ k: "no", h: "Unit" }, { k: "id", h: "ID" }, { k: "floor", h: "Floor" }, { k: "usage", h: "Usage" }, { k: "area", h: "Area", r: (u) => `${u.area} m²` }, { k: "rent", h: "Base rent", r: (u) => etb(u.rent) }, { k: "status", h: "Status", r: (u) => <Pill s={u.status} /> }]} />
      {live && <Sheet title={`Unit ${live.no}`} onClose={() => { setSel(null); setTo(""); setWhy(""); }}>
        <Facts rows={[["Unit ID", live.id], ["Status", <Pill key="s" s={live.status} />], ["Usage", live.usage], ["Area", `${live.area} m²`], ["Base rent", etb(live.rent)], ["Floor", String(live.floor)]]} />
        <div className="rounded-2xl bg-[var(--color-subtle)] p-4 space-y-3"><h3 className="font-bold text-lg">Change status</h3>
          <Select label="New status" value={to} onChange={setTo} options={UNIT_STATUS.filter((x) => x !== live.status)} all="Choose new status" />
          <Field label="Reason (kept in the history)"><input className={inputCls} value={why} onChange={(e) => setWhy(e.target.value)} /></Field>
          <Btn className="w-full" disabled={!to || !why.trim()} onClick={change}>Save change</Btn></div>
        <h3 className="font-bold text-lg">History</h3>
        <ul className="divide-y divide-[var(--color-line)]">{live.history.map((h, i) => <li key={i} className="py-2 text-base"><div className="font-semibold">{h[1]} to {h[2]}</div><div className="text-[var(--color-slate)]">{h[0]} · {h[3]}</div></li>)}</ul>
      </Sheet>}
    </div>
  );
};

const Tenants: React.FC<{ s: S }> = ({ s }) => {
  const [q, setQ] = useState(""); const [reg, setReg] = useState(false); const [err, setErr] = useState("");
  const [f, setF] = useState({ type: TENANT_TYPE[0], name: "", phone: "+251", id: "" });
  const rows = s.tenants.filter((t) => (t.name + t.id).toLowerCase().includes(q.toLowerCase()));
  const need = f.type === "Individual" ? 16 : 10;
  const save = () => {
    if (!f.name.trim() || f.name.length > 200) return setErr("Name is required, up to 200 characters.");
    if (!/^\+251[79]\d{8}$/.test(f.phone)) return setErr("Phone must look like +2519XXXXXXXX or +2517XXXXXXXX.");
    if (!new RegExp(`^\\d{${need}}$`).test(f.id)) return setErr(`${f.type === "Individual" ? "Fayda ID" : "TIN"} must be exactly ${need} digits.`);
    s.setTenants((p) => [...p, { id: `TNT-${String(131 + p.length).padStart(7, "0")}`, name: f.name.trim(), type: f.type, phone: f.phone, unit: "-", account: "Active", idCheck: "Pending Verification" }]);
    setReg(false); setErr(""); setF({ type: TENANT_TYPE[0], name: "", phone: "+251", id: "" });
  };
  return (
    <div className="space-y-4">
      <Toolbar q={q} setQ={setQ} placeholder="Search by name or tenant ID"><Btn onClick={() => setReg(true)}><Plus className="w-5 h-5" aria-hidden="true" />Register tenant</Btn></Toolbar>
      <Table rows={rows} cols={[{ k: "name", h: "Tenant" }, { k: "id", h: "ID" }, { k: "type", h: "Type" }, { k: "phone", h: "Phone" }, { k: "account", h: "Account", r: (t) => <Pill s={t.account} /> }, { k: "idCheck", h: "ID check", r: (t) => <Pill s={t.idCheck} /> }]} />
      {reg && <Sheet title="Register a tenant" onClose={() => setReg(false)}>
        <Field label="Tenant type"><Select label="Tenant type" value={f.type} onChange={(v) => setF({ ...f, type: v, id: "" })} options={TENANT_TYPE} /></Field>
        <Field label="Full or business name"><input className={inputCls} maxLength={200} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
        <Field label="Mobile phone"><input className={inputCls} inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
        <Field label={f.type === "Individual" ? "Fayda ID (16 digits)" : "TIN (10 digits)"} hint="The profile stays Pending Verification until the ID check finishes."><input className={inputCls} inputMode="numeric" maxLength={need} value={f.id} onChange={(e) => setF({ ...f, id: e.target.value.replace(/\D/g, "") })} /></Field>
        {err && <p role="alert" className="text-[var(--color-danger)] font-semibold">{err}</p>}
        <Btn className="w-full" onClick={save}>Register</Btn>
      </Sheet>}
    </div>
  );
};

const Leases: React.FC<{ s: S }> = ({ s }) => {
  const [sel, setSel] = useState<Lease | null>(null); const [rent, setRent] = useState("");
  const live = sel ? s.leases.find((l) => l.id === sel.id)! : null;
  const base = live ? s.rentOf(live.unit) : 0;
  const set = (st: string, r?: number) => live && s.setLeases((p) => p.map((l) => (l.id === live.id ? { ...l, status: st, rent: r ?? l.rent } : l)));
  const sorted = [...s.leases].sort((a, b) => a.end.localeCompare(b.end));
  return (
    <div className="space-y-4">
      <Table rows={sorted} onRow={(l) => { setSel(l); setRent(String(l.rent)); }} cols={[{ k: "id", h: "Lease" }, { k: "tenant", h: "Tenant" }, { k: "unit", h: "Unit", r: (l) => l.unit.slice(-6) }, { k: "end", h: "Ends", r: (l) => `${l.end} (${daysLeft(l.end)} d)` }, { k: "rent", h: "Rent", r: (l) => etb(l.rent) }, { k: "status", h: "Status", r: (l) => <Pill s={l.status} /> }]} />
      {live && <Sheet title={live.id} onClose={() => setSel(null)}>
        <Facts rows={[["Tenant", live.tenant], ["Unit", live.unit], ["Ends", `${live.end} (${daysLeft(live.end)} days)`], ["Monthly rent", etb(live.rent)], ["Status", <Pill key="s" s={live.status} />], ["Unit base rent", etb(base)]]} />
        {live.status === "Active" && <Btn className="w-full" onClick={() => set("Renewal Pending")}>Start renewal</Btn>}
        {live.status === "Renewal Pending" && <div className="rounded-2xl bg-[var(--color-subtle)] p-4 space-y-3">
          <Field label="Rent for the new term (ETB)"><input className={inputCls} inputMode="numeric" value={rent} onChange={(e) => setRent(e.target.value.replace(/\D/g, ""))} /></Field>
          {Number(rent) < base && <p className="text-[var(--color-danger)] font-semibold">Rent cannot be below the unit base rent without City Management approval.</p>}
          <Btn className="w-full" disabled={!rent || Number(rent) < base} onClick={() => set("Renewed", Number(rent))}>Complete renewal</Btn></div>}
        {live.status === "Renewed" && <p className="text-base text-[var(--color-slate)]">Renewed. The new term is recorded.</p>}
      </Sheet>}
    </div>
  );
};

const Vacancies: React.FC<{ s: S }> = ({ s }) => {
  const [sel, setSel] = useState<Vac | null>(null); const [ref, setRef] = useState("");
  const live = sel ? s.vacs.find((v) => v.id === sel.id)! : null;
  return (
    <div className="space-y-4">
      <Table rows={[...s.vacs].sort((a, b) => b.days - a.days)} onRow={(v) => { setSel(v); setRef(v.ref); }} cols={[{ k: "unit", h: "Unit", r: (v) => v.unit.slice(-6) }, { k: "id", h: "Vacancy" }, { k: "reason", h: "Reason" }, { k: "days", h: "Vacant for", r: (v) => <span>{v.days} days {v.days > THRESHOLD && <Pill tone="act">over limit</Pill>}</span> }, { k: "grade", h: "Condition", r: (v) => <Pill s={v.grade} /> }, { k: "ref", h: "Allocation ref", r: (v) => v.ref || "None yet" }]} />
      {live && <Sheet title={live.id} onClose={() => setSel(null)}>
        <Facts rows={[["Unit", live.unit], ["Reason", live.reason], ["Vacant for", `${live.days} days`], ["Rent lost so far", etb((s.rentOf(live.unit) * live.days) / 30)]]} />
        <p className="text-sm text-[var(--color-slate)]">The City Leasing Authority decides who gets the unit. Here you only record its decision reference.</p>
        <Field label="Decision reference number"><input className={inputCls} value={ref} onChange={(e) => setRef(e.target.value)} /></Field>
        <Btn className="w-full" disabled={!ref.trim()} onClick={() => { s.setVacs((p) => p.map((v) => (v.id === live.id ? { ...v, ref: ref.trim() } : v))); setSel(null); }}>Record decision</Btn>
      </Sheet>}
    </div>
  );
};
const VacancyInsight: React.FC<{ s: S }> = ({ s }) => {
  const bucket = (lo: number, hi: number) => s.vacs.filter((v) => v.days > lo && v.days <= hi).length;
  const reasons = [...new Set(s.vacs.map((v) => v.reason))].map((r): [string, number] => [r, s.vacs.filter((v) => v.reason === r).length]);
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <Panel title="How long units stay empty"><Bars rows={[["0 to 30 days", bucket(-1, 30)], ["31 to 60 days", bucket(30, 60)], ["61 to 90 days", bucket(60, 90)], ["Over 90 days", bucket(90, 9999)]]} /></Panel>
      <Panel title="Why they are empty"><Bars rows={reasons} /></Panel>
      <Kpi label="Estimated rent lost" value={etb(s.vacs.reduce((a, v) => a + (s.rentOf(v.unit) * v.days) / 30, 0))} sub="Across all open vacancies" />
    </div>
  );
};

export const PropertyManagerApp: React.FC = () => {
  const s = usePm();
  const tabs: ModTab[] = [
    { id: "overview", icon: LayoutDashboard, am: "ዋና", en: "Overview", node: <Overview s={s} /> },
    { id: "portfolio", icon: Building2, am: "ንብረቶች", en: "Portfolio", screens: [{ id: "buildings", am: "ህንፃዎች", en: "Buildings", node: <Buildings s={s} /> }, { id: "units", am: "ቤቶች", en: "Units", node: <Units s={s} /> }] },
    { id: "tenancy", icon: Users, am: "ተከራዮች", en: "Tenancy", screens: [{ id: "tenants", am: "ተከራዮች", en: "Tenants", node: <Tenants s={s} /> }, { id: "leases", am: "ውሎች", en: "Leases", node: <Leases s={s} /> }] },
    { id: "vacancies", icon: DoorOpen, am: "ክፍት ቤቶች", en: "Vacancies", screens: [{ id: "register", am: "መዝገብ", en: "Register", node: <Vacancies s={s} /> }, { id: "insight", am: "ትንተና", en: "Insight", node: <VacancyInsight s={s} /> }] },
  ];
  return <ModuleApp tabs={tabs} />;
};
