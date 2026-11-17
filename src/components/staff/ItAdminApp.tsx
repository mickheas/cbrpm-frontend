import React, { useContext, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Activity, KeyRound, Server, ShieldCheck, Plus } from "lucide-react";
import { ModuleApp, ModNav } from "./ModuleApp";
import type { ModTab } from "./ModuleApp";
import { ROLE_LABEL } from "../AppShell";
import { Pill, Kpi, Panel, Table, Toolbar, Select, Field, inputCls, Btn, Sheet, Facts, SampleBar, now, stamp } from "../ui";

const ROLES = Object.values(ROLE_LABEL).map((r) => r[1]).filter((r) => r !== "Tenant");
const MFA_DEFAULT = ["IT Administrator", "City Management", "Finance Officer"];
const SUBCITIES: [string, string][] = [["Addis Ketema", "አዲስ ከተማ"], ["Akaky Kaliti", "አቃቂ ቃሊቲ"], ["Arada", "አራዳ"], ["Bole", "ቦሌ"], ["Gullele", "ጉለሌ"], ["Kirkos", "ቂርቆስ"], ["Kolfe Keranio", "ኮልፌ ቀራንዮ"], ["Lideta", "ልደታ"], ["Nifas Silk-Lafto", "ንፋስ ስልክ ላፍቶ"], ["Yeka", "የካ"], ["Lemi Kura", "ለሚ ኩራ"]];
const SERVICES: [string, string, string][] = [
  ["Payment providers (Telebirr, CBE Birr, banks)", "Healthy", "If down: receipts wait as Pending Verification and retry; invoices stay viewable."],
  ["Municipal GIS", "Degraded", "If down: the map is hidden; everything else keeps working."],
  ["SMS gateway", "Healthy", "If down: messages are queued; no transaction rolls back."],
  ["Email gateway", "Healthy", "If down: messages are queued and retried."],
  ["Fayda and TIN verification", "Healthy", "If down: tenant profiles wait in Pending Verification."],
  ["Object storage and antivirus", "Healthy", "If down: uploads stay Pending; nothing is marked saved."],
];
/* module access per role, columns: City Mgmt, Property Mgr, Finance, Maintenance, Customer Service, Field Officer, Tenant, IT Admin */
const MATRIX: [string, ...string[]][] = [
  ["Buildings", "V", "M", "-", "-", "-", "M (handover)", "-", "-"], ["Units", "V", "M", "-", "-", "-", "-", "-", "-"], ["Tenants", "V", "M", "-", "-", "M", "-", "S", "-"],
  ["Leases", "V, A (rent override)", "M", "-", "-", "-", "-", "V", "-"], ["Billing and payments", "V", "-", "M", "-", "-", "-", "S", "-"], ["Arrears (Phase 2)", "V", "-", "M", "-", "-", "-", "V", "-"],
  ["Vacancy", "V", "M", "-", "-", "-", "-", "-", "-"], ["Inspection (Phase 2)", "V", "-", "-", "M", "-", "M", "-", "-"], ["Maintenance", "V", "-", "-", "M", "-", "M (emergency)", "S", "-"],
  ["Reconstruction", "A", "-", "M (disbursement)", "M", "-", "M (milestones)", "-", "-"], ["Complaints", "V", "-", "-", "-", "M", "-", "S", "-"], ["Reconciliation", "V", "-", "M", "-", "-", "-", "-", "-"],
  ["Dashboards", "V", "V", "-", "-", "-", "-", "-", "-"], ["Reports", "V", "-", "M", "-", "-", "-", "-", "-"], ["Notifications", "Own inbox", "Own inbox", "Own inbox", "Own inbox", "Own inbox", "Own inbox", "Own inbox", "M (templates)"],
  ["Security, users, audit, backup", "V (audit)", "-", "-", "-", "-", "-", "-", "M"],
];
const ROLE_COL = ["City Management", "Property Manager", "Finance Officer", "Maintenance Officer", "Customer Service Rep", "Field Officer", "Tenant", "IT Administrator"];

