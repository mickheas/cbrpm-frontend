import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<"general" | "housing_allocation" | "smart_parking" | "diaspora_fcy" | "maintenance_complaint">("general");
  const [message, setMessage] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const ref = `FHC-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(ref);
    showToast(`Inquiry dispatched to Public Relations. Reference: ${ref}`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--color-line)] pb-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C] dark:text-[#00A38C] uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Public communication desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
          Contact the Federal Housing Corporation
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-slate)] max-w-3xl">
          Get in touch with our central administrative desk, sub-city housing officers, or emergency facility maintenance teams.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Contact Info Sidebar */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-[var(--color-surface)] p-5 rounded-md border border-[var(--color-line)] shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[var(--color-line)] pb-3">
              <div className="w-9 h-9 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-sm text-[var(--color-ink)]">Central head office</h2>
                <p className="text-xs text-[var(--color-slate)]">Mexico Square, Addis Ababa</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[var(--color-slate)]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--color-ink)] block">Physical address:</strong>
                  <span>Mexico Square / Churchill Ave, P.O. Box 299, Addis Ababa, Ethiopia</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--color-ink)] block">Official public email:</strong>
                  <a href="mailto:info@fhc.gov.et" className="text-[#00594C] dark:text-[#00A38C] underline font-medium">
                    info@fhc.gov.et
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--color-ink)] block">Hotline & switchboard:</strong>
                  <span>Toll-free hotline: <strong className="font-mono-num text-[var(--color-ink)] font-bold">8333</strong></span>
                  <div>Switchboard: +251 115 51 04 00</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--color-ink)] block">Working hours:</strong>
                  <span>Mon – Fri: 8:30 AM – 5:30 PM</span>
                  <div>Saturday: 8:30 AM – 12:30 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-xs text-[var(--color-slate)] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#00594C] dark:text-[#00A38C] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold text-[var(--color-ink)] mb-0.5">Ethical standards compliance</strong>
              All citizen feedback, complaints, and service delays are formally logged in compliance with federal public service regulations.
            </div>
          </div>
        </div>

        {/* Feedback / Inquiry Form */}
        <div className="lg:col-span-2 bg-[var(--color-surface)] p-5 sm:p-6 rounded-md border border-[var(--color-line)] shadow-xs space-y-5">
          <div className="border-b border-[var(--color-line)] pb-3">
            <h2 className="text-base font-bold text-[var(--color-ink)]">
              Public inquiry & feedback submission
            </h2>
            <p className="text-xs text-[var(--color-slate)]">
              Submit your formal questions, tenancy inquiries, or diaspora requests directly to the relevant directorate.
            </p>
          </div>

          {submittedRef ? (
            <div className="p-6 rounded-md bg-[var(--color-success-dim)] border border-[var(--color-success)] text-center space-y-2 text-xs">
              <CheckCircle2 className="w-8 h-8 text-[#1B7A4A] dark:text-[#22C55E] mx-auto" />
              <h3 className="text-sm font-bold text-[var(--color-ink)]">Inquiry successfully registered</h3>
              <p className="text-xs text-[var(--color-slate)] max-w-md mx-auto">
                Tracking reference number: <strong className="font-mono-num text-[var(--color-ink)]">{submittedRef}</strong>. An official response will be delivered to <strong>{email}</strong> within 2 business days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRef(null);
                  setMessage("");
                }}
                className="mt-2 px-3.5 py-1.5 rounded-md bg-[#00594C] text-white text-xs font-semibold"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-slate)] font-medium mb-1">
                    Full legal name: *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abebech Gobena"
                    className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[var(--color-slate)] font-medium mb-1">
                    Email address: *
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-slate)] font-medium mb-1">
                    Phone number:
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 911 000000"
                    className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[var(--color-slate)] font-medium mb-1">
                    Inquiry directorate:
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
                  >
                    <option value="general">General public information</option>
                    <option value="housing_allocation">Civil servant housing allocation</option>
                    <option value="smart_parking">Smart resident parking pass</option>
                    <option value="diaspora_fcy">Diaspora & foreign currency desk</option>
                    <option value="maintenance_complaint">Facility maintenance / emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--color-slate)] font-medium mb-1">
                  Inquiry description: *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, housing ID (if existing tenant), or required information in detail..."
                  className="w-full px-3 py-2 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#00594C] hover:bg-[#00483D] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
