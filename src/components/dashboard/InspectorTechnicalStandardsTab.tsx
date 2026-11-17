import React, { useState } from "react";
import { 
  ClipboardCheck, 
  ShieldAlert, 
  Layers, 
  Zap, 
  Droplets, 
  Flame, 
  Scale, 
  AlertTriangle,
  Download,
  Printer,
  FileCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const InspectorTechnicalStandardsTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const standards = [
    {
      id: "STD-PLUMB-01",
      domain: "Plumbing & Hydrology",
      icon: Droplets,
      severity: "Level 2 - Priority",
      title: "Main Riser & Manifold Pressure Standards",
      clause: "EBCS-10 / Sec 4.2",
      specification: "Residential water riser operating pressure must maintain 2.5 - 3.5 bar. Pressure drop below 1.8 bar triggers mandatory municipal manifold check.",
      actionRequired: "Valve reseating or PRV calibration within 48 hours."
    },
    {
      id: "STD-ELEC-02",
      domain: "Electrical & Distribution",
      icon: Zap,
      severity: "Level 1 - Critical",
      title: "Floor Distribution Board Moisture Isolation",
      clause: "EEU / AACA Reg 8.1",
      specification: "Zero moisture tolerance in electrical risers and sub-meter banks. Any water intrusion requires immediate circuit breaker lockout and isolation.",
      actionRequired: "Emergency dispatch within 4 hours; mandatory seal re-inspection."
    },
    {
      id: "STD-STRUCT-03",
      domain: "Structural & Masonry",
      icon: Layers,
      severity: "Level 1 - Critical",
      title: "Load-Bearing Wall & Slab Deflection Tolerances",
      clause: "EBCS-2 / Part 3",
      specification: "Diagonal shear cracks exceeding 2mm on shear walls or reinforced concrete beam-column joints must be reported for municipal structural engineering audit.",
      actionRequired: "Immediate site demarcation and notice to Sub-City Engineering Bureau."
    },
    {
      id: "STD-FIRE-04",
      domain: "Fire Safety & Egress",
      icon: Flame,
      severity: "Level 1 - Critical",
      title: "Common Corridor & Stairwell Clearance",
      clause: "Civil Protection Directive 14",
      specification: "Minimum 1.2m clear width in public corridors. Prohibit personal storage, security grilles that obstruct egress stairs, or uncertified gas cylinder storage.",
      actionRequired: "Statutory 24-hour abatement notice to tenant before administrative removal."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#E8F5F1] dark:bg-[#121212] border border-[#00594C]/20 dark:border-[#00A38C]/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00594C] dark:text-[#00A38C]">
            <ClipboardCheck className="w-4 h-4" />
            <span>Field Inspection Technical Standards</span>
          </div>
          <h2 className="text-base font-bold text-[var(--color-ink)]">
            Ethiopian Building Code Standards (EBCS) & Municipal Defect Matrix
          </h2>
          <p className="text-xs text-[var(--color-slate)]">
            Reference manual for on-site physical audits, pre-occupancy handover surveys, and depot repair triage.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="text-xs h-8 gap-1.5 border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Field Manual</span>
        </Button>
      </div>

      {/* Standards Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {standards.map(item => {
          const Icon = item.icon;
          const isCritical = item.severity.includes("Level 1");

          return (
            <Card key={item.id} className="shadow-xs hover:border-[#00594C]/40 transition-colors">
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C]">
                    <Icon className="w-4 h-4" />
                    <span>{item.domain}</span>
                  </span>
                  <Badge 
                    variant={isCritical ? "destructive" : "pending"} 
                    className="text-[10px] py-0.5"
                  >
                    {item.severity}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-bold text-[var(--color-ink)]">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs font-mono text-[var(--color-slate)]">
                  {item.clause} • {item.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 text-xs">
                <div className="bg-[var(--color-subtle)] p-3 rounded-md text-[var(--color-ink)]/90 leading-relaxed">
                  <strong>Technical Specification:</strong> {item.specification}
                </div>

                <div className="p-2.5 rounded-md border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200">
                  <span className="font-semibold block text-[11px]">Enforcement Protocol:</span>
                  <span>{item.actionRequired}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
};
