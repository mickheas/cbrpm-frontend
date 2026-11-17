import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Building2,
  Check,
  X,
  Send
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FieldInspectionTask } from "../../types";

export const DashboardFieldInspectorTab: React.FC = () => {
  const { inspectionTasks, updateInspectionTask, showToast } = useApp();

  const [selectedTaskId, setSelectedTaskId] = useState<string>(inspectionTasks[0]?.id || "");
  const [activeTask, setActiveTask] = useState<FieldInspectionTask>(inspectionTasks[0]);

  // Inspection Checklist Items
  const [checkPlumbing, setCheckPlumbing] = useState(true);
  const [checkElectrical, setCheckElectrical] = useState(true);
  const [checkStructural, setCheckStructural] = useState(true);
  const [checkFireSafety, setCheckFireSafety] = useState(true);
  const [inspectorNotes, setInspectorNotes] = useState(activeTask?.findings || "");
  const [photosAttached, setPhotosAttached] = useState<number>(activeTask?.photosCount || 2);

  const handleSelectTask = (task: FieldInspectionTask) => {
    setSelectedTaskId(task.id);
    setActiveTask(task);
    setInspectorNotes(task.findings || "");
    setPhotosAttached(task.photosCount || 1);
  };

  const handleSubmitResult = (finalStatus: "passed" | "rectification_required") => {
    updateInspectionTask(selectedTaskId, {
      status: finalStatus,
      findings: inspectorNotes,
      photosCount: photosAttached
    });
    showToast(`Inspection ${selectedTaskId} recorded as ${finalStatus === "passed" ? "PASSED" : "RECTIFICATION REQUIRED"}.`, "success");
  };

  return (
    <div className="space-y-6">
      
      {/* Mobile-First Task Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {inspectionTasks.map(task => {
          const isSelected = task.id === selectedTaskId;
          return (
            <button
              key={task.id}
              onClick={() => handleSelectTask(task)}
              className={`px-3 py-2 rounded-xl text-left border shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#00594C] bg-[#E8F5F1] dark:bg-[#1A1A1A]"
                  : "border-[var(--color-line)] bg-white dark:bg-[#121212]"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-ink)]">
                <span>{task.id}</span>
                {task.priority === "Urgent" && (
                  <span className="text-[9px] bg-rose-100 text-rose-800 px-1 rounded">Urgent</span>
                )}
              </div>
              <div className="text-[11px] text-[var(--color-slate)] truncate max-w-[140px]">
                {task.buildingName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Inspection Checklist Form */}
      {activeTask && (
        <Card className="shadow-xs">
          <CardHeader className="p-5 pb-3 border-b border-[var(--color-line)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-[#00594C] uppercase tracking-wider">
                  {activeTask.inspectionType} • {activeTask.subCity}
                </div>
                <CardTitle className="text-base sm:text-lg">
                  {activeTask.buildingName} — {activeTask.unitNumber}
                </CardTitle>
                <CardDescription className="text-xs">
                  {activeTask.locationDetails}
                </CardDescription>
              </div>

              <span className={`self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded ${
                activeTask.status === "passed"
                  ? "bg-emerald-100 text-emerald-800"
                  : activeTask.status === "rectification_required"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-blue-800"
              }`}>
                Current: {activeTask.status.replace("_", " ")}
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-5 text-xs">
            
            {/* Checklist items */}
            <div className="space-y-3">
              <div className="font-bold text-[var(--color-ink)] uppercase tracking-wider text-[11px]">
                Physical Verification Checklist
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] dark:bg-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkPlumbing}
                    onChange={(e) => setCheckPlumbing(e.target.checked)}
                    className="w-4 h-4 accent-[#00594C]"
                  />
                  <div>
                    <div className="font-semibold text-[var(--color-ink)]">Plumbing & Valves</div>
                    <div className="text-[10px] text-[var(--color-slate)]">No riser leaks, pressure verified</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] dark:bg-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkElectrical}
                    onChange={(e) => setCheckElectrical(e.target.checked)}
                    className="w-4 h-4 accent-[#00594C]"
                  />
                  <div>
                    <div className="font-semibold text-[var(--color-ink)]">Electrical & Breakers</div>
                    <div className="text-[10px] text-[var(--color-slate)]">Distribution board grounded properly</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] dark:bg-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkStructural}
                    onChange={(e) => setCheckStructural(e.target.checked)}
                    className="w-4 h-4 accent-[#00594C]"
                  />
                  <div>
                    <div className="font-semibold text-[var(--color-ink)]">Wall & Ceiling Finishes</div>
                    <div className="text-[10px] text-[var(--color-slate)]">No moisture seeps or settlement fissures</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] dark:bg-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkFireSafety}
                    onChange={(e) => setCheckFireSafety(e.target.checked)}
                    className="w-4 h-4 accent-[#00594C]"
                  />
                  <div>
                    <div className="font-semibold text-[var(--color-ink)]">Corridor Egress & Extinguisher</div>
                    <div className="text-[10px] text-[var(--color-slate)]">Clear escape paths and inspected seal</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Inspector Notes */}
            <div>
              <label className="block font-semibold text-[var(--color-slate)] mb-1">
                Field Findings & Rectification Directive
              </label>
              <textarea
                rows={3}
                value={inspectorNotes}
                onChange={(e) => setInspectorNotes(e.target.value)}
                placeholder="Record technical measurements, identified defects, or contractor repair instructions..."
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
              />
            </div>

            {/* Photos count */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-subtle)] dark:bg-[#1A1A1A] border border-[var(--color-line)]">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#00594C]" />
                <span className="font-semibold text-[var(--color-ink)]">Field Photos Attached:</span>
                <span className="font-mono-num font-bold text-sm">{photosAttached} photos</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPhotosAttached(prev => prev + 1);
                  showToast("Field photo captured & added to inspection docket.", "info");
                }}
                className="text-xs h-7"
              >
                + Take Photo
              </Button>
            </div>

            {/* Action Buttons (Large, Comfortable Touch Targets) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => handleSubmitResult("passed")}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold h-11 gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Certify Inspection: Mark as Passed</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleSubmitResult("rectification_required")}
                className="flex-1 text-xs font-semibold h-11 gap-2 border-amber-300 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Flag Rectification Required</span>
              </Button>
            </div>

          </CardContent>
        </Card>
      )}

    </div>
  );
};
