import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { BRANCHES } from "../data/mockData";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Search, 
  Navigation
} from "lucide-react";

export const BranchesPage: React.FC = () => {
  const { language, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBranches = BRANCHES.filter(b => {
    const name = language === "am" ? b.nameAm : b.name;
    const subCity = b.subCity.toLowerCase();
    const query = searchTerm.toLowerCase();
    return name.toLowerCase().includes(query) || subCity.includes(query) || b.address.toLowerCase().includes(query);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--color-line)] pb-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C] dark:text-[#00A38C] uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Branch directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
          Head office & sub-city branch directory
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-slate)] max-w-3xl">
          Visit your nearest Federal Housing Corporation branch for in-person document certification, tenancy agreements, key collection, and maintenance inquiries.
        </p>
      </div>

      {/* Head Office Flagship Feature */}
      <div className="p-5 sm:p-6 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#00594C] dark:text-[#00A38C] font-semibold">
                National headquarters
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-ink)]">
                FHC central head office — Mexico Square
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-xs bg-[var(--color-base)] text-[var(--color-slate)] border border-[var(--color-line)]">
            Open Monday – Saturday
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[var(--color-slate)]">
          <div className="space-y-0.5">
            <div className="font-semibold text-[var(--color-ink)]">Physical address:</div>
            <div>Churchill Ave / Mexico Square, Next to Wabi Shebelle Hotel, Addis Ababa</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-semibold text-[var(--color-ink)]">Official contact:</div>
            <div>Hotline: <strong className="font-mono-num text-[var(--color-ink)]">8333</strong> | +251 115 51 04 00</div>
            <div className="text-[#00594C] dark:text-[#00A38C]">info@fhc.gov.et</div>
          </div>
          <div className="space-y-0.5">
            <div className="font-semibold text-[var(--color-ink)]">Working hours:</div>
            <div>Mon – Fri: 8:30 AM – 5:30 PM (Lunch: 12:30 – 1:30 PM)</div>
            <div>Saturday: 8:30 AM – 12:30 PM</div>
          </div>
        </div>
      </div>

      {/* Search Input for Sub-City Branches */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-[var(--color-ink)]">
            Sub-city branch offices ({filteredBranches.length})
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[var(--color-slate)] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sub-city or address..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] focus:border-[#00594C] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBranches.map((b) => {
            const name = language === "am" ? b.nameAm : b.name;

            return (
              <div 
                key={b.id}
                className="bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-line)] shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-xs bg-[var(--color-base)] text-[var(--color-slate)] border border-[var(--color-line)]">
                      {b.subCity} Sub-City
                    </span>
                    <span className="text-[11px] text-[#1B7A4A] dark:text-[#22C55E] font-medium">
                      Operational
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-[var(--color-ink)]">
                    {name}
                  </h3>

                  <div className="space-y-1 text-xs text-[var(--color-slate)]">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0" />
                      <span className="font-mono-num">{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0" />
                      <span>{b.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--color-slate)] shrink-0" />
                      <span>{b.workingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--color-line)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Calling ${name} at ${b.phone}`, "info");
                    }}
                    className="text-xs font-medium text-[#00594C] dark:text-[#00A38C] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call branch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Opening maps navigation for ${name}`, "info");
                    }}
                    className="text-xs font-medium text-[var(--color-slate)] hover:text-[var(--color-ink)] flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
