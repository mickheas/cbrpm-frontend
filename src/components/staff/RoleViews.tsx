import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { RefreshCw, ArrowRight, Check, Info } from "lucide-react";
import { Arch } from "../AppShell";

type Tone = "ok" | "wait" | "act";
const TONE: Record<Tone, string> = {
  ok: "bg-[var(--color-success-dim)] text-[var(--color-success)]",
  wait: "bg-[var(--color-warning-dim)] text-[var(--color-warning)]",
  act: "bg-[var(--color-danger-dim)] text-[var(--color-danger)]",
};
const Chip: React.FC<{ tone?: Tone; children: React.ReactNode }> = ({ tone, children }) => (
  <span className={`inline-flex items-center px-2.5 h-7 rounded-full text-sm font-semibold shrink-0 ${tone ? TONE[tone] : "bg-[var(--color-subtle)] text-[var(--color-slate)]"}`}>{children}</span>
);

/* ---------- Desk definitions: names, SRS screen/use-case IDs, purpose, actions, states, rules ---------- */
export interface Desk {
  icon: LucideIcon; am: string; en: string; short: string; scr: string; uc: string; phase: string;
  purpose: string; actions: string[]; states?: string[]; rules: string[];
}
import {
  Building2, FileText, DoorOpen, ReceiptText, Scale, BarChart3, Wrench, HardHat, Users, MessageSquareWarning,
  UserPlus, ClipboardCheck, RefreshCcw, Stamp, Trophy, ShieldCheck, ScrollText, Server,
} from "lucide-react";

