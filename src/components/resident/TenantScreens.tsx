import React, { useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, Clock, AlertCircle, X, Plus, Camera, Hash, Download, Star } from "lucide-react";
import { MeScreen } from "../MeScreen";
import { UI, tr, toneOf, money, owed, total, effStatus, newKey, daysUntil, MNT_STEPS, MNT_CATS, CMP_CATS } from "./tenantModel";
import type { TenantState, Invoice, Lang } from "./tenantModel";

const TONE = {
  ok: "bg-[var(--color-success-dim)] text-[var(--color-success)]",
  wait: "bg-[var(--color-warning-dim)] text-[var(--color-warning)]",
  act: "bg-[var(--color-danger-dim)] text-[var(--color-danger)]",
  idle: "bg-[var(--color-subtle)] text-[var(--color-slate)]",
};
export const Chip: React.FC<{ s: string; lang: Lang }> = ({ s, lang }) => {
  const t = toneOf(s);
  const I = t === "ok" ? CheckCircle2 : t === "act" ? AlertCircle : Clock;
  return <span className={`inline-flex items-center gap-1.5 px-3 min-h-8 py-1 rounded-full text-sm font-semibold ${TONE[t]}`}><I className="w-4 h-4 shrink-0" aria-hidden="true" />{tr(lang, s)}</span>;
};
const useL = () => { const { language: lang, showToast } = useApp(); return { lang, showToast, L: (am: string, en: string) => (lang === "am" ? am : en) }; };

const Sheet: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center" role="dialog" aria-modal="true" aria-label={title}>
    <button type="button" aria-label="Close" className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="relative w-full md:max-w-lg bg-[var(--color-surface)] rounded-t-3xl md:rounded-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] space-y-4 max-h-[92dvh] overflow-y-auto">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">{title}</h2>
        <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-line)]"><X className="w-6 h-6" /></button></div>
      {children}
    </div>
  </div>
);
const Pick: React.FC<{ items: string[]; value: string; onChange: (v: string) => void; lang: Lang }> = ({ items, value, onChange, lang }) => (
  <div className="grid grid-cols-2 gap-2">
    {items.map((c) => <button key={c} type="button" aria-pressed={value === c} onClick={() => onChange(c)}
      className={`min-h-[56px] px-2 rounded-2xl border-2 text-base font-semibold ${value === c ? "border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-[var(--color-accent)]" : "border-[var(--color-line)]"}`}>{tr(lang, c)}</button>)}
  </div>
);