interface User { id: string; name: string; role: string; sub: string; mfa: boolean; status: string; last: string }
interface Ev { t: string; user: string; action: string; record: string; result: string }
interface Job { id: string; name: string; when: string; last: string; status: string }
interface Bk { id: string; at: string; kind: string; size: string; status: string }

function useIt() {
  const { currentUser: me } = useApp();
  const [users, setUsers] = useState<User[]>([
    { id: "USR-0001", name: me?.name ?? "IT Administrator", role: "IT Administrator", sub: "City-wide", mfa: true, status: "Active", last: "Today 08:02" },
    { id: "USR-0012", name: "Dawit Haile", role: "Property Manager", sub: "Kirkos", mfa: false, status: "Active", last: "Today 07:41" },
    { id: "USR-0014", name: "Rahel Bekele", role: "Finance Officer", sub: "Kirkos", mfa: true, status: "Active", last: "Yesterday" },
    { id: "USR-0019", name: "Samuel Girma", role: "Maintenance Officer", sub: "Bole", mfa: false, status: "Active", last: "2 days ago" },
    { id: "USR-0023", name: "Tigist Worku", role: "Customer Service Rep", sub: "Arada", mfa: false, status: "Deactivated", last: "3 weeks ago" },
    { id: "USR-0030", name: "Yonas Alemayehu", role: "City Management", sub: "City-wide", mfa: true, status: "Active", last: "Today 06:55" },
  ]);
  const [audit, setAudit] = useState<Ev[]>([
    { t: "2026-11-16 08:02", user: me?.name ?? "IT Administrator", action: "Signed in", record: "Session", result: "Success" },
    { t: "2026-11-16 02:00", user: "System", action: "Scheduled backup", record: "BKP-20261116-0200", result: "Success" },
    { t: "2026-11-15 17:12", user: "Rahel Bekele", action: "Overrode reconciliation case", record: "REC-20261115-0003", result: "Success" },
    { t: "2026-11-15 09:30", user: "Unknown", action: "Failed sign-in (3 attempts)", record: "USR-0023", result: "Failed" },
  ]);
  const [sessions, setSessions] = useState([{ id: "s1", user: "Dawit Haile", device: "Chrome on Windows", since: "07:41", idle: "2 min" }, { id: "s2", user: "Rahel Bekele", device: "Edge on Windows", since: "08:15", idle: "9 min" }, { id: "s3", user: "Yonas Alemayehu", device: "Safari on iPad", since: "06:55", idle: "41 min" }]);
  const [jobs, setJobs] = useState<Job[]>([
    { id: "J1", name: "SLA escalation worker", when: "Every 15 min", last: "08:30", status: "Completed" }, { id: "J2", name: "Dashboard aggregation", when: "Every 15 min", last: "08:30", status: "Completed" },
    { id: "J3", name: "Nightly reconciliation", when: "Daily 00:00", last: "00:04", status: "Completed" }, { id: "J4", name: "Report generation", when: "Daily 01:00", last: "01:00", status: "Retrying" },
    { id: "J5", name: "SMS dispatch", when: "Continuous", last: "08:29", status: "Failed" }, { id: "J6", name: "Receipt verification retries", when: "Continuous", last: "08:31", status: "Running" },
  ]);
  const [backups, setBackups] = useState<Bk[]>([{ id: "BKP-20261116-0200", at: "2026-11-16 02:00", kind: "Scheduled", size: "4.2 GB", status: "Completed" }, { id: "BKP-20261115-0200", at: "2026-11-15 02:00", kind: "Scheduled", size: "4.1 GB", status: "Completed" }, { id: "BKP-20261114-0200", at: "2026-11-14 02:00", kind: "Scheduled", size: "4.1 GB", status: "Completed" }]);
  const [settings, setSettings] = useState({ vacancy: "30", retry: "5", slaStd: "48", slaUrgent: "24", w1: "0.4", w2: "0.4", w3: "0.1", w4: "0.1" });
  const log = (action: string, record: string, result = "Success") => setAudit((p) => [{ t: stamp(), user: me?.name ?? "IT Administrator", action, record, result }, ...p]);
  return { users, setUsers, audit, log, sessions, setSessions, jobs, setJobs, backups, setBackups, settings, setSettings };
}
type S = ReturnType<typeof useIt>;