export const DESKS: Record<string, Desk> = {
  buildings: { icon: Building2, am: "ህንፃዎችና ቤቶች", en: "Buildings", short: "Buildings & units", scr: "SCR-01-01…04 · 02-01…03", uc: "UC-01-01 · 01-02 · 01-03", phase: "Phase 1 (handover to be confirmed)",
    purpose: "Register every municipal building, index its units and keep each unit's status current.",
    actions: ["Search the building directory and open an asset profile", "Register a building (drafts are saved so you can resume)", "Record a handover audit with the Sub-City Lead Inspector", "View buildings on the GIS map (the rest works if GIS is down)", "Change a unit's status and read its transition history"],
    states: ["Occupied", "Vacant", "Reserved", "Under Maintenance", "Under Reconstruction", "Unavailable", "Decommissioned"],
    rules: ["If someone else saved first you are told, never silently overwritten", "Records are archived, never hard-deleted"] },
  tenants: { icon: FileText, am: "ተከራዮችና ውሎች", en: "Leases", short: "Tenants & leases", scr: "SCR-03-01…03 · 04-01…03", uc: "UC-02-01 · 02-02 · 02-04", phase: "Phase 1",
    purpose: "Register tenants, create and renew leases, and act on expiry alerts.",
    actions: ["Register an individual or commercial tenant and link them to a unit", "Create a lease, renew it, adjust rent or terminate it", "See the expiry schedule and the alerts raised for it", "Open a tenant's full profile"],
    states: ["Draft", "Active", "Renewal Pending", "Renewed", "Terminated", "Expired"],
    rules: ["Tenant ID checks (Fayda / TIN) may leave a profile in Pending Verification", "A rent override needs City Management approval"] },
  vacancies: { icon: DoorOpen, am: "ክፍት ቤቶች", en: "Vacancies", short: "Vacancy register", scr: "SCR-07-01 · 07-02 · 07-03", uc: "UC-02-03", phase: "Phase 1 (allocation support deferred)",
    purpose: "Know which units are empty, why, for how long, and what that costs in rent.",
    actions: ["Browse the live vacancy register by reason and age", "See potential rent lost per vacancy", "Record the allocation decision reference and attachment"],
    states: ["Lease Expired", "Evicted", "New Handover", "Lease Terminated", "Renovation"],
    rules: ["The City Leasing Authority decides allocation; the system only records its reference", "Alerts fire when a unit is vacant beyond the sub-city threshold"] },
  verify: { icon: ReceiptText, am: "ክፍያ ማረጋገጫ", en: "Payments", short: "Verify payments", scr: "SCR-05-02 · 05-04", uc: "UC-03-02 · 03-02b", phase: "Phase 1 (in-house engine)",
    purpose: "Verify tenant receipts against the bank or provider and post them to the ledger.",
    actions: ["Submit or review a receipt by screenshot, QR link or reference token", "See the four checks: provider SUCCESS, exact amount, unique token, correct municipal account", "Work the Reconciliation Case queue and apply a manual override with a reason", "Read a tenant's ledger and account status"],
    states: ["Pending Verification", "Verified - Source Matched", "Amount Mismatch", "Token Duplicate", "Failed Provider Check"],
    rules: ["Pending is never counted as paid", "A duplicate token is rejected and flagged as suspected fraud", "An override needs a named officer and a recorded reason"] },
  reconcile: { icon: Scale, am: "ሂሳብ ማስታረቅ", en: "Reconcile", short: "Reconciliation", scr: "SCR-12-01 · 12-02", uc: "UC-03-06 · UC-P-05", phase: "Phase 1 (GL posting deferred)",
    purpose: "Match rent due, funds received and bank statements, and resolve variances.",
    actions: ["Open the daily reconciliation workbench", "Resolve a variance, with dual authorisation from the Chief Finance Officer", "Check posting status of daily journals"],
    states: ["Pending", "Posted", "Failed", "Reconciled"], rules: ["Variance alerts go to the Chief Finance Officer"] },
  reports: { icon: BarChart3, am: "ሪፖርቶች", en: "Reports", short: "Reports", scr: "SCR-12-03 · 14-01 · 14-02", uc: "UC-06-04", phase: "Phase 1",
    purpose: "Read income, expense and net revenue, and download scheduled periodic reports.",
    actions: ["View the income, expense and net revenue console", "Schedule and distribute reports", "Download from the archive as PDF, XLSX or CSV"],
    states: ["Queued", "Running", "Completed", "Failed", "Retrying"], rules: ["Monthly summary, quarterly arrears audit, annual asset inventory"] },
  tickets: { icon: Wrench, am: "የጥገና ጥያቄዎች", en: "Tickets", short: "Maintenance tickets", scr: "SCR-09-01…03", uc: "UC-04-02 · UC-04-03", phase: "Phase 1 (emergency screen to be confirmed)",
    purpose: "Move every repair from report to verified close, and respond fast to emergencies.",
    actions: ["Open a ticket on behalf of a tenant or inspector", "Advance a ticket to the next valid step", "Log an emergency incident that skips normal scheduling", "Approve budget within your threshold, or pass it up"],
    states: ["Reported", "Registered", "Inspected", "Approved", "Assigned", "Repair Completed", "Verified", "Closed"],
    rules: ["You only see steps valid for the ticket's state and your role", "Critical or Immediate tickets reach the Maintenance Director directly"] },
  projects: { icon: HardHat, am: "የግንባታ ፕሮጀክቶች", en: "Projects", short: "Reconstruction projects", scr: "SCR-10-01 · 10-03", uc: "UC-04-04", phase: "Phase 1 (capital spend deferred)",
    purpose: "Plan, approve and track reconstruction work and its milestones.",
    actions: ["Assess, cost and submit a project for approval", "Assign a contractor", "Verify milestones and release disbursement requests"],
    states: ["Technical Review", "Approved", "In-Progress", "Suspended", "Completed"], rules: ["City Management approves; Treasury releases payment outside this system"] },
  contractors: { icon: Users, am: "ተቋራጮች", en: "Contractors", short: "Contractors", scr: "SCR-10-02", uc: "UC-04-05", phase: "Phase 1",
    purpose: "Keep the certified contractor register and link contractors to work orders.",
    actions: ["Maintain contractor master files", "Link a contractor to a work order", "Collect completion evidence and invoices"], rules: ["Contractors have no login in the SRS; staff act on their behalf (open question)"] },
  complaints: { icon: MessageSquareWarning, am: "ቅሬታዎች", en: "Complaints", short: "Complaints desk", scr: "SCR-11-02", uc: "UC-05-01 · 05-03 · 05-04", phase: "Phase 1",
    purpose: "Log, route and resolve complaints before the SLA runs out.",
    actions: ["Log a complaint for a walk-in citizen and give a tracking ID", "Watch SLA clocks (48 h standard, 24 h urgent)", "Ask the tenant to confirm the resolution and rate it"],
    states: ["Submitted", "Assigned", "In Progress", "Resolved Pending Confirmation", "Closed"], rules: ["Unresolved breaches escalate: Desk, then Sub-City Head, then City Director", "Ratings of 1 to 2 stars go to quality review"] },
  register: { icon: UserPlus, am: "ተከራይ መመዝገቢያ", en: "Register", short: "Register tenants", scr: "SCR-03-01 · 03-02", uc: "UC-02-01", phase: "Phase 1",
    purpose: "Register walk-in tenants at the desk and help them find their record.",
    actions: ["Search the tenant directory", "Register an individual, commercial entity, agency or NGO"], rules: ["Profiles can wait in Pending Verification for ID checks"] },
  inspections: { icon: ClipboardCheck, am: "ፍተሻዎች", en: "Inspect", short: "My inspections", scr: "SCR-17-01 · 17-02 · 08-01…03", uc: "UC-04-01 · UC-04-03", phase: "Phase 2",
    purpose: "Do assigned site inspections offline, with GPS, ratings and photos.",
    actions: ["See today's assigned sites", "Rate each component from 1 (Critical) to 5 (Excellent)", "Attach geotagged photos and a recommended action", "Flag an emergency defect"],
    states: ["No Action", "Routine Maintenance Needed", "Major Reconstruction Needed", "Condemn"], rules: ["You sign in again after 10 minutes idle", "Drafts survive a dropped connection"] },
  sync: { icon: RefreshCcw, am: "ማመሳሰያ", en: "Sync", short: "Sync queue", scr: "SCR-17-03", uc: "UC-P-04", phase: "Phase 2",
    purpose: "See what has uploaded, what is waiting, and fix conflicts.",
    actions: ["Watch connectivity and the queue", "Retry a failed item", "Choose which version to keep on conflict"],
    states: ["Queued Offline", "Syncing", "Synced Successfully", "Conflict Error"], rules: ["A retry returns the original result; nothing is saved twice"] },
  approvals: { icon: Stamp, am: "ፈቃዶች", en: "Approvals", short: "Approvals inbox", scr: "SCR-X-06", uc: "UC-06-03", phase: "To be confirmed",
    purpose: "Sign off the decisions that need City Management authority.",
    actions: ["Review rent changes, debt write-offs, major capital spend and lease overrides", "Approve or reject, with a reason"], rules: ["Approval requests always reach you by SMS and in-app"] },
  rankings: { icon: Trophy, am: "ደረጃ", en: "Rankings", short: "Property ranking", scr: "SCR-13-03 · 13-02", uc: "UC-06-02 · UC-06-01", phase: "Phase 1",
    purpose: "Compare properties on one weighted score and watch 12-month trends.",
    actions: ["Open the ranking matrix with its four ratios", "Explore trends for income, collection, arrears, vacancy, maintenance spend and complaints"],
    rules: ["Score = W1×Occupancy + W2×Collection − W3×Arrears − W4×Maintenance cost", "City Management sets the weights"] },
  users: { icon: Users, am: "ተጠቃሚዎች", en: "Users", short: "Users & roles", scr: "SCR-X-03 · X-04", uc: "UC-00-02 · UC-00-03", phase: "Phase 1",
    purpose: "Create accounts, assign roles and fence each user to their sub-city.",
    actions: ["Create or deactivate an account", "Assign a role and sub-city boundary", "Help with credential recovery"], rules: ["MFA is enforced for administrative roles", "No one sees outside their sub-city unless city-wide"] },
  audit: { icon: ScrollText, am: "ኦዲት", en: "Audit", short: "Audit log", scr: "SCR-X-07", uc: "UC-06-05", phase: "To be confirmed",
    purpose: "Search the tamper-proof record of who did what, and when.",
    actions: ["Filter by user, action, record and date", "Open an approval's full history"], rules: ["Read-only; nothing here can be edited or removed"] },
  system: { icon: Server, am: "ሲስተም", en: "System", short: "Jobs, backups & settings", scr: "SCR-13-04 · X-08 · X-09 · 16-02", uc: "UC-06-06 · UC-P-02 · UC-P-05 · UC-P-06", phase: "Phase 1 (backup console to be confirmed)",
    purpose: "Keep background jobs, backups, notification templates and thresholds healthy.",
    actions: ["Watch job and reconciliation queues", "Restore from a point in time", "Edit notification templates", "Set vacancy threshold, SLA hours, penalty rate and ranking weights"],
    states: ["Queued", "Running", "Completed", "Failed", "Retrying"], rules: ["Notification failures never roll back a transaction"] },
};