/* ---------- Rent > Pay (SCR-05-03) ---------- */
export const PayScreen: React.FC<{ s: TenantState }> = ({ s }) => {
  const { lang, L, showToast } = useL();
  const open = s.invoices.filter((i) => owed(i) > 0);
  const [sel, setSel] = useState(open[0]?.id ?? "");
  const [mode, setMode] = useState<"shot" | "token">("shot");
  const [token, setToken] = useState(""); const [file, setFile] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ inv: Invoice; dup: boolean } | null>(null);
  const idem = useRef(newKey());
  const inv = open.find((i) => i.id === sel) ?? open[0];
  const sent = inv?.verification === "Pending Verification";

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inv || busy || sent) return;
    const ref = mode === "token" ? token.trim().toUpperCase() : `IMG-${file}`;
    if (mode === "token" ? !/^[A-Z0-9]{6,}$/.test(ref) : !file) { showToast(L("የደረሰኝ ቁጥር ወይም ፎቶ ያስገቡ።", "Please add the receipt number or a photo."), "error"); return; }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    setRes(s.submitReceipt(inv.id, ref, idem.current));
    idem.current = newKey(); setBusy(false); setToken(""); setFile("");
  };

  if (open.length === 0) return <div className={UI.card}><div className="text-2xl font-bold">{L("ምንም የሚከፈል የለም", "Nothing to pay")}</div><p className="text-lg text-[var(--color-slate)]">{L("ሁሉም ደረሰኞች ተከፍለዋል።", "All your invoices are paid.")}</p></div>;
  return (
    <form onSubmit={send} className="space-y-5 max-w-xl">
      <p className="text-lg text-[var(--color-slate)]">{L("መጀመሪያ በባንክ ወይም በቴሌብር ይክፈሉ፤ ከዚያ ደረሰኙን እዚህ ይላኩ።", "Pay by bank or mobile money first, then send the receipt here.")}</p>
      <div className="space-y-2">
        {open.map((i) => (
          <button key={i.id} type="button" aria-pressed={inv?.id === i.id} onClick={() => { setSel(i.id); setRes(null); }}
            className={`w-full text-left rounded-2xl border-2 p-4 space-y-1 ${inv?.id === i.id ? "border-[var(--color-accent)] bg-[var(--color-accent-dim)]" : "border-[var(--color-line)]"}`}>
            <div className="flex items-start justify-between gap-3"><span className="text-lg font-bold">{i.period}</span><Chip s={i.verification ?? effStatus(i)} lang={lang} /></div>
            <div className="text-2xl font-extrabold">{money(owed(i), lang)}</div>
            <div className="text-sm text-[var(--color-slate)]">{i.id} · {L("የመጨረሻ ቀን", "Due")} {i.due}</div>
          </button>
        ))}
      </div>
      {inv && !sent && (
        <>
          <p className="text-base rounded-xl bg-[var(--color-subtle)] p-3">{L(`የከፈሉት መጠን በትክክል ${money(owed(inv), lang)} መሆን አለበት።`, `The amount you paid must be exactly ${money(owed(inv), lang)}.`)}</p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={mode === "shot"} onClick={() => setMode("shot")} className={`${UI.btn2} ${mode === "shot" ? "!border-[var(--color-accent)] text-[var(--color-accent)]" : ""}`}><Camera className="w-5 h-5" aria-hidden="true" />{L("ፎቶ", "Photo")}</button>
            <button type="button" aria-pressed={mode === "token"} onClick={() => setMode("token")} className={`${UI.btn2} ${mode === "token" ? "!border-[var(--color-accent)] text-[var(--color-accent)]" : ""}`}><Hash className="w-5 h-5" aria-hidden="true" />{L("ቁጥር", "Number")}</button>
          </div>
          {mode === "shot" ? (
            <label className={`${UI.btn2} cursor-pointer`}><Camera className="w-6 h-6" aria-hidden="true" /><span className="truncate">{file || L("የደረሰኝ ፎቶ ይምረጡ", "Choose a receipt photo")}</span>
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} /></label>
          ) : (
            <div><label htmlFor="tok" className={UI.label}>{L("የክፍያ ማጣቀሻ ቁጥር", "Payment reference number")}</label>
              <input id="tok" value={token} onChange={(e) => setToken(e.target.value)} placeholder="TXN9847281902" autoComplete="off" className={UI.field} /></div>
          )}
          <button type="submit" disabled={busy} className={UI.btn}>{busy ? L("እየተላከ ነው…", "Sending…") : L("ላክ", "Send")}</button>
        </>
      )}
      {(sent || res) && inv && (
        <div className="rounded-2xl p-4 space-y-2 bg-[var(--color-warning-dim)]" role="status">
          <Chip s="Pending Verification" lang={lang} />
          <p className="text-lg font-semibold">{res?.dup ? L("ይህ ቁጥር ቀደም ብሎ ገብቷል። የመጀመሪያውን ውጤት እያሳየን ነው።", "We already have this reference. Showing its first result.") : L("ደረሰኝዎን ተቀብለናል። ከባንኩ ጋር እያረጋገጥን ነው።", "We have your receipt and are checking it with the bank.")}</p>
          <p className="text-base">{L("እስኪረጋገጥ ድረስ እንደተከፈለ አይቆጠርም።", "It does not count as paid until it is confirmed.")}</p>
        </div>
      )}
    </form>
  );
};