const Overview: React.FC<{ s: S }> = ({ s }) => {
  const go = useContext(ModNav); const [at, setAt] = useState(now());
  const act = s.users.filter((u) => u.status === "Active");
  const priv = act.filter((u) => MFA_DEFAULT.includes(u.role));
  const failed = s.jobs.filter((j) => j.status === "Failed");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">System health</h1>
      <SampleBar at={at} onRefresh={() => setAt(now())} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi label="Active users" value={String(act.length)} sub={`${s.sessions.length} signed in now`} />
        <Kpi label="MFA on privileged roles" value={`${Math.round((priv.filter((u) => u.mfa).length / Math.max(priv.length, 1)) * 100)}%`} sub="Target 100%" tone={priv.every((u) => u.mfa) ? "ok" : "act"} />
        <Kpi label="Failed jobs" value={String(failed.length)} sub={failed[0]?.name ?? "All clear"} tone={failed.length ? "act" : "ok"} />
        <Kpi label="Failed sign-ins, 24 h" value="3" sub="Trend, last 12 h" spark={[0, 1, 0, 0, 2, 1, 0, 0, 3, 0, 1, 0]} />
      </div>
      <Panel title="Connected services" note="What each one does to the system when it is down, as the SRS specifies.">
        <ul className="border-t border-[var(--color-line)]">{SERVICES.map(([n, st, note]) => (
          <li key={n} className="py-3 border-b border-[var(--color-line)] flex items-start justify-between gap-3"><div><div className="font-bold text-lg">{n}</div><div className="text-base text-[var(--color-slate)]">{note}</div></div><Pill s={st} /></li>))}</ul>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <Panel title="Jobs that need a look">
          {s.jobs.filter((j) => j.status === "Failed" || j.status === "Retrying").map((j) => <button key={j.id} type="button" onClick={() => go("operations", "jobs")} className="w-full text-left py-3 border-b border-[var(--color-line)] flex justify-between gap-3"><span className="font-bold text-lg">{j.name}</span><Pill s={j.status} /></button>)}
        </Panel>
        <Panel title="Latest in the audit log">
          <ul className="border-t border-[var(--color-line)]">{s.audit.slice(0, 4).map((e, i) => <li key={i} className="py-2 border-b border-[var(--color-line)]"><div className="font-semibold">{e.action}</div><div className="text-sm text-[var(--color-slate)]">{e.t} · {e.user}</div></li>)}</ul>
        </Panel>
      </div>
    </div>
  );
};

