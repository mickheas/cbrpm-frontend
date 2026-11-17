import { useRef, useState } from "react";

export type Lang = "am" | "en";
export type Tone = "ok" | "wait" | "act" | "idle";

export const AM: Record<string, string> = {
  Paid: "ተከፍሏል", "Partially Paid": "በከፊል ተከፍሏል", Unpaid: "አልተከፈለም", Overdue: "ጊዜው አልፏል", Disputed: "አወዛጋቢ", Cancelled: "ተሰርዟል",
  "Pending Verification": "እየተረጋገጠ ነው", "Verified - Source Matched": "ተረጋግጧል", "Amount Mismatch": "መጠኑ አልተመጣጠነም", "Token Duplicate": "ቁጥሩ ቀደም ብሎ ገብቷል", "Failed Provider Check": "ማረጋገጥ አልተሳካም",
  Reported: "ተልኳል", Registered: "ተመዝግቧል", Inspected: "ተገምግሟል", Approved: "ጸድቋል", Assigned: "ለባለሙያ ተሰጥቷል", "Repair Completed": "ጥገና ተጠናቋል", Verified: "ተረጋግጧል", Closed: "ተዘግቷል", "Requires Review": "ግምገማ ያስፈልጋል",
  Plumbing: "የውሃ ቧንቧ", Electrical: "ኤሌክትሪክ", Structural: "የህንፃ መዋቅር", Roofing: "ጣሪያ", Sanitation: "ንጽህና", Other: "ሌላ",
  "Billing Dispute": "የክፍያ ክርክር", "Maintenance Delay": "የጥገና መዘግየት", "Lease Issue": "የውል ጉዳይ", "Staff Conduct": "የሠራተኛ ባህሪ",
  Submitted: "ተልኳል", "In Progress": "በሂደት ላይ", "Resolved Pending Confirmation": "የእርስዎን ማረጋገጫ ይጠብቃል", "Closed - Low Satisfaction": "ተዘግቷል", Active: "ንቁ",
};
export const tr = (lang: Lang, s: string) => (lang === "am" && AM[s]) || s;

const OK = ["Paid", "Verified - Source Matched", "Verified", "Closed", "Closed - Low Satisfaction", "Active"];
const ACT = ["Overdue", "Disputed", "Amount Mismatch", "Token Duplicate", "Failed Provider Check", "Requires Review"];
const WAIT = ["Pending Verification", "Partially Paid", "Resolved Pending Confirmation", "Repair Completed"];
export const toneOf = (s: string): Tone => (OK.includes(s) ? "ok" : ACT.includes(s) ? "act" : WAIT.includes(s) ? "wait" : "idle");

export const MNT_STEPS = ["Reported", "Registered", "Inspected", "Approved", "Assigned", "Repair Completed", "Verified", "Closed"];
export const MNT_CATS = ["Plumbing", "Electrical", "Structural", "Roofing", "Sanitation", "Other"];
export const CMP_CATS = ["Billing Dispute", "Maintenance Delay", "Lease Issue", "Staff Conduct", "Other"];

export interface Invoice { id: string; period: string; due: string; rent: number; utility: number; paid: number; status: string; verification?: string; token?: string }
export interface Ticket { id: string; category: string; description: string; state: string; severity: string; urgency: string; created: string }
export interface Complaint { id: string; category: string; description: string; state: string; slaHours: number; level: number; created: string; rating?: number }
export interface Notice { id: string; text: [string, string]; when: string; read: boolean; locked?: boolean }

export const total = (i: Invoice) => i.rent + i.utility;
export const owed = (i: Invoice) => total(i) - i.paid;
export const effStatus = (i: Invoice) => (i.status === "Unpaid" && i.due < new Date().toISOString().slice(0, 10) ? "Overdue" : i.status);
export const newKey = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()));
export const money = (n: number, lang: Lang) => `${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${lang === "am" ? "ብር" : "ETB"}`;
export const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);

export const UI = {
  field: "w-full h-14 px-4 rounded-xl border-2 border-[var(--color-line)] bg-[var(--color-surface)] text-lg focus:outline-none focus:border-[var(--color-accent)]",
  label: "block text-base font-semibold mb-1.5",
  btn: "w-full h-14 rounded-2xl bg-[var(--color-accent)] text-white text-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40 disabled:opacity-50",
  btn2: "w-full h-14 rounded-2xl border-2 border-[var(--color-line)] text-lg font-semibold flex items-center justify-center gap-2 outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40",
  card: "rounded-2xl border-2 border-[var(--color-line)] p-4 space-y-2 bg-[var(--color-surface)]",
};