/* ---------- Rent > History (SCR-05-04) ---------- */
export const HistoryScreen: React.FC<{ s: TenantState }> = ({ s }) => {
  const { lang, L, showToast } = useL();
  const verified = s.invoices.filter((i) => i.verification === "Verified - Source Matched").reduce((a, i) => a + i.paid, 0);
  return (
    <div className="space-y-4">
      <div className={UI.card}><div className="text-base text-[var(--color-slate)]">{L("የተረጋገጠ ክፍያ (በዚህ ዓመት)", "Confirmed payments this year")}</div><div className="text-3xl font-extrabold">{money(verified, lang)}</div></div>
      <ul className="grid md:grid-cols-2 gap-3">
        {[...s.invoices].sort((a, b) => b.due.localeCompare(a.due)).map((i) => (
          <li key={i.id} className={UI.card}>
            <div className="flex items-start justify-between gap-3"><span className="text-lg font-bold">{i.period}</span><Chip s={effStatus(i)} lang={lang} /></div>
            {i.verification && <div><Chip s={i.verification} lang={lang} /></div>}
            <dl className="text-base grid grid-cols-2 gap-y-1">
              <dt className="text-[var(--color-slate)]">{L("ጠቅላላ", "Total")}</dt><dd className="text-right font-semibold">{money(total(i), lang)}</dd>
              <dt className="text-[var(--color-slate)]">{L("የተከፈለ", "Paid")}</dt><dd className="text-right font-semibold">{money(i.paid, lang)}</dd>
              <dt className="text-[var(--color-slate)]">{L("ቀሪ", "Balance")}</dt><dd className="text-right font-semibold">{money(owed(i), lang)}</dd>
            </dl>
            <div className="text-sm text-[var(--color-slate)]">{i.id}</div>
            {i.status === "Paid" && i.verification === "Verified - Source Matched" && (
              <button type="button" onClick={() => showToast(L("ደረሰኙ ወርዷል።", "Receipt downloaded."), "success")} className={UI.btn2}><Download className="w-5 h-5" aria-hidden="true" />{L("ደረሰኝ አውርድ", "Download receipt")}</button>)}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------- Help > Repairs (SCR-09-01) ---------- */
export const RepairsScreen: React.FC<{ s: TenantState }> = ({ s }) => {
  const { lang, L, showToast } = useL();
  const [sheet, setSheet] = useState(false);
  const [cat, setCat] = useState(MNT_CATS[0]); const [desc, setDesc] = useState(""); const [urgent, setUrgent] = useState(false);
  const go = (e: React.FormEvent) => {
    e.preventDefault(); s.addTicket(cat, desc.trim() || cat, urgent); setSheet(false); setDesc(""); setUrgent(false);
    showToast(urgent ? L("አስቸኳይ ጥያቄ ተልኳል። ባለሙያው በአጭር መልዕክት እየተነገረ ነው።", "Urgent request sent. The on-call engineer is being alerted by SMS.") : L("ጥያቄዎ ተልኳል።", "Your request was sent."), "success");
  };
  return (
    <div className="space-y-4">
      <button type="button" onClick={() => setSheet(true)} className={`${UI.btn} md:max-w-sm`}><Plus className="w-6 h-6" aria-hidden="true" />{L("ብልሽት አሳውቅ", "Report a problem")}</button>
      <ul className="grid md:grid-cols-2 gap-3">
        {s.tickets.map((t) => {
          const step = MNT_STEPS.indexOf(t.state);
          return (
            <li key={t.id} className={UI.card}>
              <div className="flex items-start justify-between gap-3"><span className="text-lg font-bold">{tr(lang, t.category)}</span><Chip s={t.state} lang={lang} /></div>
              <p className="text-base text-[var(--color-slate)]">{t.description}</p>
              <div className="flex gap-1" aria-hidden="true">{MNT_STEPS.map((m, k) => <span key={m} className={`h-2 flex-1 rounded-full ${k <= step ? "bg-[var(--color-accent)]" : "bg-[var(--color-line)]"}`} />)}</div>
              <div className="text-sm text-[var(--color-slate)]">{t.id} · {t.created}</div>
              {t.state === "Repair Completed" && (
                <div className="space-y-2 pt-1"><p className="text-base font-semibold">{L("ተጠግኗል?", "Is it fixed?")}</p>
                  <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => s.confirmRepair(t.id, true)} className={UI.btn}>{L("አዎ", "Yes")}</button><button type="button" onClick={() => s.confirmRepair(t.id, false)} className={UI.btn2}>{L("አልተጠገነም", "Not fixed")}</button></div></div>)}
            </li>
          );
        })}
      </ul>
      {sheet && (
        <Sheet title={L("ምን ተበላሽቷል?", "What is wrong?")} onClose={() => setSheet(false)}>
          <form onSubmit={go} className="space-y-4">
            <Pick items={MNT_CATS} value={cat} onChange={setCat} lang={lang} />
            <div><label htmlFor="d" className={UI.label}>{L("ጥቂት ያብራሩ", "Tell us a little more")}</label><textarea id="d" rows={3} maxLength={500} value={desc} onChange={(e) => setDesc(e.target.value)} className={`${UI.field} h-auto py-3`} /></div>
            <label className="flex items-center gap-3 text-lg font-semibold min-h-[48px]"><input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="w-6 h-6 accent-[var(--color-accent)]" />{L("አደገኛ ነው (አስቸኳይ)", "This is dangerous (urgent)")}</label>
            <button type="submit" className={UI.btn}>{L("ላክ", "Send")}</button>
          </form>
        </Sheet>)}
    </div>
  );
};

/* ---------- Help > Complaints (SCR-11-01, 11-03) ---------- */
export const ComplaintsScreen: React.FC<{ s: TenantState }> = ({ s }) => {
  const { lang, L, showToast } = useL();
  const [sheet, setSheet] = useState(false); const [rateId, setRateId] = useState(""); const [score, setScore] = useState(0);
  const [cat, setCat] = useState(CMP_CATS[0]); const [desc, setDesc] = useState(""); const [urgent, setUrgent] = useState(false);
  const go = (e: React.FormEvent) => {
    e.preventDefault(); if (!desc.trim()) { showToast(L("ቅሬታዎን ይጻፉ።", "Please describe your complaint."), "error"); return; }
    const id = s.addComplaint(cat, desc.trim(), urgent); setSheet(false); setDesc(""); setUrgent(false);
    showToast(L(`ቅሬታዎ ተልኳል። ቁጥር፦ ${id}`, `Complaint sent. Your number: ${id}`), "success");
  };
  return (
    <div className="space-y-4">
      <button type="button" onClick={() => setSheet(true)} className={`${UI.btn} md:max-w-sm`}><Plus className="w-6 h-6" aria-hidden="true" />{L("ቅሬታ አቅርብ", "Make a complaint")}</button>
      <ul className="grid md:grid-cols-2 gap-3">
        {s.complaints.map((c) => (
          <li key={c.id} className={UI.card}>
            <div className="flex items-start justify-between gap-3"><span className="text-lg font-bold">{tr(lang, c.category)}</span><Chip s={c.state} lang={lang} /></div>
            <p className="text-base text-[var(--color-slate)]">{c.description}</p>
            <div className="text-sm text-[var(--color-slate)]">{c.id} · {L(`ግብ፦ ${c.slaHours} ሰዓት`, `Target ${c.slaHours} h`)}{c.level > 0 && ` · ${L("ወደ ከፍተኛ አመራር ተላልፏል", "Passed to a senior manager")}`}</div>
            {c.state === "Resolved Pending Confirmation" && <button type="button" onClick={() => { setRateId(c.id); setScore(0); }} className={UI.btn}>{L("አረጋግጥና ደረጃ ስጥ", "Confirm and rate")}</button>}
            {c.rating && <div className="flex gap-1" aria-label={`${c.rating}/5`}>{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`w-5 h-5 ${n <= c.rating! ? "fill-[#F2B705] text-[#F2B705]" : "text-[var(--color-line)]"}`} />)}</div>}
          </li>
        ))}
      </ul>
      {sheet && (
        <Sheet title={L("ቅሬታ አቅርብ", "Make a complaint")} onClose={() => setSheet(false)}>
          <form onSubmit={go} className="space-y-4">
            <Pick items={CMP_CATS} value={cat} onChange={setCat} lang={lang} />
            <div><label htmlFor="cd" className={UI.label}>{L("ቅሬታዎ", "Your complaint")}</label><textarea id="cd" rows={4} maxLength={2000} value={desc} onChange={(e) => setDesc(e.target.value)} className={`${UI.field} h-auto py-3`} /><div className="text-sm text-[var(--color-slate)] text-right">{desc.length}/2000</div></div>
            <label className="flex items-center gap-3 text-lg font-semibold min-h-[48px]"><input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="w-6 h-6 accent-[var(--color-accent)]" />{L("የደህንነት ወይም የመሠረተ ልማት ችግር ነው", "This is a safety or utility problem")}</label>
            <button type="submit" className={UI.btn}>{L("ላክ", "Send")}</button>
          </form>
        </Sheet>)}
      {rateId && (
        <Sheet title={L("ችግሩ ተፈትቷል?", "Was it resolved?")} onClose={() => setRateId("")}>
          <div className="flex justify-between" role="radiogroup" aria-label={L("ደረጃ", "Rating")}>
            {[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" role="radio" aria-checked={score === n} aria-label={`${n}`} onClick={() => setScore(n)} className="w-14 h-14 flex items-center justify-center"><Star className={`w-10 h-10 ${n <= score ? "fill-[#F2B705] text-[#F2B705]" : "text-[var(--color-line)]"}`} /></button>)}
          </div>
          <button type="button" disabled={!score} onClick={() => { s.rate(rateId, score); setRateId(""); }} className={UI.btn}>{L("አረጋግጥ", "Confirm")}</button>
        </Sheet>)}
    </div>
  );
};

/* ---------- Lease (SCR-04 own, view) ---------- */
export const LeaseScreen: React.FC = () => {
  const { currentUser: u, language, showToast } = useApp();
  const lang = language; const L = (a: string, e: string) => (lang === "am" ? a : e);
  if (!u) return null;
  const end = "2027-01-31"; const left = daysUntil(end);
  const rows: [string, string][] = [[L("የውል ቁጥር", "Lease no."), u.leaseContractNo], [L("ቤት", "Home"), u.unit], [L("ህንፃ", "Building"), u.residenceName], [L("ክፍለ ከተማ", "Sub-city"), u.subCity], [L("ወርሃዊ ኪራይ", "Monthly rent"), money(u.monthlyRentEtb, lang)], [L("የክፍያ ዑደት", "Payment cycle"), L("ወርሃዊ", "Monthly")], [L("የሚጀምረው", "Starts"), "2025-02-01"], [L("የሚያበቃው", "Ends"), end]];
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3 flex-wrap"><Chip s="Active" lang={lang} /><span className="text-lg font-semibold">{L(`ከ${left} ቀናት በኋላ ያበቃል`, `Ends in ${left} days`)}</span></div>
      <div className="flex gap-2" aria-label={L("የማሳሰቢያ ጊዜዎች", "Reminder points")}>{[90, 60, 30].map((d) => <span key={d} className={`flex-1 text-center rounded-xl py-2 text-sm font-semibold ${left <= d ? "bg-[var(--color-warning-dim)] text-[var(--color-warning)]" : "bg-[var(--color-subtle)] text-[var(--color-slate)]"}`}>{L(`${d} ቀን በፊት`, `${d} days before`)}</span>)}</div>
      <dl className="border-t border-[var(--color-line)] md:grid md:grid-cols-2 md:gap-x-10">
        {rows.map(([k, v]) => <div key={k} className="py-3 border-b border-[var(--color-line)]"><dt className="text-base text-[var(--color-slate)]">{k}</dt><dd className="text-xl font-bold">{v}</dd></div>)}
      </dl>
      <button type="button" onClick={() => showToast(L("ውሉ ወርዷል።", "Lease downloaded."), "success")} className={`${UI.btn} md:max-w-sm`}><Download className="w-6 h-6" aria-hidden="true" />{L("ውሉን አውርድ", "Download lease")}</button>
    </div>
  );
};

/* ---------- Me > Alerts / Settings (SCR-16-01) ---------- */
export const AlertsScreen: React.FC<{ s: TenantState }> = ({ s }) => {
  const { L } = useL(); const { language } = useApp();
  return (
    <div className="space-y-3 max-w-2xl">
      <button type="button" onClick={s.markAllRead} className={`${UI.btn2} md:max-w-xs`}>{L("ሁሉንም እንደተነበበ አድርግ", "Mark all as read")}</button>
      <ul className="border-t border-[var(--color-line)]">{s.notices.map((n) => (
        <li key={n.id} className="py-4 border-b border-[var(--color-line)] flex gap-3">
          <span className={`mt-2 w-3 h-3 rounded-full shrink-0 ${n.read ? "bg-transparent" : "bg-[#F2B705]"}`} aria-label={n.read ? "" : L("አዲስ", "New")} />
          <div><div className="text-lg font-semibold leading-snug">{language === "am" ? n.text[0] : n.text[1]}</div><div className="text-sm text-[var(--color-slate)]">{n.when}</div></div>
        </li>))}</ul>
    </div>
  );
};
export const SettingsScreen: React.FC<{ s: TenantState }> = ({ s }) => {
  const { L } = useL();
  const Row: React.FC<{ label: string; on: boolean; locked?: boolean; set?: (v: boolean) => void }> = ({ label, on, locked, set }) => (
    <label className="flex items-center justify-between gap-4 min-h-[64px] border-b border-[var(--color-line)]"><span className="text-lg font-semibold">{label}</span>
      <input type="checkbox" role="switch" checked={on} disabled={locked} onChange={(e) => set?.(e.target.checked)} className="w-7 h-7 accent-[var(--color-accent)]" /></label>);
  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-bold">{L("መልዕክቶችን የት ልላክ?", "How should we reach you?")}</h2>
      <div className="border-t border-[var(--color-line)]">
        <Row label={L("በመተግበሪያ ውስጥ", "In the app")} on locked />
        <Row label={L("አጭር መልዕክት (SMS)", "SMS")} on={s.prefs.sms} set={(v) => s.setPrefs({ ...s.prefs, sms: v })} />
        <Row label={L("ኢሜይል", "Email")} on={s.prefs.email} set={(v) => s.setPrefs({ ...s.prefs, email: v })} />
        <Row label={L("ፑሽ መልዕክት", "Push")} on={s.prefs.push} set={(v) => s.setPrefs({ ...s.prefs, push: v })} />
      </div>
      <p className="text-base text-[var(--color-slate)]">{L("የደህንነት ማሳሰቢያዎችና የአደጋ ማሳወቂያዎች ሁልጊዜ በ SMS እና በመተግበሪያ ይደርሱዎታል።", "Security alerts and emergency notices always reach you by SMS and in the app.")}</p>
    </div>
  );
};
export const ProfileScreen: React.FC = () => <MeScreen />;