const Users: React.FC<{ s: S }> = ({ s }) => {
  const [q, setQ] = useState(""); const [role, setRole] = useState(""); const [sel, setSel] = useState<User | null>(null); const [add, setAdd] = useState(false); const [err, setErr] = useState("");
  const [f, setF] = useState({ name: "", phone: "+251", role: ROLES[0], sub: "Kirkos", mfa: true });
  const live = sel ? s.users.find((u) => u.id === sel.id)! : null;
  const rows = s.users.filter((u) => (u.name + u.id).toLowerCase().includes(q.toLowerCase()) && (!role || u.role === role));
  const city = f.role === "City Management" || f.role === "IT Administrator";
  const create = () => {
    if (!f.name.trim()) return setErr("Name is required.");
    if (!/^\+251[79]\d{8}$/.test(f.phone)) return setErr("Phone must look like +2519XXXXXXXX.");
    const u: User = { id: `USR-${String(40 + s.users.length).padStart(4, "0")}`, name: f.name.trim(), role: f.role, sub: city ? "City-wide" : f.sub, mfa: f.mfa, status: "Active", last: "Never" };
    s.setUsers((p) => [...p, u]); s.log("Created user", u.id); setAdd(false); setErr(""); setF({ name: "", phone: "+251", role: ROLES[0], sub: "Kirkos", mfa: true });
  };
  const toggle = () => { if (!live) return; const next = live.status === "Active" ? "Deactivated" : "Active"; s.setUsers((p) => p.map((u) => (u.id === live.id ? { ...u, status: next } : u))); s.log(next === "Active" ? "Reactivated user" : "Deactivated user", live.id); };
  return (
    <div className="space-y-4">
      <Toolbar q={q} setQ={setQ} placeholder="Search by name or user ID"><Select label="Role" value={role} onChange={setRole} options={ROLES} all="All roles" /><Btn onClick={() => setAdd(true)}><Plus className="w-5 h-5" aria-hidden="true" />New user</Btn></Toolbar>
      <Table rows={rows} onRow={setSel} cols={[{ k: "name", h: "Name" }, { k: "role", h: "Role" }, { k: "sub", h: "Sub-city" }, { k: "mfa", h: "MFA", r: (u) => <Pill s={u.mfa ? "On" : "Off"} /> }, { k: "status", h: "Status", r: (u) => <Pill s={u.status} /> }, { k: "last", h: "Last sign-in" }]} />
      {live && <Sheet title={live.name} onClose={() => setSel(null)}>
        <Facts rows={[["User ID", live.id], ["Role", live.role], ["Sub-city", live.sub], ["MFA", <Pill key="m" s={live.mfa ? "On" : "Off"} />], ["Status", <Pill key="s" s={live.status} />], ["Last sign-in", live.last]]} />
        <p className="text-sm text-[var(--color-slate)]">Accounts are deactivated, never deleted, so the audit trail stays whole.</p>
        <div className="grid sm:grid-cols-2 gap-3"><Btn kind="ghost" onClick={() => s.log("Sent password reset", live.id)}>Send reset code</Btn><Btn kind={live.status === "Active" ? "danger" : "primary"} onClick={toggle}>{live.status === "Active" ? "Deactivate" : "Reactivate"}</Btn></div>
      </Sheet>}
      {add && <Sheet title="New user" onClose={() => setAdd(false)}>
        <Field label="Full name"><input className={inputCls} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
        <Field label="Mobile phone"><input className={inputCls} inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
        <Field label="Role"><Select label="Role" value={f.role} onChange={(v) => setF({ ...f, role: v, mfa: MFA_DEFAULT.includes(v) })} options={ROLES} /></Field>
        <Field label="Sub-city" hint={city ? "This role sees the whole city." : "This user will only see data from this sub-city."}><Select label="Sub-city" value={city ? "City-wide" : f.sub} onChange={(v) => setF({ ...f, sub: v })} options={city ? ["City-wide"] : SUBCITIES.map((x) => x[0])} /></Field>
        <label className="flex items-center gap-3 text-base font-semibold min-h-[44px]"><input type="checkbox" className="w-6 h-6 accent-[var(--color-accent)]" checked={f.mfa} onChange={(e) => setF({ ...f, mfa: e.target.checked })} />Require MFA (on by default for IT Administrator, City Management and Finance Officer)</label>
        {err && <p role="alert" className="text-[var(--color-danger)] font-semibold">{err}</p>}
        <Btn className="w-full" onClick={create}>Create user</Btn>
      </Sheet>}
    </div>
  );
};

const Roles: React.FC = () => {
  const [r, setR] = useState(ROLE_COL[0]); const i = ROLE_COL.indexOf(r) + 1;
  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex flex-wrap gap-2">{ROLE_COL.map((c) => <button key={c} type="button" aria-pressed={r === c} onClick={() => setR(c)} className={`min-h-[44px] px-4 rounded-full border-2 text-base font-semibold ${r === c ? "border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-[var(--color-accent)]" : "border-[var(--color-line)]"}`}>{c}</button>)}</div>
      <ul className="border-t border-[var(--color-line)]">{MATRIX.map((m) => <li key={m[0]} className="py-3 border-b border-[var(--color-line)] flex justify-between gap-3"><span className="text-lg font-semibold">{m[0]}</span><span className={`text-base font-bold ${m[i] === "-" ? "text-[var(--color-slate)]" : "text-[var(--color-accent)]"}`}>{m[i] === "-" ? "No access" : m[i]}</span></li>)}</ul>
      <p className="text-sm text-[var(--color-slate)]">M manage · V view · A approve · S own records only. This matrix is derived from the SRS use cases; the real permissions live in the roles table.</p>
    </div>
  );
};

