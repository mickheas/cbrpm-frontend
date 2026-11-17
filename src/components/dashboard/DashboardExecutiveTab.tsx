import React, { useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck2, 
  Scale, 
  Landmark, 
  Download, 
  Users, 
  AlertTriangle,
  ArrowUpRight,
  Search,
  Sparkles
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MOCK_EXECUTIVE_SCORECARDS } from "../../data/mockData";
import { SubCityHousingScorecard } from "../../types";
import { useApp } from "../../context/AppContext";

export const DashboardExecutiveTab: React.FC = () => {
  const { showToast } = useApp();
  const [scorecards, setScorecards] = useState<SubCityHousingScorecard[]>(MOCK_EXECUTIVE_SCORECARDS);
  const [sortField, setSortField] = useState<keyof SubCityHousingScorecard>("collectionRate");
  const [selectedSubCity, setSelectedSubCity] = useState<SubCityHousingScorecard | null>(null);

  // Executive Approvals Queue
  const [pendingDirectives, setPendingDirectives] = useState([
    {
      id: "DIR-APP-2026-04",
      title: "Authorization for Commissioning 480 New Units in Bole Bulbula Site 3",
      subCity: "Bole Sub-City",
      category: "Housing Site Commissioning",
      value: "480 Units (Ready for Allocation)",
      requestedBy: "Agency Planning Directorate",
      date: "18 Aug 2026",
      status: "pending"
    },
    {
      id: "DIR-APP-2026-03",
      title: "Emergency Rehabilitation Fund Allocation for Kirkos Gotera Pumping Risers",
      subCity: "Kirkos Sub-City",
      category: "Emergency Capital Works",
      value: "ETB 4,850,000",
      requestedBy: "Central Infrastructure Bureau",
      date: "17 Aug 2026",
      status: "pending"
    },
    {
      id: "DIR-APP-2026-02",
      title: "Directive 44/2026 Annex D: Foreign Currency (FCY) Diaspora Lease Tariff Adjustment",
      subCity: "City-Wide HQ",
      category: "Fiscal Directive",
      value: "USD $1.40 / m² Benchmark",
      requestedBy: "Revenue & Treasury Desk",
      date: "15 Aug 2026",
      status: "approved"
    }
  ]);

  const handleApproveDirective = (id: string, title: string) => {
    setPendingDirectives(prev => prev.map(d => d.id === id ? { ...d, status: "approved" } : d));
    showToast(`Executive authorization sealed for: "${title}". Digital municipal decree issued.`, "success");
  };

  const totalStock = scorecards.reduce((acc, curr) => acc + curr.totalUnits, 0);
  const totalOccupied = scorecards.reduce((acc, curr) => acc + curr.occupiedUnits, 0);
  const avgOccupancy = ((totalOccupied / totalStock) * 100).toFixed(1);
  const totalCollectedEtb = scorecards.reduce((acc, curr) => acc + curr.monthlyRevenueCollectedEtb, 0);

  return (
    <div className="space-y-6">
      
      {/* High-Level Executive Cabinet Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Total City Housing Stock</span>
            <Building2 className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[var(--color-ink)]">
            72,400+
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1 flex items-center gap-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{avgOccupancy}%</span>
            <span>city-wide occupancy</span>
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Monthly Rent Collections</span>
            <Landmark className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            ETB 1.34 B
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            98.4% target achievement
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Avg Defect Resolution SLA</span>
            <CheckCircle2 className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[#00473D] dark:text-[#00A38C]">
            2.4 Days
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Across 11 Sub-City Depots
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Citizen Satisfaction</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            93.2%
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Verified resident surveys
          </div>
        </Card>
      </div>

      {/* Sub-City Performance Scorecard Table */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00594C]" />
                <span>Sub-City Housing Scorecard & Governance Matrix</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time tracking of housing stock, collection efficiency, maintenance SLA turnaround, and satisfaction across all 11 sub-cities.
              </CardDescription>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast("Exporting Executive Housing Briefing (PDF/CSV)...", "info")}
              className="text-xs h-8 border-[var(--color-line)] self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              <span>Export Cabinet Briefing</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#121212]/60 border-b border-[var(--color-line)] text-[var(--color-slate)] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Sub-City Administration</th>
                  <th className="py-3 px-3">Units Supervised</th>
                  <th className="py-3 px-3">Occupancy</th>
                  <th className="py-3 px-3">Revenue Collected (ETB)</th>
                  <th className="py-3 px-3">Collection Rate</th>
                  <th className="py-3 px-3">Avg Resolution</th>
                  <th className="py-3 px-3">Satisfaction</th>
                  <th className="py-3 px-4">Depot Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {scorecards.map((sc) => (
                  <tr key={sc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--color-ink)]">
                      {sc.subCityName}
                    </td>

                    <td className="py-3 px-3 font-mono text-[var(--color-ink)]">
                      {sc.totalUnits.toLocaleString()}
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {sc.occupancyRate}%
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono text-[var(--color-ink)]">
                      ETB {(sc.monthlyRevenueCollectedEtb / 1000000).toFixed(1)} M
                    </td>

                    <td className="py-3 px-3">
                      <span 
                        className={`text-xs font-semibold ${
                          sc.collectionRate >= 98 
                            ? "text-emerald-700 dark:text-emerald-400" 
                            : "text-amber-700 dark:text-amber-400"
                        }`}
                      >
                        {sc.collectionRate}%
                      </span>
                    </td>

                    <td className="py-3 px-3 text-[var(--color-slate)]">
                      {sc.avgResolutionDays} days
                    </td>

                    <td className="py-3 px-3 font-semibold text-purple-700 dark:text-purple-400">
                      {sc.citizenSatisfactionScore}%
                    </td>

                    <td className="py-3 px-4 text-[11px] text-[var(--color-slate)]">
                      {sc.depotManager}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cabinet Directives & Policy Approvals Queue */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#00594C]" />
            <span>Executive Cabinet Approvals & Statutory Decrees</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Review and digitally seal high-value capital expenditure requests, new scheme handovers, and municipal rent adjustments.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 space-y-3">
          {pendingDirectives.map((d) => (
            <div 
              key={d.id}
              className="p-4 rounded-xl border border-[var(--color-line)] bg-slate-50/50 dark:bg-[#121212]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[var(--color-slate)]">{d.id}</span>
                  <Badge variant="outline" className="text-[10px] border-[var(--color-line)]">
                    {d.category}
                  </Badge>
                  <span className="text-[11px] text-[var(--color-slate)]">• {d.subCity}</span>
                </div>
                <div className="font-semibold text-xs sm:text-sm text-[var(--color-ink)]">
                  {d.title}
                </div>
                <div className="text-xs text-[var(--color-slate)] flex items-center gap-3">
                  <span>Scope: <strong className="text-[var(--color-ink)]">{d.value}</strong></span>
                  <span>Requested By: {d.requestedBy}</span>
                  <span>{d.date}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {d.status === "approved" ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Decree Sealed</span>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleApproveDirective(d.id, d.title)}
                    className="bg-[#00594C] hover:bg-[#003B32] text-white text-xs h-8 px-3"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                    <span>Authorize & Seal</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
};
