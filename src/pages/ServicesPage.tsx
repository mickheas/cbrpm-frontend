import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SERVICES } from "../data/mockData";
import { 
  FileCheck2, 
  KeyRound, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Calculator,
  ArrowRight,
  FileText
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";

export const ServicesPage: React.FC = () => {
  const { setRoute, showToast, submitAllocationApplication } = useApp();

  // Allocation Eligibility Wizard State
  const [applicantType, setApplicantType] = useState<"civil_servant" | "public_institution" | "citizen">("civil_servant");
  const [tenureYears, setTenureYears] = useState<number>(8);
  const [familyMembers, setFamilyMembers] = useState<number>(3);
  const [hasCurrentHome, setHasCurrentHome] = useState<boolean>(false);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  // Quick Application Modal/Form
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [faydaId, setFaydaId] = useState("");
  const [employer, setEmployer] = useState("");
  const [subCityPref, setSubCityPref] = useState("Yeka Sub-City");
  const [bedroomPref, setBedroomPref] = useState(2);

  const calculatePoints = () => {
    let score = 0;
    if (applicantType === "civil_servant") score += 40;
    else if (applicantType === "public_institution") score += 35;
    else score += 20;

    if (tenureYears >= 15) score += 25;
    else if (tenureYears >= 8) score += 18;
    else if (tenureYears >= 3) score += 10;
    else score += 5;

    score += Math.min(familyMembers * 4, 20);

    if (!hasCurrentHome) score += 15;

    setCalculatedScore(score);
    showToast(`Eligibility score evaluated: ${score}/100 points`, "info");
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !faydaId) return;

    submitAllocationApplication({
      applicantName: fullName,
      faydaId,
      employer: employer || "Federal Ministry",
      subCityPreference: subCityPref,
      bedroomPreference: bedroomPref
    });
    setShowApplyForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00594C] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory Property Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
            Civic Services & Housing Allocation
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-slate)] mt-1">
            Official procedures for public housing allocation, statutory lease agreements, maintenance triage, and payment verification.
          </p>
        </div>

        <Button
          onClick={() => setShowApplyForm(true)}
          className="w-full sm:w-auto bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-10 px-4 shadow-xs cursor-pointer justify-center"
        >
          <span>Apply for Public Housing Quota</span>
        </Button>
      </div>

      {/* Services Grid (4 Core Categories) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((srv) => (
          <Card key={srv.id} className="shadow-xs flex flex-col justify-between">
            <CardHeader className="p-5 pb-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#00594C]">
                  {srv.category.toUpperCase()}
                </span>
                <span className="text-xs text-[var(--color-slate)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#00594C]" />
                  <span>{srv.processingTime}</span>
                </span>
              </div>
              <CardTitle className="text-base sm:text-lg">{srv.title}</CardTitle>
              <CardDescription className="text-xs">{srv.description}</CardDescription>
            </CardHeader>

            <CardContent className="p-5 pt-2 space-y-3">
              <div>
                <div className="text-[11px] font-bold text-[var(--color-ink)] mb-0.5">Eligibility:</div>
                <div className="text-xs text-[var(--color-slate)]">{srv.eligibility}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-[var(--color-ink)] mb-1">Required Documentation:</div>
                <div className="space-y-1">
                  {srv.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[var(--color-slate)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Self-Assessment Eligibility Wizard */}
      <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-6 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00594C] uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Directive Assessment Tool</span>
          </div>
          <h2 className="text-xl font-bold text-[var(--color-ink)]">
            Housing Allocation Priority Calculator
          </h2>
          <p className="text-xs text-[var(--color-slate)] mt-0.5">
            Evaluate your indicative priority score based on Addis Ababa City Administration Directive No. 44/2024.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[var(--color-slate)] mb-1">
              Applicant Category
            </label>
            <select
              value={applicantType}
              onChange={(e: any) => setApplicantType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
            >
              <option value="civil_servant">Permanent Civil Servant (Ministry / Agency)</option>
              <option value="public_institution">Public Enterprise Personnel</option>
              <option value="citizen">Standard Citizen Applicant</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[var(--color-slate)] mb-1">
              Years of Public Service ({tenureYears} Years)
            </label>
            <input
              type="range"
              min={1}
              max={30}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-[#00594C] cursor-pointer"
            />
          </div>

          <div>
            <label className="block font-semibold text-[var(--color-slate)] mb-1">
              Household Size ({familyMembers} Members)
            </label>
            <input
              type="range"
              min={1}
              max={8}
              value={familyMembers}
              onChange={(e) => setFamilyMembers(Number(e.target.value))}
              className="w-full accent-[#00594C] cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="homeCheck"
              checked={hasCurrentHome}
              onChange={(e) => setHasCurrentHome(e.target.checked)}
              className="w-4 h-4 accent-[#00594C] cursor-pointer"
            />
            <label htmlFor="homeCheck" className="text-xs text-[var(--color-ink)] cursor-pointer">
              Currently owns residential property in Addis Ababa
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--color-line)]">
          <Button
            onClick={calculatePoints}
            className="w-full sm:w-auto bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-10 px-6 shadow-xs"
          >
            Evaluate Priority Score
          </Button>

          {calculatedScore !== null && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[var(--color-slate)]">Estimated Allocation Score:</span>{" "}
                <strong className="text-base text-emerald-700 dark:text-emerald-300 font-mono-num font-bold">
                  {calculatedScore} / 100 Points
                </strong>
                <span className="text-[11px] text-[var(--color-slate)] block">
                  {calculatedScore >= 75 ? "High Priority Allocation Tier" : "Standard Allocation Queue Tier"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Allocation Application Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-3">
              <h3 className="font-bold text-base text-[var(--color-ink)]">
                Submit Public Housing Allocation Request
              </h3>
              <button
                onClick={() => setShowApplyForm(false)}
                className="text-xs text-[var(--color-slate)] hover:text-[var(--color-ink)]"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-slate)] mb-1">
                  Applicant Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almaz Bekele Hailu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-slate)] mb-1">
                  Fayda National Identification ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FAYDA-ETH-3310492"
                  value={faydaId}
                  onChange={(e) => setFaydaId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-slate)] mb-1">
                  Employing Ministry / Public Agency
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ministry of Innovation & Technology"
                  value={employer}
                  onChange={(e) => setEmployer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-slate)] mb-1">
                    Preferred Sub-City
                  </label>
                  <select
                    value={subCityPref}
                    onChange={(e) => setSubCityPref(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                  >
                    <option value="Yeka Sub-City">Yeka Sub-City</option>
                    <option value="Bole Sub-City">Bole Sub-City</option>
                    <option value="Kirkos Sub-City">Kirkos Sub-City</option>
                    <option value="Lemi Kura Sub-City">Lemi Kura Sub-City</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--color-slate)] mb-1">
                    Bedroom Preference
                  </label>
                  <select
                    value={bedroomPref}
                    onChange={(e) => setBedroomPref(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                  >
                    <option value={1}>1 Bedroom</option>
                    <option value={2}>2 Bedrooms</option>
                    <option value={3}>3 Bedrooms</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-[#00594C] text-white text-xs font-semibold h-10"
                >
                  Submit Application
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowApplyForm(false)}
                  className="text-xs h-10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