const Zones: React.FC<{ s: S }> = ({ s }) => (
  <div className="space-y-4">
    <p className="text-base text-[var(--color-slate)]">Every user is fenced to one sub-city unless their role is city-wide. Nobody can read across the boundary.</p>
    <Table rows={SUBCITIES} cols={[{ k: "0", h: "Sub-city", r: (z) => z[0] }, { k: "1", h: "Amharic name", r: (z) => z[1] }, { k: "u", h: "Staff users (sample)", r: (z) => s.users.filter((u) => u.sub === z[0]).length }]} />
  </div>
);

const Jobs: React.FC<{ s: S }> = ({ s }) => {
  const retry = (j: Job) => { s.setJobs((p) => p.map((x) => (x.id === j.id ? { ...x, status: "Retrying" } : x))); s.log("Retried job", j.name); };
  return <Table rows={s.jobs} cols={[{ k: "name", h: "Job" }, { k: "when", h: "Runs" }, { k: "last", h: "Last run" }, { k: "status", h: "Status", r: (j) => <Pill s={j.status} /> }, { k: "a", h: "", r: (j) => j.status === "Failed" ? <Btn kind="ghost" onClick={() => retry(j)}>Retry</Btn> : null }]} />;
};

const Backups: React.FC<{ s: S }> = ({ s }) => {
  const [open, setOpen] = useState(false); const [pick, setPick] = useState(s.backups[0].id); const [why, setWhy] = useState(""); const [word, setWord] = useState("");
  const now1 = () => { const id = `BKP-${stamp().replace(/\D/g, "").slice(0, 12)}`; s.setBackups((p) => [{ id, at: stamp(), kind: "Manual", size: "pending", status: "Queued" }, ...p]); s.log("Started manual backup", id); };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3"><Btn onClick={now1}>Back up now</Btn><Btn kind="ghost" onClick={() => setOpen(true)}>Restore…</Btn></div>
      <Table rows={s.backups} cols={[{ k: "id", h: "Backup" }, { k: "at", h: "Taken" }, { k: "kind", h: "Type" }, { k: "size", h: "Size" }, { k: "status", h: "Status", r: (b) => <Pill s={b.status} /> }]} />
      {open && <Sheet title="Restore from a backup" onClose={() => setOpen(false)}>
        <p className="rounded-xl bg-[var(--color-danger-dim)] text-[var(--color-danger)] p-3 font-semibold">Restoring replaces current data. Take a fresh backup first.</p>
        <Select label="Backup" value={pick} onChange={setPick} options={s.backups.filter((b) => b.status === "Completed").map((b) => b.id)} />
        <Field label="Reason (kept in the audit log)"><input className={inputCls} value={why} onChange={(e) => setWhy(e.target.value)} /></Field>
        <Field label="Type RESTORE to confirm"><input className={inputCls} value={word} onChange={(e) => setWord(e.target.value)} /></Field>
        <Btn kind="danger" className="w-full" disabled={!why.trim() || word !== "RESTORE"} onClick={() => { s.log("Requested restore", pick); setOpen(false); setWhy(""); setWord(""); }}>Restore</Btn>
      </Sheet>}
    </div>
  );
};

