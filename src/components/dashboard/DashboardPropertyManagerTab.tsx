import React, { useState } from "react";
import { 
  Building2, 
  Users, 
  Key, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  Filter, 
  FileCheck2, 
  Zap, 
  Droplet,
  ShieldAlert,
  ArrowUpRight,
  Phone,
  Calendar,
  Check,
  X
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { MOCK_MANAGED_UNITS } from "../../data/mockData";
import { ManagedUnitRecord } from "../../types";
import { useApp } from "../../context/AppContext";

export const DashboardPropertyManagerTab: React.FC = () => {
  const { showToast } = useApp();
  const [units, setUnits] = useState<ManagedUnitRecord[]>(MOCK_MANAGED_UNITS);
  const [filterBlock, setFilterBlock] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<ManagedUnitRecord | null>(null);

  // Common Facilities State
  const [facilities, setFacilities] = useState([
    {
      id: "fac-1",
      name: "Underground Water Reservoir & Booster Pump 01",
      site: "Gerji Block 04/05",
      status: "Optimal",
      level: "84% (42,000 Liters)",
      lastService: "08 Aug 2026",
      nextService: "08 Sep 2026",
      health: 96
    },
    {
      id: "fac-2",
      name: "Emergency Standby Diesel Generator (250 kVA)",
      site: "Gerji Central Plant",
      status: "Optimal",
      level: "Fuel 92% • Battery Tested OK",
      lastService: "15 Aug 2026",
      nextService: "15 Sep 2026",
      health: 98
    },
    {
      id: "fac-3",
      name: "Traction Passenger Elevator A (Block 04)",
      site: "Gerji Block 04",
      status: "Optimal",
      level: "10-Passenger • Speed 1.5 m/s",
      lastService: "01 Aug 2026",
      nextService: "01 Sep 2026",
      health: 92
    },
    {
      id: "fac-4",
      name: "Waste Sorting & Compactor Station",
      site: "Gerji East Boundary",
      status: "Service Scheduled",
      level: "Cleaned Daily • Municipal Collection M/W/F",
      lastService: "18 Aug 2026",
      nextService: "21 Aug 2026",
      health: 88
    }
  ]);

  const handleToggleKeyHandover = (unitId: string) => {
    setUnits(prev => prev.map(u => {
      if (u.id === unitId) {
        const nextStatus = !u.keyHandoverSigned;
        showToast(
          nextStatus 
            ? `Key handover protocol certified for Unit ${u.unitNumber}.` 
            : `Key custody revoked for Unit ${u.unitNumber}.`,
          "info"
        );
        return { ...u, keyHandoverSigned: nextStatus };
      }
      return u;
    }));
  };

  const filteredUnits = units.filter(u => {
    const matchesBlock = filterBlock === "all" || u.buildingBlock.includes(filterBlock);
    const matchesStatus = filterStatus === "all" || u.status === filterStatus;
    const matchesSearch = 
      u.unitNumber.includes(searchQuery) ||
      u.buildingBlock.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.tenantName && u.tenantName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBlock && matchesStatus && matchesSearch;
  });

  const occupiedCount = units.filter(u => u.status === "occupied").length;
  const vacantReadyCount = units.filter(u => u.status === "vacant_ready").length;
  const maintenanceCount = units.filter(u => u.status === "under_maintenance").length;
  const allocationPendingCount = units.filter(u => u.status === "allocation_pending").length;

  return (
    <div className="space-y-6">
      
      {/* Property Overview Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Total Units Supervised</span>
            <Building2 className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[var(--color-ink)]">
            840 Units
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1 flex items-center gap-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">12 Blocks</span>
            <span>in Gerji & Bole</span>
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Occupancy Rate</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            95.2%
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            {occupiedCount} in sample block active
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Vacant / Move-in Ready</span>
            <CheckCircle2 className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[#00473D] dark:text-[#00A38C]">
            14 Units
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Keys verified & cleaned
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Under Turnover / Repair</span>
            <Wrench className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
            6 Units
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Depot contractor on site
          </div>
        </Card>
      </div>

      {/* Buildings & Units Directory */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#00594C]" />
                <span>Managed Residential Units & Handover Status</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Unit roster, key protocol sign-offs, and sub-meter utility baselines for assigned housing blocks.
              </CardDescription>
            </div>

            {/* Quick Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[160px]">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
                <Input
                  type="text"
                  placeholder="Search unit or tenant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-xs bg-slate-50 dark:bg-[#121212]"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-lg font-medium text-[var(--color-ink)]"
              >
                <option value="all">All Statuses</option>
                <option value="occupied">Occupied</option>
                <option value="vacant_ready">Vacant Ready</option>
                <option value="under_maintenance">Under Maintenance</option>
                <option value="allocation_pending">Allocation Pending</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#121212]/60 border-b border-[var(--color-line)] text-[var(--color-slate)] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Unit / Block</th>
                  <th className="py-3 px-3">Typology</th>
                  <th className="py-3 px-3">Current Resident</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Key Handover</th>
                  <th className="py-3 px-3">Sub-Meters (W / E)</th>
                  <th className="py-3 px-3">Last Inspected</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--color-ink)]">
                      <div>Unit {unit.unitNumber}</div>
                      <div className="text-[11px] font-normal text-[var(--color-slate)]">{unit.buildingBlock} • Fl {unit.floor}</div>
                    </td>

                    <td className="py-3 px-3 text-[var(--color-ink)]">
                      <div>{unit.bedroomCount} Bedroom</div>
                      <div className="text-[11px] text-[var(--color-slate)]">{unit.areaSqM} m²</div>
                    </td>

                    <td className="py-3 px-3">
                      {unit.tenantName ? (
                        <div>
                          <div className="font-medium text-[var(--color-ink)]">{unit.tenantName}</div>
                          <div className="text-[11px] text-[var(--color-slate)] flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{unit.tenantPhone}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[var(--color-slate)] italic">No active tenant</span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      {unit.status === "occupied" && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                          Occupied
                        </span>
                      )}
                      {unit.status === "vacant_ready" && (
                        <span className="text-[#00473D] dark:text-[#00A38C] font-semibold text-xs">
                          Vacant Ready
                        </span>
                      )}
                      {unit.status === "under_maintenance" && (
                        <span className="text-amber-700 dark:text-amber-400 font-semibold text-xs">
                          Refurbishment
                        </span>
                      )}
                      {unit.status === "allocation_pending" && (
                        <span className="text-purple-700 dark:text-purple-400 font-semibold text-xs">
                          Alloc. Pending
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleKeyHandover(unit.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          unit.keyHandoverSigned
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-700 dark:bg-[#1A1A1A] dark:text-slate-300 hover:bg-slate-200"
                        }`}
                        title="Click to toggle key protocol signature status"
                      >
                        <Key className="w-3 h-3" />
                        <span>{unit.keyHandoverSigned ? "Signed" : "Pending Sign"}</span>
                      </button>
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-[var(--color-slate)]">
                      <div className="flex items-center gap-1">
                        <Droplet className="w-3 h-3 text-cyan-600" />
                        <span>{unit.waterMeterReading} m³</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-600" />
                        <span>{unit.electricMeterReading} kWh</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-[var(--color-slate)]">
                      {unit.lastInspected}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          showToast(`Generating move-in / move-out condition report for Unit ${unit.unitNumber}...`, "info");
                        }}
                        className="h-7 text-xs px-2.5"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Common Area Facilities & Service Desk */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Common Facilities & Estate Infrastructure Health</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Operational status of standby power generators, potable water booster reservoirs, elevators, and municipal waste systems.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map((f) => (
              <div 
                key={f.id}
                className="p-3.5 rounded-xl border border-[var(--color-line)] bg-slate-50/50 dark:bg-[#121212]/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-xs text-[var(--color-ink)]">{f.name}</div>
                    <div className="text-[11px] text-[var(--color-slate)]">{f.site}</div>
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                    {f.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-[var(--color-ink)] bg-white dark:bg-black p-2 rounded-lg border border-[var(--color-line)]">
                  {f.level}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--color-slate)] pt-1">
                  <span>Last Service: {f.lastService}</span>
                  <span>Next: {f.nextService}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
