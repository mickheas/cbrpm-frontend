import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  ClipboardCheck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  FileText, 
  ArrowRight,
  Send,
  Building2,
  Clock
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";

export const InspectionsPage: React.FC = () => {
  const { setRoute, showToast, inspectionTasks } = useApp();

  const [buildingName, setBuildingName] = useState("");
  const [unitNo, setUnitNo] = useState("");
  const [defectType, setDefectType] = useState("Plumbing");
  const [description, setDescription] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buildingName || !unitNo || !description) return;

    const ref = `INS-REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(ref);
    showToast(`Inspection request ${ref} submitted to Sub-City Engineering Depot.`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00594C] uppercase tracking-wider mb-1">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Facility Quality & Asset Assurance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
            Building Inspections & Defect Verification
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-slate)] mt-1">
            Rigorous multi-point structural, mechanical, and safety audits across all municipal building assets.
          </p>
        </div>

        <Button
          onClick={() => setRoute("portal-login")}
          className="w-full sm:w-auto bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-10 gap-2 shadow-xs cursor-pointer justify-center"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Inspector Field Console</span>
        </Button>
      </div>

      {/* 3 Standard Inspection Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-5 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#E8F5F1] dark:bg-[#1A1A1A] text-[#00594C] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--color-ink)]">
            Pre-Occupancy Handover Surveys
          </h3>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Every newly constructed or re-allocated unit undergoes a 42-point statutory checklist covering utility meters, structural finishes, doors/windows, and water valves prior to tenant move-in.
          </p>
          <div className="text-xs text-[var(--color-slate)] pt-2 border-t border-[var(--color-line)] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#00594C]" />
            <span>Completed prior to lease signing</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-5 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-[#1A1A1A] text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--color-ink)]">
            Defect Triage & Verification
          </h3>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            When tenants report leaks, electrical faults, or structural settling, sub-city depot engineers are dispatched to physically inspect and certify contractor rectification work.
          </p>
          <div className="text-xs text-[var(--color-slate)] pt-2 border-t border-[var(--color-line)] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Dispatched within 24–48 hours</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-5 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-[#1A1A1A] text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--color-ink)]">
            Routine Fire & Safety Audits
          </h3>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Semi-annual municipal evaluations of public stairwells, firefighting booster pumps, emergency exit lighting, and centralized rooftop reservoir systems.
          </p>
          <div className="text-xs text-[var(--color-slate)] pt-2 border-t border-[var(--color-line)] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Semi-annual municipal cycle</span>
          </div>
        </div>

      </div>

      {/* Interactive Request Form & Active Municipal Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Public Defect Inspection Request Form (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="shadow-xs">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base">Request an On-Site Municipal Inspection</CardTitle>
              <CardDescription className="text-xs">
                Tenants experiencing unaddressed maintenance issues or safety concerns may schedule an official depot inspection.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 pt-3">
              {submittedRef ? (
                <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-800 dark:text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inspection Request Dispatched</span>
                  </div>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    Reference number <strong className="font-mono">{submittedRef}</strong> has been assigned. The sub-city facility engineering team will contact the tenant to arrange unit access.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setSubmittedRef(null); setDescription(""); }}
                    className="mt-3 text-xs"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[var(--color-slate)] mb-1">
                        Building / Housing Scheme
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gerji City Residence Block 3"
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[var(--color-slate)] mb-1">
                        Unit / Floor Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Unit B304 (Floor 3)"
                        value={unitNo}
                        onChange={(e) => setUnitNo(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[var(--color-slate)] mb-1">
                      Inspection Scope Category
                    </label>
                    <select
                      value={defectType}
                      onChange={(e) => setDefectType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                    >
                      <option value="Plumbing">Plumbing & Water Pressure Defect</option>
                      <option value="Electrical">Electrical Riser & Circuit Breaker Fault</option>
                      <option value="Structural">Wall Cracks / Ceiling Leakage</option>
                      <option value="Elevator">Elevator / Common Mechanical Plant</option>
                      <option value="Safety">Corridor Fire Hose & Safety Audit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[var(--color-slate)] mb-1">
                      Defect Description & Unit Access Notes
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe the defect, when it began, and any specific times inspectors can access the unit..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-10 gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inspection Request</span>
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Public Audit Logs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="shadow-xs">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base">Recent Field Inspections</CardTitle>
              <CardDescription className="text-xs">
                Live log of scheduled and conducted municipal surveys.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 divide-y divide-[var(--color-line)]">
              {inspectionTasks.map((task) => (
                <div key={task.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-ink)]">{task.buildingName}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      task.status === "passed"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : task.status === "in_progress"
                        ? "bg-emerald-100 text-blue-800 dark:bg-blue-950 dark:text-[#00A38C]"
                        : task.status === "rectification_required"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-slate-100 text-slate-700 dark:bg-[#1A1A1A] dark:text-slate-300"
                    }`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--color-slate)]">
                    {task.unitNumber} • {task.inspectionType} • {task.scheduledDate}
                  </div>
                  {task.findings && (
                    <div className="text-[11px] text-[var(--color-ink)] bg-[var(--color-subtle)] dark:bg-[#1A1A1A] p-2 rounded mt-1">
                      {task.findings}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
};