/** Sample data stands in for the API until the backend is connected. */
export function useTenantState(rent: number) {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "INV-202610-000087", period: "2026-10", due: "2026-10-10", rent, utility: 250, paid: rent + 250, status: "Paid", verification: "Verified - Source Matched", token: "TXN7734120045" },
    { id: "INV-202611-000114", period: "2026-11", due: "2026-11-10", rent, utility: 250, paid: 0, status: "Unpaid" },
  ]);
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "MNT-2026-000308", category: "Plumbing", description: "Kitchen tap leaks", state: "Assigned", severity: "Major Defect", urgency: "High", created: "2026-11-09" },
    { id: "MNT-2026-000291", category: "Electrical", description: "Corridor light not working", state: "Repair Completed", severity: "Minor Maintenance", urgency: "Standard", created: "2026-11-02" },
  ]);
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: "CMP-2026-000419", category: "Billing Dispute", description: "Utility charge looks too high", state: "In Progress", slaHours: 48, level: 0, created: "2026-11-14" },
    { id: "CMP-2026-000377", category: "Maintenance Delay", description: "Waited two weeks for a door repair", state: "Resolved Pending Confirmation", slaHours: 48, level: 1, created: "2026-11-01" },
  ]);
  const [notices, setNotices] = useState<Notice[]>([
    { id: "ALT-20261101-0000012", text: ["የህዳር ኪራይ ደረሰኝ ተሰጥቷል።", "Your November rent invoice is ready."], when: "2026-11-01", read: false },
    { id: "ALT-20261111-0000020", text: ["የህዳር ኪራይ ጊዜው አልፏል። ደረሰኝ ይላኩ።", "November rent is overdue. Please send your receipt."], when: "2026-11-11", read: false },
    { id: "ALT-20261016-0000008", text: ["የጥቅምት ክፍያዎ ተረጋግጧል። ደረሰኝዎን ያውርዱ።", "Your October payment is confirmed. Download your receipt."], when: "2026-10-16", read: true },
  ]);
  const [prefs, setPrefs] = useState({ sms: true, email: false, push: true });
  const keys = useRef(new Set<string>());
  const seq = useRef(430);

  const submitReceipt = (id: string, token: string, key: string) => {
    const dup = invoices.find((i) => i.token === token) ?? null;
    if (dup || keys.current.has(key)) return { inv: dup ?? invoices.find((i) => i.id === id)!, dup: true };
    keys.current.add(key);
    const inv = { ...invoices.find((i) => i.id === id)!, verification: "Pending Verification", token };
    setInvoices((p) => p.map((i) => (i.id === id ? inv : i)));
    return { inv, dup: false };
  };
  const addTicket = (category: string, description: string, urgent: boolean) => {
    const t: Ticket = { id: `MNT-2026-${String(++seq.current).padStart(6, "0")}`, category, description, state: "Reported", severity: urgent ? "Critical Emergency" : "Minor Maintenance", urgency: urgent ? "Immediate" : "Standard", created: new Date().toISOString().slice(0, 10) };
    setTickets((p) => [t, ...p]);
  };
  const confirmRepair = (id: string, fixed: boolean) => setTickets((p) => p.map((t) => (t.id === id ? { ...t, state: fixed ? "Closed" : "Assigned" } : t)));
  const addComplaint = (category: string, description: string, urgent: boolean) => {
    const c: Complaint = { id: `CMP-2026-${String(++seq.current).padStart(6, "0")}`, category, description, state: "Submitted", slaHours: urgent ? 24 : 48, level: 0, created: new Date().toISOString().slice(0, 10) };
    setComplaints((p) => [c, ...p]);
    return c.id;
  };
  const rate = (id: string, score: number) => setComplaints((p) => p.map((c) => (c.id === id ? { ...c, rating: score, state: score <= 2 ? "Closed - Low Satisfaction" : "Closed" } : c)));
  const markAllRead = () => setNotices((p) => p.map((n) => ({ ...n, read: true })));

  return { invoices, tickets, complaints, notices, prefs, setPrefs, submitReceipt, addTicket, confirmRepair, addComplaint, rate, markAllRead };
}
export type TenantState = ReturnType<typeof useTenantState>;