export const ROLE_DESKS: Record<string, string[]> = {
  property_manager: ["buildings", "tenants", "vacancies"],
  finance_officer: ["verify", "reconcile", "reports"],
  maintenance_officer: ["tickets", "projects", "contractors"],
  admin_officer: ["complaints", "register"],
  field_inspector: ["inspections", "sync"],
  executive: ["approvals", "rankings", "reports"],
  admin: ["users", "audit", "system"],
};

/* ---------- Role dashboards (sample figures, labelled as such in the UI) ---------- */
interface Home {
  kpis: [string, string, string, Tone?][]; queueTitle: string; queue: [string, string, string, Tone][]; bars?: [string, number][]; barsTitle?: string; note?: string;
}
const HOME: Record<string, Home> = {
  executive: { kpis: [["Occupancy", "91%", "Vacancy 9%"], ["Collection efficiency", "87%", "Collected vs billed"], ["Outstanding rent", "ETB 4.8M", "All sub-cities"], ["Overdue complaints", "14", "Breaching SLA", "act"]],
    barsTitle: "Aged arrears (share of outstanding)", bars: [["1-30 days", 42], ["31-60 days", 28], ["61-90 days", 17], [">90 days", 13]],
    queueTitle: "Waiting for your sign-off", queue: [["Rent adjustment, Kirkos", "Lease override request", "Waiting", "wait"], ["Debt write-off, Bole", "Needs second approver", "Waiting", "wait"], ["Capital spend, Arada", "Reconstruction project", "Waiting", "wait"]] },
  property_manager: { kpis: [["Vacant units", "12", "Over threshold: 3", "wait"], ["Leases expiring", "7", "Next 90 days"], ["Pending tenant checks", "3", "ID verification"], ["Rent lost to vacancy", "ETB 210K", "This month"]],
    queueTitle: "Needs your attention", queue: [["Lease expires in 21 days", "Unit B-204", "Renewal Pending", "wait"], ["Vacant beyond threshold", "Unit A-101", "Vacant", "act"], ["Tenant ID check", "Commercial entity", "Pending", "wait"]] },
  finance_officer: { kpis: [["Receipts pending", "9", "Not counted as paid", "wait"], ["Open reconciliation cases", "4", "Need a named officer"], ["Suspected fraud", "1", "Token locked", "act"], ["Collected this month", "ETB 3.1M", "Verified only", "ok"]],
    queueTitle: "Receipts to review", queue: [["Receipt TXN…1902", "INV-202611-000114", "Pending Verification", "wait"], ["Receipt TXN…5530", "INV-202611-000097", "Amount Mismatch", "act"], ["Receipt TXN…1902", "Resubmitted token", "Token Duplicate", "act"]], note: "A receipt that is still pending is never shown as paid." },
  maintenance_officer: { kpis: [["Open tickets", "23", "All states"], ["Critical emergencies", "2", "Immediate", "act"], ["Awaiting approval", "5", "Inspected", "wait"], ["Projects in progress", "3", "Reconstruction"]],
    queueTitle: "Tickets to move", queue: [["Burst pipe, corridor 3", "Critical Emergency", "Reported", "act"], ["Roof leak", "Major Defect", "Inspected", "wait"], ["Stair light", "Minor Maintenance", "Assigned", "ok"]] },
  admin_officer: { kpis: [["Open complaints", "31", "All levels"], ["Close to SLA", "6", "Under 6 hours", "wait"], ["Overdue", "4", "Escalated", "act"], ["Awaiting tenant", "8", "Confirm resolution"]],
    queueTitle: "Complaints by urgency", queue: [["Billing dispute", "6 h left · Level 0: Desk", "In Progress", "wait"], ["Maintenance delay", "Overdue · Level 1: Sub-City Head", "Assigned", "act"], ["Lease issue", "Confirm with tenant", "Resolved Pending Confirmation", "ok"]] },
  field_inspector: { kpis: [["Today", "4", "Assigned sites"], ["Waiting to upload", "2", "Queued Offline", "wait"], ["Conflicts", "1", "Needs a decision", "act"], ["Last sync", "08:12", "Today", "ok"]],
    queueTitle: "Today's inspections", queue: [["Block C, Kirkos", "Scheduled 09:00", "Queued Offline", "wait"], ["Block A, Bole", "Scheduled 11:30", "Synced Successfully", "ok"], ["Block F, Arada", "Scheduled 14:00", "Conflict Error", "act"]] },
  admin: { kpis: [["Active users", "64", "All roles"], ["Failed jobs", "1", "Needs a look", "act"], ["Last backup", "02:00", "Today", "ok"], ["Security alerts", "0", "Last 24 h", "ok"]],
    queueTitle: "Background jobs", queue: [["Rent billing run", "Monthly, 00:00", "Completed", "ok"], ["Report generation", "Quarterly arrears audit", "Retrying", "wait"], ["Notification dispatch", "SMS gateway", "Failed", "act"]] },
};

