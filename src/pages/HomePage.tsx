import React from "react";
import { LangToggle } from "../components/LangToggle";
import { useApp } from "../context/AppContext";
import type { RouteName } from "../context/AppContext";
import type { LucideIcon } from "lucide-react";
import {
  DoorOpen,
  ReceiptText,
  Wrench,
  FileText,
  ChevronRight,
  Landmark,
  Camera,
  BadgeCheck,
  Phone,
  MapPin,
} from "lucide-react";

// TODO before launch: fill in the real office details. Empty values are hidden.
const HELP = { phone: "", office: "" };

const COPY = {
  am: {
    title: "ምን ማድረግ ይፈልጋሉ?",
    intro: "የአዲስ አበባ ከተማ አስተዳደር ህንፃዎች ኪራይ፣ ጥገናና የክፍያ ደረሰኝ አገልግሎት።",
    staff: "የከተማ አስተዳደር ሠራተኛ ነዎት?",
    staffCta: "ይግቡ",
    flowTitle: "ክፍያዎ እንዴት ይረጋገጣል?",
    helpTitle: "እገዛ ይፈልጋሉ?",
    helpBody: "ወደ ንብረት ቢሮ መጥተው ይጠይቁ፤ አብረን እናደርገዋለን።",
  },
  en: {
    title: "What do you need to do?",
    intro: "Rent, repairs and payment receipts for Addis Ababa City Administration buildings.",
    staff: "City staff?",
    staffCta: "Sign in",
    flowTitle: "How we confirm your payment",
    helpTitle: "Need help?",
    helpBody: "Visit the property office and we will do it with you.",
  },
};

const TASKS: { icon: LucideIcon; route: RouteName; am: [string, string]; en: [string, string] }[] = [
  {
    icon: DoorOpen,
    route: "rent",
    am: ["የሚከራይ ቤት ፈልግ", "ክፍት የሆኑ ቤቶችንና ቦታዎችን ይመልከቱ"],
    en: ["Find a place to rent", "See homes and spaces that are open"],
  },
  {
    icon: ReceiptText,
    route: "portal-login",
    am: ["የኪራይ ደረሰኝ ላክ", "ባንክ ከከፈሉ በኋላ ደረሰኙን ይላኩ"],
    en: ["Send my rent receipt", "After paying at the bank, send us the receipt"],
  },
  {
    icon: Wrench,
    route: "portal-login",
    am: ["ብልሽት አሳውቅ", "የውሃ፣ የመብራት ወይም የህንፃ ችግር"],
    en: ["Report a problem", "Water, power or damage in your building"],
  },
  {
    icon: FileText,
    route: "portal-login",
    am: ["ውሌንና ሂሳቤን እይ", "የኪራይ ውል፣ ክፍያና ቀሪ ሂሳብ"],
    en: ["See my lease and balance", "Your contract, payments and what is due"],
  },
];

const STEPS: { icon: LucideIcon; am: [string, string]; en: [string, string] }[] = [
  {
    icon: Landmark,
    am: ["በባንክ ይክፈሉ", "እንደተለመደው የኪራይ ክፍያዎን ይፈጽሙ"],
    en: ["Pay at the bank", "Pay your rent as you normally do"],
  },
  {
    icon: Camera,
    am: ["ደረሰኙን ይላኩ", "ፎቶ፣ ስክሪንሾት ወይም የደረሰኝ ቁጥር ይላኩ"],
    en: ["Send the receipt", "Send a photo, screenshot or reference number"],
  },
  {
    icon: BadgeCheck,
    am: ["ማረጋገጫ ያግኙ", "ደረሰኙ ሲረጋገጥ ሂሳብዎ ይዘምናል"],
    en: ["Get confirmation", "We check it, then update your balance"],
  },
];

export const HomePage: React.FC = () => {
  const { setRoute, language: lang } = useApp();
  const t = COPY[lang];

  return (
    <div lang={lang} className="text-[var(--color-ink)]">
      {/* Hero: one question, four answers */}
      <section className="border-b border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <LangToggle />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.2] tracking-tight">
              {t.title}
            </h1>
            <p className="text-lg text-[var(--color-slate)] max-w-md leading-relaxed">{t.intro}</p>

            <p className="text-base text-[var(--color-slate)]">
              {t.staff}{" "}
              <button
                type="button"
                onClick={() => setRoute("portal-login")}
                className="font-semibold text-[var(--color-accent)] underline underline-offset-4 decoration-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40 rounded-sm"
              >
                {t.staffCta}
              </button>
            </p>
          </div>

          <ul className="border-t border-[var(--color-line)]">
            {TASKS.map(({ icon: Icon, route, ...text }) => {
              const [label, hint] = text[lang];
              return (
                <li key={text.en[0]}>
                  <button
                    type="button"
                    onClick={() => setRoute(route)}
                    className="group w-full flex items-center gap-4 sm:gap-5 px-3 sm:px-4 py-5 text-left border-b border-[var(--color-line)] transition-colors hover:bg-[var(--color-accent)] focus-visible:bg-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]/40"
                  >
                    <span className="w-14 h-16 shrink-0 flex items-center justify-center rounded-t-full rounded-b-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] transition-colors group-hover:bg-[#F2B705] group-hover:text-[#0D1714] group-focus-visible:bg-[#F2B705] group-focus-visible:text-[#0D1714]">
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xl sm:text-2xl font-bold leading-snug group-hover:text-white group-focus-visible:text-white">
                        {label}
                      </span>
                      <span className="block text-base text-[var(--color-slate)] leading-snug mt-0.5 group-hover:text-white/85 group-focus-visible:text-white/85">
                        {hint}
                      </span>
                    </span>
                    <ChevronRight
                      className="w-6 h-6 shrink-0 text-[var(--color-slate)] group-hover:text-white group-focus-visible:text-white"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* The one process that defines this system: receipt confirmation */}
      <section className="bg-[var(--color-subtle)] border-b border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.flowTitle}</h2>
          <ol className="grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, ...text }, i) => {
              const [label, hint] = text[lang];
              return (
                <li key={text.en[0]} className="relative flex sm:flex-col gap-4">
                  <span className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-[var(--color-accent)] text-white relative z-10">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:block absolute top-7 left-[4.5rem] -right-8 h-0.5 bg-[var(--color-line)]"
                    />
                  )}
                  <div>
                    <div className="text-xl font-bold leading-snug">{label}</div>
                    <p className="text-base text-[var(--color-slate)] leading-snug mt-1 max-w-[18rem]">{hint}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Human fallback for anyone who can't or won't use the screen */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">{t.helpTitle}</h2>
          <p className="text-lg text-[var(--color-slate)] mt-1">{t.helpBody}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {HELP.phone && (
            <a
              href={`tel:${HELP.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 h-12 px-5 rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] text-lg font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/40"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {HELP.phone}
            </a>
          )}
          {HELP.office && (
            <span className="inline-flex items-center gap-2 h-12 text-lg font-semibold">
              <MapPin className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
              {HELP.office}
            </span>
          )}
        </div>
      </section>
    </div>
  );
};
