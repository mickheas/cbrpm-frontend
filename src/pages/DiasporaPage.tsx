import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Plane, 
  ShieldCheck, 
  Coins, 
  Video, 
  FileCheck2, 
  CheckCircle2, 
  Send
} from "lucide-react";

export const DiasporaPage: React.FC = () => {
  const { showToast } = useApp();

  const [diasporaName, setDiasporaName] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("United States");
  const [email, setEmail] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState<"USD" | "EUR" | "GBP">("USD");
  const [interestType, setInterestType] = useState<"purchase_fcy" | "long_term_lease" | "investment">("purchase_fcy");
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diasporaName || !email) return;

    setAppointmentBooked(true);
    showToast("Diaspora consultation request submitted. A representative will contact you.", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header Context */}
      <div className="border-b border-[var(--color-line)] pb-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C] dark:text-[#00A38C] uppercase tracking-wider">
          <Plane className="w-3.5 h-3.5" />
          <span>Foreign currency acquisition desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
          Diaspora housing services
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-slate)] max-w-3xl">
          Purchase premium residential properties or secure long-term leases in foreign currency with full government title guarantee, in compliance with National Bank of Ethiopia directives.
        </p>
      </div>

      {/* 4 Core Pillars of Diaspora Acquisition */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] space-y-2 shadow-xs">
          <div className="w-9 h-9 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--color-ink)]">
            Virtual walkthroughs
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Inspect properties remotely via private video tour with an FHC relationship officer.
          </p>
        </div>

        <div className="p-5 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] space-y-2 shadow-xs">
          <div className="w-9 h-9 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--color-ink)]">
            Digital KYC verification
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Submit Ethiopian Origin ID (Yellow Card) or foreign passport with legally binding e-signatures.
          </p>
        </div>

        <div className="p-5 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] space-y-2 shadow-xs">
          <div className="w-9 h-9 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--color-ink)]">
            NBE escrow protection
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Foreign currency settlements are routed into central bank-monitored escrow accounts.
          </p>
        </div>

        <div className="p-5 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] space-y-2 shadow-xs">
          <div className="w-9 h-9 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--color-ink)]">
            Guaranteed title transfer
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Federal government title deed registration eliminates private developer default risk.
          </p>
        </div>
      </div>

      {/* Consultation Request Form */}
      <div className="bg-[var(--color-surface)] rounded-md p-6 border border-[var(--color-line)] shadow-xs space-y-6">
        <div className="border-b border-[var(--color-line)] pb-3">
          <h2 className="text-base font-bold text-[var(--color-ink)]">
            Schedule a virtual consultation
          </h2>
          <p className="text-xs text-[var(--color-slate)] mt-0.5">
            Submit your information to arrange a 1-on-1 video call and property overview with an officer.
          </p>
        </div>

        {appointmentBooked ? (
          <div className="p-6 rounded-md bg-[var(--color-success-dim)] border border-[var(--color-success)] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#1B7A4A] dark:text-[#22C55E] mx-auto" />
            <h3 className="text-sm font-bold text-[var(--color-ink)]">Consultation request registered</h3>
            <p className="text-xs text-[var(--color-slate)] max-w-md mx-auto">
              Thank you, <strong>{diasporaName}</strong>. A diaspora housing officer will reach out via your provided email and contact number within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[var(--color-slate)] font-medium mb-1">
                Full legal name:
              </label>
              <input
                type="text"
                required
                value={diasporaName}
                onChange={(e) => setDiasporaName(e.target.value)}
                placeholder="e.g. Samuel Mengistu"
                className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[var(--color-slate)] font-medium mb-1">
                Country of residence:
              </label>
              <select
                value={countryOfResidence}
                onChange={(e) => setCountryOfResidence(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany / EU</option>
                <option value="United Arab Emirates">United Arab Emirates / GCC</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other region</option>
              </select>
            </div>

            <div>
              <label className="block text-[var(--color-slate)] font-medium mb-1">
                Email address:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[var(--color-slate)] font-medium mb-1">
                Phone / WhatsApp number (with country code):
              </label>
              <input
                type="tel"
                required
                value={phoneWhatsapp}
                onChange={(e) => setPhoneWhatsapp(e.target.value)}
                placeholder="+1 (202) 555-0193"
                className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[var(--color-slate)] font-medium mb-1">
                Acquisition interest:
              </label>
              <select
                value={interestType}
                onChange={(e) => setInterestType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
              >
                <option value="purchase_fcy">Freehold property purchase (USD / EUR / GBP)</option>
                <option value="long_term_lease">Executive residential rental</option>
                <option value="investment">Diaspora mortgage program</option>
              </select>
            </div>

            <div>
              <label className="block text-[var(--color-slate)] font-medium mb-1">
                Transacting currency:
              </label>
              <select
                value={preferredCurrency}
                onChange={(e) => setPreferredCurrency(e.target.value as any)}
                className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
              >
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-md bg-[#00594C] hover:bg-[#00483D] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Book virtual consultation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