export const RoleHome: React.FC<{ role: string; onOpen: (d: string) => void }> = ({ role, onOpen }) => {
  const h = HOME[role];
  const [at, setAt] = useState(() => new Date().toTimeString().slice(0, 5));
  if (!h) return null;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-slate)]">
        <Chip tone="wait">Sample figures</Chip>
        <span>as of {at}</span>
        <button type="button" onClick={() => setAt(new Date().toTimeString().slice(0, 5))} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-[var(--color-line)] font-semibold text-[var(--color-ink)]">
          <RefreshCw className="w-4 h-4" aria-hidden="true" />Refresh
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {h.kpis.map(([k, v, s, t]) => (
          <div key={k} className="rounded-2xl border-2 border-[var(--color-line)] p-4 space-y-1 bg-[var(--color-surface)]">
            <div className="text-sm font-semibold text-[var(--color-slate)]">{k}</div>
            <div className="text-3xl font-extrabold leading-tight">{v}</div>
            <div className={`inline-block text-sm rounded-full ${t ? `px-2 ${TONE[t]}` : "text-[var(--color-slate)]"}`}>{s}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <section>
          <h2 className="text-xl font-bold mb-3">{h.queueTitle}</h2>
          <ul className="border-t border-[var(--color-line)]">
            {h.queue.map(([t, m, c, tone], i) => (
              <li key={i} className="py-3 border-b border-[var(--color-line)] flex items-start justify-between gap-3">
                <div className="min-w-0"><div className="font-bold text-lg leading-snug">{t}</div><div className="text-base text-[var(--color-slate)]">{m}</div></div>
                <Chip tone={tone}>{c}</Chip>
              </li>
            ))}
          </ul>
          {h.note && <p className="mt-3 text-sm text-[var(--color-slate)] flex gap-2"><Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />{h.note}</p>}
        </section>
        {h.bars && (
          <section>
            <h2 className="text-xl font-bold mb-3">{h.barsTitle}</h2>
            <ul className="space-y-3">
              {h.bars.map(([k, v]) => (
                <li key={k}><div className="flex justify-between text-base font-semibold mb-1"><span>{k}</span><span>{v}%</span></div>
                  <div className="h-3 rounded-full bg-[var(--color-subtle)]"><div className="h-3 rounded-full bg-[var(--color-accent)]" style={{ width: `${v}%` }} /></div></li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <section>
        <h2 className="text-xl font-bold mb-1">Your work</h2>
        <div className="border-t border-[var(--color-line)] md:grid md:grid-cols-2 md:gap-x-10">
          {(ROLE_DESKS[role] ?? []).map((d) => (
            <button key={d} type="button" onClick={() => onOpen(d)} className="w-full min-h-[76px] flex items-center gap-4 px-1 py-3 text-left border-b border-[var(--color-line)] hover:bg-[var(--color-subtle)]">
              <Arch icon={DESKS[d].icon} />
              <span className="flex-1 min-w-0"><span className="block text-xl font-bold leading-snug">{DESKS[d].short}</span><span className="block text-base text-[var(--color-slate)] leading-snug">{DESKS[d].uc.split(" · ")[0]}</span></span>
              <ArrowRight className="w-5 h-5 text-[var(--color-slate)] shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export const DeskPage: React.FC<{ id: string }> = ({ id }) => {
  const d = DESKS[id];
  if (!d) return null;
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold">{d.short}</h1>
        <p className="text-lg text-[var(--color-slate)]">{d.purpose}</p>
        <div className="flex flex-wrap gap-2"><Chip>{d.scr}</Chip><Chip>{d.uc}</Chip><Chip tone={d.phase.startsWith("Phase 2") ? "wait" : "ok"}>{d.phase}</Chip></div>
      </div>
      <section><h2 className="text-xl font-bold mb-2">What you do here</h2>
        <ul className="space-y-2">{d.actions.map((a) => <li key={a} className="flex gap-3 text-lg"><Check className="w-5 h-5 mt-1 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />{a}</li>)}</ul></section>
      {d.states && <section><h2 className="text-xl font-bold mb-2">Statuses you will see</h2>
        <div className="flex flex-wrap gap-2">{d.states.map((s) => <Chip key={s}>{s}</Chip>)}</div></section>}
      <section><h2 className="text-xl font-bold mb-2">Rules this screen follows</h2>
        <ul className="space-y-2">{d.rules.map((r) => <li key={r} className="flex gap-3 text-base text-[var(--color-slate)]"><Info className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />{r}</li>)}</ul></section>
      <p className="rounded-2xl bg-[var(--color-subtle)] p-4 text-base">This screen is specified in the SRS and is not built yet. The page above is its brief.</p>
    </div>
  );
};
