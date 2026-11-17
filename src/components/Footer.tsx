import React from "react";
import { useApp } from "../context/AppContext";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export const Footer: React.FC = () => {
  const { setRoute } = useApp();

  return (
    <footer className="bg-white dark:bg-black border-t border-[var(--color-line)] text-[var(--color-slate)] transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Institutional Identification */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00594C] text-white flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[var(--color-ink)]">
                  City Building & Rental Property Management
                </h3>
                <p className="text-xs text-[var(--color-slate)]">
                  Addis Ababa City Administration
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[var(--color-slate)] max-w-sm">
              Established under Addis Ababa City Administration directives to administer public buildings, manage civil service housing allocations, execute tenancy agreements, coordinate depot maintenance, and verify bank rental deposit clearances.
            </p>

            <div className="space-y-1.5 text-xs text-[var(--color-slate)] pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0" />
                <span>City Administration Central Bureau, Churchill Ave, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0" />
                <a href="mailto:info@addisproperty.gov.et" className="text-[var(--color-ink)] hover:underline">
                  info@addisproperty.gov.et
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0" />
                <span>Civic Helpline: <strong className="text-[var(--color-ink)] font-mono-num">8333</strong> / +251 115 51 04 00</span>
              </div>
            </div>
          </div>

          {/* 1. Services */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-[var(--color-ink)] uppercase tracking-wider">
              Civic Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setRoute("services")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Housing allocation criteria
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("services")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Tenancy agreement guidelines
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("services")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Depot maintenance dispatch
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("portal-login")} className="text-[#00594C] dark:text-[#00A38C] font-medium flex items-center gap-1 hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  <span>Resident & staff portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 2. Properties & Sites */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-[var(--color-ink)] uppercase tracking-wider">
              Property Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setRoute("rent")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Available rental units
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("sites")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Sub-City sites & map
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("sites")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Sub-City depot desks
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Inspections & Records */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-[var(--color-ink)] uppercase tracking-wider">
              Audits & Records
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setRoute("inspections")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Building safety audits
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("inspections")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Handover survey protocol
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("records")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Payment slip verification
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("records")} className="hover:text-[var(--color-ink)] hover:underline transition-colors">
                  Municipal directives & laws
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 mt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-slate)] gap-3">
          <div>
            © {new Date().getFullYear()} Addis Ababa City Administration. All statutory rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Public Trust & Integrity</span>
            <span>•</span>
            <span>Statutory Compliance</span>
            <span>•</span>
            <span>Audit Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
