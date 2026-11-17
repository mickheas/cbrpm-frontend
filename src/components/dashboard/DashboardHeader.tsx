import React from "react";
import { useApp } from "../../context/AppContext";
import { 
  Building2, 
  ShieldCheck, 
  ReceiptText, 
  Wrench, 
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  Plus,
  Key,
  Scale,
  Download,
  Truck,
  Package,
  UserPlus,
  Lock,
  Layers,
  Landmark
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface DashboardHeaderProps {
  onSelectTab: (tab: string) => void;
  onOpenDefectModal?: () => void;
  onOpenDepositModal?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onSelectTab,
  onOpenDefectModal,
  onOpenDepositModal
}) => {
  const { currentUser, showToast } = useApp();

  if (!currentUser) return null;

  const userInitials = currentUser.name
    .split(" ")
    .filter(Boolean)
    .map(n => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const role = currentUser.role;

  const getRoleBadge = () => {
    switch (role) {
      case "property_manager":
        return { label: "Building & Property Manager", icon: Building2, color: "text-[#00594C] bg-[#E8F5F1] border-[#00594C]/20" };
      case "executive":
        return { label: "City Management Executive", icon: Landmark, color: "text-purple-600 bg-purple-50 border-purple-200" };
      case "finance_officer":
      case "admin_officer":
        return { label: "Finance & Tenancy Officer", icon: ReceiptText, color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
      case "maintenance_officer":
        return { label: "Maintenance Dispatch Officer", icon: Truck, color: "text-amber-600 bg-amber-50 border-amber-200" };
      case "field_inspector":
        return { label: "Building & Field Inspector", icon: ClipboardCheck, color: "text-cyan-600 bg-cyan-50 border-cyan-200" };
      case "admin":
        return { label: "System Administrator", icon: ShieldCheck, color: "text-rose-600 bg-rose-50 border-rose-200" };
      case "resident":
      default:
        return { label: "Verified Citizen Tenant", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    }
  };

  const badgeInfo = getRoleBadge();
  const BadgeIcon = badgeInfo.icon;

  return (
    <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-3 sm:p-4 md:p-5 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4">
        
        {/* User Identity Block - Mobile-First Layout */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 ring-2 ring-[#00594C]/20 shrink-0" status="online">
            {currentUser.avatarUrl && <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />}
            <AvatarFallback className="text-sm sm:text-base font-bold bg-[#E8F5F1] text-[#00594C] dark:bg-[#1A1A1A] dark:text-[#00A38C]">
              {userInitials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <h1 className="text-base sm:text-lg font-bold text-[var(--color-ink)] tracking-tight truncate">
                {currentUser.name}
              </h1>
              
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5 sm:mt-0">
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#00594C] dark:text-[#00A38C] bg-[#E8F5F1] dark:bg-[#03241E] px-2 py-0.5 rounded-md border border-[#00594C]/15 dark:border-[#00A38C]/30/40 whitespace-nowrap">
                  <BadgeIcon className="w-3 h-3 shrink-0" />
                  <span>{badgeInfo.label}</span>
                </span>

                {currentUser.faydaId && (
                  <span className="text-[10px] sm:text-[11px] font-mono text-[var(--color-slate)] bg-[var(--color-subtle)] dark:bg-[#1A1A1A] px-1.5 py-0.5 rounded">
                    {currentUser.faydaId}
                  </span>
                )}
              </div>
            </div>

            {/* Contextual Municipal Assignment Details */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-1.5 text-[11px] sm:text-xs text-[var(--color-slate)] pt-0.5">
              {role === "resident" && (
                <>
                  <span className="flex items-center gap-1 text-[var(--color-ink)] font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-[#00594C] shrink-0" />
                    <span>{currentUser.unit}</span>
                  </span>
                  <span>•</span>
                  <span className="truncate">{currentUser.residenceName}, {currentUser.subCity}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono">
                    Lease: <strong className="text-[var(--color-ink)]">{currentUser.leaseContractNo}</strong>
                  </span>
                </>
              )}

              {role === "property_manager" && (
                <>
                  <span className="flex items-center gap-1 text-[var(--color-ink)] font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-[#00594C] shrink-0" />
                    <span>840 Supervised Units</span>
                  </span>
                  <span>•</span>
                  <span>Gerji & Bole Residential Blocks</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono">
                    Staff ID: <strong className="text-[var(--color-ink)]">{currentUser.tenantId}</strong>
                  </span>
                </>
              )}

              {role === "executive" && (
                <>
                  <span className="flex items-center gap-1 text-[var(--color-ink)] font-semibold">
                    <Landmark className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>City Cabinet Secretariat</span>
                  </span>
                  <span>•</span>
                  <span>11 Sub-Cities Housing Directorate</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono">
                    Jurisdiction: <strong className="text-[var(--color-ink)]">Addis Ababa City Admin</strong>
                  </span>
                </>
              )}

              {(role === "finance_officer" || role === "admin_officer") && (
                <>
                  <span className="flex items-center gap-1 text-[var(--color-ink)] font-semibold">
                    <ReceiptText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Treasury & Tenancy Clearance Desk</span>
                  </span>
                  <span>•</span>
                  <span>Revenue Collection Bureau</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono">
                    Staff ID: <strong className="text-[var(--color-ink)]">{currentUser.tenantId}</strong>
                  </span>
                </>
              )}

              {role === "maintenance_officer" && (
                <>
                  <span className="flex items-center gap-1 text-[var(--color-ink)] font-semibold">
                    <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Central Maintenance Depot HQ</span>
                  </span>
                  <span>•</span>
                  <span>18 Field Technicians Dispatched</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono">
                    Depot Ref: <strong className="text-[var(--color-ink)]">DEP-HQ-01</strong>
                  </span>
                </>
              )}

              {role === "field_inspector" && (
                <>
                  <span className="flex items-center gap-1 text-[var(--color-ink)] font-semibold">
                    <ClipboardCheck className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    <span>Mobile Field Inspection Unit</span>
                  </span>
                  <span>•</span>
                  <span>Yeka & Kirkos Sub-City Depots</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono">
                    Licence: <strong className="text-[var(--color-ink)]">EBCS-ENG-294</strong>
                  </span>
                </>
              )}

              {role === "admin" && (
                <>
                  <span className="flex items-center gap-1 text-[var(--color-ink)] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Root Administration Console</span>
                  </span>
                  <span>•</span>
                  <span>Platform Security & RBAC Directory</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono">
                    Uptime: <strong className="text-emerald-600 font-semibold">99.98%</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Clear, Ergonomic Role Action Buttons - Mobile-First Touch Targets */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:flex lg:flex-row items-stretch sm:items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-[var(--color-line)] w-full lg:w-auto shrink-0">
          
          {role === "resident" && (
            <>
              <Button
                size="sm"
                onClick={() => {
                  if (onOpenDepositModal) {
                    onOpenDepositModal();
                  } else {
                    onSelectTab("ledger");
                  }
                }}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 shadow-xs cursor-pointer w-full lg:w-auto justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Bank Slip</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (onOpenDefectModal) {
                    onOpenDefectModal();
                  } else {
                    onSelectTab("maintenance");
                  }
                }}
                className="text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 border-[var(--color-line)] cursor-pointer hover:bg-[var(--color-subtle)] w-full lg:w-auto justify-center"
              >
                <Wrench className="w-3.5 h-3.5 text-[#00594C]" />
                <span>Report Defect</span>
              </Button>
            </>
          )}

          {role === "property_manager" && (
            <>
              <Button
                size="sm"
                onClick={() => onSelectTab("property_manager_desk")}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 shadow-xs cursor-pointer w-full lg:w-auto justify-center"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Manage 840 Units</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  showToast("Key handover and move-in inspection protocol initiated.", "info");
                  onSelectTab("property_manager_desk");
                }}
                className="text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 border-[var(--color-line)] cursor-pointer hover:bg-[var(--color-subtle)] w-full lg:w-auto justify-center"
              >
                <Key className="w-3.5 h-3.5 text-[#00594C]" />
                <span>Key Protocol</span>
              </Button>
            </>
          )}

          {role === "executive" && (
            <>
              <Button
                size="sm"
                onClick={() => onSelectTab("executive_desk")}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 shadow-xs cursor-pointer w-full lg:w-auto justify-center"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Cabinet Directives</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast("Downloading executive housing intelligence briefing...", "info")}
                className="text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 border-[var(--color-line)] cursor-pointer hover:bg-[var(--color-subtle)] w-full lg:w-auto justify-center"
              >
                <Download className="w-3.5 h-3.5 text-[#00594C]" />
                <span>Export Briefing</span>
              </Button>
            </>
          )}

          {(role === "finance_officer" || role === "admin_officer") && (
            <>
              <Button
                size="sm"
                onClick={() => onSelectTab("ledger")}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 shadow-xs cursor-pointer w-full lg:w-auto justify-center"
              >
                <ReceiptText className="w-3.5 h-3.5" />
                <span>Verify Bank Slips</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectTab("allocations")}
                className="text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 border-[var(--color-line)] cursor-pointer hover:bg-[var(--color-subtle)] w-full lg:w-auto justify-center"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#00594C]" />
                <span>Review Quota List</span>
              </Button>
            </>
          )}

          {role === "maintenance_officer" && (
            <>
              <Button
                size="sm"
                onClick={() => onSelectTab("maintenance_desk")}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 shadow-xs cursor-pointer w-full lg:w-auto justify-center"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Dispatch Crews (24)</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  showToast("Checking spare parts reserves across 11 sub-city depots...", "info");
                  onSelectTab("maintenance_desk");
                }}
                className="text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 border-[var(--color-line)] cursor-pointer hover:bg-[var(--color-subtle)] w-full lg:w-auto justify-center"
              >
                <Package className="w-3.5 h-3.5 text-[#00594C]" />
                <span>Depot Inventory</span>
              </Button>
            </>
          )}

          {role === "field_inspector" && (
            <>
              <Button
                size="sm"
                onClick={() => onSelectTab("inspections_queue")}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 shadow-xs cursor-pointer w-full lg:w-auto justify-center"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>Field Checklist</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectTab("depot_orders")}
                className="text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 border-[var(--color-line)] cursor-pointer hover:bg-[var(--color-subtle)] w-full lg:w-auto justify-center"
              >
                <Wrench className="w-3.5 h-3.5 text-[#00594C]" />
                <span>Depot Repairs</span>
              </Button>
            </>
          )}

          {role === "admin" && (
            <>
              <Button
                size="sm"
                onClick={() => onSelectTab("admin_desk")}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 shadow-xs cursor-pointer w-full lg:w-auto justify-center"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Manage Users & Roles</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  showToast("Opening cryptographic security audit trail...", "info");
                  onSelectTab("admin_desk");
                }}
                className="text-xs font-semibold h-11 sm:h-9 min-h-[44px] sm:min-h-[36px] px-3.5 gap-1.5 border-[var(--color-line)] cursor-pointer hover:bg-[var(--color-subtle)] w-full lg:w-auto justify-center"
              >
                <Lock className="w-3.5 h-3.5 text-[#00594C]" />
                <span>Audit Logs</span>
              </Button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
