import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { MaintenanceTicket } from "../dashboard/DashboardMaintenanceTab";
import { Home, ReceiptText, LifeBuoy, FileText, User, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppShell, SubNav, Arch } from "../AppShell";
import type { ShellNav } from "../AppShell";
import { useTenantState, owed, money, effStatus, daysUntil, UI } from "./tenantModel";
import { PayScreen, HistoryScreen, RepairsScreen, ComplaintsScreen, LeaseScreen, AlertsScreen, SettingsScreen, ProfileScreen, Chip } from "./TenantScreens";

interface Props { tickets?: MaintenanceTicket[]; onCreateTicket?: (t: Partial<MaintenanceTicket>) => void }

/** Tabs and the screens inside them (SRS: SCR-05-03/04, 09-01, 11-01/03, 16-01). */
const TABS: Record<string, { screens: { id: string; am: string; en: string }[] }> = {
  rent: { screens: [{ id: "pay", am: "ክፈል", en: "Pay" }, { id: "history", am: "ታሪክ", en: "History" }] },
  help: { screens: [{ id: "repairs", am: "ጥገና", en: "Repairs" }, { id: "complaints", am: "ቅሬታ", en: "Complaints" }] },
  lease: { screens: [] },
  me: { screens: [{ id: "alerts", am: "መልዕክቶች", en: "Alerts" }, { id: "profile", am: "መገለጫ", en: "Profile" }, { id: "settings", am: "ቅንብር", en: "Settings" }] },
};

export const ResidentApp: React.FC<Props> = () => {
  const { currentUser: u, language: lang } = useApp();
  const L = (am: string, en: string) => (lang === "am" ? am : en);
  const s = useTenantState(u?.monthlyRentEtb ?? 0);
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState<Record<string, string>>({ rent: "pay", help: "repairs", me: "alerts" });
  if (!u) return null;

  const unread = s.notices.filter((n) => !n.read).length;
  const nav: ShellNav[] = [
    { id: "home", icon: Home, am: "ዋና", en: "Home" },
    { id: "rent", icon: ReceiptText, am: "ክፍያ", en: "Rent" },
    { id: "help", icon: LifeBuoy, am: "እገዛ", en: "Help" },
    { id: "lease", icon: FileText, am: "ውል", en: "Lease" },
    { id: "me", icon: User, am: "እኔ", en: "Me", badge: unread || undefined },
  ];
  const open = (t: string, sc?: string) => { setTab(t); if (sc) setScreen((p) => ({ ...p, [t]: sc })); };
  const first = u.name.replace(/^(Dr|Eng|Mr|Ms)\.\s*/, "").split(" ")[0];

  const next = [...s.invoices].filter((i) => owed(i) > 0).sort((a, b) => a.due.localeCompare(b.due))[0];
  const st = next?.verification === "Pending Verification" ? "Pending Verification" : next ? effStatus(next) : "Paid";
  const headline = !next ? L("ሁሉም ተከፍሏል", "You are all paid up")
    : st === "Pending Verification" ? L("ደረሰኝዎን እየተመለከትን ነው", "We are checking your receipt")
    : st === "Overdue" ? L("ኪራይዎ ጊዜው አልፏል", "Your rent is overdue") : L("የሚቀጥለው ኪራይ", "Next rent");
  const tone = st === "Overdue" ? "bg-[var(--color-danger-dim)]" : st === "Pending Verification" ? "bg-[var(--color-warning-dim)]" : "bg-[var(--color-success-dim)]";
  const toConfirm = s.tickets.filter((t) => t.state === "Repair Completed").length + s.complaints.filter((c) => c.state === "Resolved Pending Confirmation").length;
  const left = daysUntil("2027-01-31");

  const Row: React.FC<{ icon: LucideIcon; title: string; hint: string; to: [string, string?] }> = ({ icon, title, hint, to }) => (
    <button type="button" onClick={() => open(to[0], to[1])} className="w-full min-h-[76px] flex items-center gap-4 px-1 py-3 text-left border-b border-[var(--color-line)] outline-none hover:bg-[var(--color-subtle)] focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40">
      <Arch icon={icon} /><span className="flex-1 min-w-0"><span className="block text-xl font-bold leading-snug">{title}</span><span className="block text-base text-[var(--color-slate)] leading-snug">{hint}</span></span>
      <ChevronRight className="w-6 h-6 text-[var(--color-slate)] shrink-0" aria-hidden="true" />
    </button>
  );

  const sub = TABS[tab]?.screens ?? [];
  const cur = screen[tab];
  return (
    <AppShell nav={nav} tab={tab} setTab={(t) => open(t)}>
      {tab === "home" && (
        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start space-y-6 md:space-y-0">
          <div className="space-y-6">
            <div><h1 className="text-3xl font-extrabold leading-tight">{L(`ሰላም፣ ${first}`, `Hello, ${first}`)}</h1><p className="text-lg text-[var(--color-slate)] mt-1">{u.unit} · {u.residenceName}</p></div>
            <div className={`rounded-3xl p-5 space-y-2 ${tone}`}>
              <Chip s={st} lang={lang} />
              <h2 className="text-2xl font-bold leading-snug">{headline}</h2>
              {next && <p className="text-lg">{next.period} · {money(owed(next), lang)} · {L("የመጨረሻ ቀን", "due")} {next.due}</p>}
              {st === "Pending Verification" && <p className="text-base">{L("እስኪረጋገጥ ድረስ እንደተከፈለ አይቆጠርም።", "It does not count as paid until confirmed.")}</p>}
            </div>
            {next && st !== "Pending Verification" && <button type="button" onClick={() => open("rent", "pay")} className={UI.btn}><ReceiptText className="w-6 h-6" aria-hidden="true" />{L("ደረሰኝ ላክ", "Send receipt")}</button>}
            <p className="text-sm text-[var(--color-slate)]">{L("ናሙና መረጃ", "Sample data")}</p>
          </div>
          <div className="border-t border-[var(--color-line)]">
            <Row icon={LifeBuoy} to={["help", toConfirm ? (s.tickets.some((t) => t.state === "Repair Completed") ? "repairs" : "complaints") : "repairs"]} title={L("እገዛ", "Help")} hint={toConfirm ? L(`${toConfirm} የእርስዎን ማረጋገጫ ይጠብቃሉ`, `${toConfirm} waiting for you to confirm`) : L("ጥገናና ቅሬታ", "Repairs and complaints")} />
            <Row icon={FileText} to={["lease"]} title={L("የኪራይ ውል", "My lease")} hint={L(`ከ${left} ቀናት በኋላ ያበቃል`, `Ends in ${left} days`)} />
            <Row icon={User} to={["me", "alerts"]} title={L("መልዕክቶች", "Alerts")} hint={unread ? L(`${unread} አዳዲስ`, `${unread} new`) : L("ምንም አዲስ የለም", "Nothing new")} />
          </div>
        </div>
      )}
      {tab !== "home" && (
        <>
          {sub.length > 0 && <SubNav items={sub} value={cur} onChange={(id) => open(tab, id)} />}
          {tab === "rent" && (cur === "pay" ? <PayScreen s={s} /> : <HistoryScreen s={s} />)}
          {tab === "help" && (cur === "repairs" ? <RepairsScreen s={s} /> : <ComplaintsScreen s={s} />)}
          {tab === "lease" && <LeaseScreen />}
          {tab === "me" && (cur === "alerts" ? <AlertsScreen s={s} /> : cur === "profile" ? <ProfileScreen /> : <SettingsScreen s={s} />)}
        </>
      )}
    </AppShell>
  );
};