const Settings: React.FC<{ s: S }> = ({ s }) => {
  const base = useRef(s.settings); const [f, setF] = useState(s.settings); const [why, setWhy] = useState(""); const [err, setErr] = useState("");
  const F: [keyof typeof f, string, string][] = [["vacancy", "Vacancy alert after (days)", "Default 30"], ["retry", "Receipt verification retries", "Default 5"], ["slaStd", "Standard complaint SLA (hours)", "48"], ["slaUrgent", "Urgent complaint SLA (hours)", "24"], ["w1", "Ranking weight W1: occupancy", "City Management authorises"], ["w2", "W2: collection", ""], ["w3", "W3: arrears", ""], ["w4", "W4: maintenance cost", ""]];
  const changed = F.filter(([k]) => f[k] !== base.current[k]).map(([, l]) => l);
  const save = () => {
    if (F.some(([k]) => !/^\d+(\.\d+)?$/.test(f[k]))) return setErr("Every value must be a positive number.");
    s.setSettings(f); base.current = f; s.log("Changed settings", `${changed.length} value(s): ${why.trim()}`); setWhy(""); setErr("");
  };
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">{F.map(([k, l, h]) => <Field key={k} label={l} hint={h || undefined}><input className={inputCls} inputMode="decimal" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} /></Field>)}</div>
      <Field label="Reason for the change (kept in the audit log)"><input className={inputCls} value={why} onChange={(e) => setWhy(e.target.value)} /></Field>
      {err && <p role="alert" className="text-[var(--color-danger)] font-semibold">{err}</p>}
      <Btn disabled={!changed.length || !why.trim()} onClick={save}>{changed.length ? `Save ${changed.length} change${changed.length > 1 ? "s" : ""}` : "No changes"}</Btn>
    </div>
  );
};

const Audit: React.FC<{ s: S }> = ({ s }) => {
  const [q, setQ] = useState(""); const [res, setRes] = useState("");
  const rows = s.audit.filter((e) => `${e.user} ${e.action} ${e.record}`.toLowerCase().includes(q.toLowerCase()) && (!res || e.result === res));
  return (
    <div className="space-y-4">
      <Toolbar q={q} setQ={setQ} placeholder="Search user, action or record"><Select label="Result" value={res} onChange={setRes} options={["Success", "Failed"]} all="Any result" /></Toolbar>
      <Table rows={rows} cols={[{ k: "t", h: "Time" }, { k: "user", h: "User" }, { k: "action", h: "Action" }, { k: "record", h: "Record" }, { k: "result", h: "Result", r: (e) => <Pill s={e.result === "Success" ? "Completed" : "Failed"}>{e.result}</Pill> }]} />
      <p className="text-sm text-[var(--color-slate)]">Read-only. Entries cannot be edited or removed.</p>
    </div>
  );
};
const Sessions: React.FC<{ s: S }> = ({ s }) => (
  <div className="space-y-4">
    <p className="text-base text-[var(--color-slate)]">Inactive sessions end on their own, and a second sign-in for the same account is blocked. The field app asks for sign-in again after 10 idle minutes.</p>
    <Table rows={s.sessions} cols={[{ k: "user", h: "User" }, { k: "device", h: "Device" }, { k: "since", h: "Since" }, { k: "idle", h: "Idle" }, { k: "a", h: "", r: (x) => <Btn kind="danger" onClick={() => { s.setSessions((p) => p.filter((y) => y.id !== x.id)); s.log("Forced sign-out", x.user); }}>Sign out</Btn> }]} empty="No one is signed in." />
  </div>
);

export const ItAdminApp: React.FC = () => {
  const s = useIt();
  const tabs: ModTab[] = [
    { id: "health", icon: Activity, am: "ጤና", en: "Health", node: <Overview s={s} /> },
    { id: "access", icon: KeyRound, am: "መዳረሻ", en: "Access", screens: [{ id: "users", am: "ተጠቃሚዎች", en: "Users", node: <Users s={s} /> }, { id: "roles", am: "ሚናዎች", en: "Roles", node: <Roles /> }, { id: "zones", am: "ክፍለ ከተሞች", en: "Zones", node: <Zones s={s} /> }] },
    { id: "operations", icon: Server, am: "ሥራዎች", en: "Operations", screens: [{ id: "jobs", am: "ሥራዎች", en: "Jobs", node: <Jobs s={s} /> }, { id: "backups", am: "ምትኬ", en: "Backups", node: <Backups s={s} /> }, { id: "settings", am: "ቅንብር", en: "Settings", node: <Settings s={s} /> }] },
    { id: "security", icon: ShieldCheck, am: "ደህንነት", en: "Security", screens: [{ id: "audit", am: "ኦዲት", en: "Audit log", node: <Audit s={s} /> }, { id: "sessions", am: "ክፍለ ጊዜዎች", en: "Sessions", node: <Sessions s={s} /> }] },
  ];
  return <ModuleApp tabs={tabs} />;
};
