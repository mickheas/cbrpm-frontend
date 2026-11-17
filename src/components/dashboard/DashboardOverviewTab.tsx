import React from "react";
import { useApp } from "../../context/AppContext";
import { 
  Building2, 
  ReceiptText, 
  Wrench, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  PhoneCall, 
  Download,
  FileCheck2,
  Users,
  ClipboardCheck,
  AlertTriangle,
  CreditCard,
  Upload,
  ExternalLink,
  ChevronRight,
  Key,
  Truck,
  Landmark,
  Scale,
  Package,
  Server,
  Lock,
  Copy,
  Check
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MOCK_MANAGED_UNITS, MOCK_EXECUTIVE_SCORECARDS, MOCK_DISPATCH_WORK_ORDERS } from "../../data/mockData";

interface DashboardOverviewTabProps {
  onSelectTab: (tab: string) => void;
  onOpenDefectModal?: () => void;
  onOpenDepositModal?: () => void;
}

export const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({
  onSelectTab,
  onOpenDefectModal,
  onOpenDepositModal
}) => {
  const { 
    currentUser, 
    paymentVerifications, 
    inspectionTasks, 
    allocationApplications, 
    showToast 
  } = useApp();

  if (!currentUser) return null;

  const role = currentUser.role;

  // ─────────────────────────────────────────────────────────────
  // 1. CITIZEN / RESIDENT TENANT OVERVIEW (Dr. Tewodros)
  // Priority: Pending Payments & Bank Deposit Verification
  // ─────────────────────────────────────────────────────────────
  if (role === "resident") {
    const latestPayment = paymentVerifications[0];
    const isPendingVerification = latestPayment && latestPayment.status === "pending_verification";
    const isVerified = latestPayment && latestPayment.status === "verified";

    return (
      <div className="space-y-4 sm:space-y-6">
        
        {/* PRIORITY 1: Prominent Rent Payment & Verification Hero Banner */}
        <div className="bg-gradient-to-br from-[#00594C] to-[#003B32] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
            <Building2 className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Top row: Context & Payment Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 sm:pb-4">
              <div className="space-y-0.5">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                  <span className="truncate">Statutory Public Tenancy • Monthly Due</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                  Meskerem / September 2026 Monthly Rent
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  {isPendingVerification ? (
                    <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin shrink-0" />
                  ) : isVerified ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                  )}
                  <span className="tracking-wide">
                    {isPendingVerification ? "Slip Under Review" : isVerified ? "Paid & Cleared" : "Slip Submission Due"}
                  </span>
                </span>
              </div>
            </div>

            {/* Middle row: Financial Figure + Official Treasury Accounts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-center">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-emerald-200">Statutory Monthly Rent:</span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
                  ETB {currentUser.monthlyRentEtb.toLocaleString()}
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <span>Due Date: <strong>30 September 2026</strong></span>
                  <span>•</span>
                  <span>Grace Period: 5 Days</span>
                </div>
              </div>

              {/* Designated Municipal Treasury Bank Accounts */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-xs rounded-xl p-3 sm:p-4 border border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-200 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <span>Designated City Treasury Accounts</span>
                  <span className="text-emerald-300 shrink-0">Official Recipient</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Commercial Bank of Ethiopia (CBE)</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5 select-all">1000-0238-4921-9</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">AA Housing Dev Treasury</span>
                  </div>

                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Awash Bank / Telebirr Pay</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5 select-all">0132-0948-2831-0</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">Telebirr Biller ID: 99420</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Primary Call-to-Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
              <p className="text-[11px] sm:text-xs text-emerald-100 max-w-lg leading-relaxed">
                After depositing rent at designated banks, upload your receipt slip or reference below for municipal clearance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
                <Button
                  size="default"
                  onClick={() => {
                    if (onOpenDepositModal) {
                      onOpenDepositModal();
                    } else {
                      onSelectTab("ledger");
                    }
                  }}
                  className="bg-white text-[#00594C] hover:bg-emerald-50 font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Upload className="w-4 h-4 text-[#00594C] shrink-0" />
                  <span>Upload Bank Slip</span>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onSelectTab("ledger")}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-9 sm:h-10 px-3.5 sm:px-4 gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <ReceiptText className="w-4 h-4 shrink-0" />
                  <span>View Ledger</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Resident Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card className="border-[var(--color-line)] p-3.5 sm:p-4 shadow-xs rounded-xl">
            <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
              <span className="font-semibold text-[11px] uppercase tracking-wider">Lease Standing</span>
              <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-[var(--color-ink)]">
              In Good Standing
            </div>
            <p className="text-[11px] text-[var(--color-slate)] mt-0.5 sm:mt-1">
              Contract renewal due July 2027
            </p>
          </Card>

          <Card className="border-[var(--color-line)] p-3.5 sm:p-4 shadow-xs rounded-xl">
            <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
              <span className="font-semibold text-[11px] uppercase tracking-wider">Maintenance Status</span>
              <Wrench className="w-4 h-4 text-[#00594C] shrink-0" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-[var(--color-ink)]">
              No Open Defects
            </div>
            <p className="text-[11px] text-[var(--color-slate)] mt-0.5 sm:mt-1">
              Water & electrical systems operational
            </p>
          </Card>

          <Card className="border-[var(--color-line)] p-3.5 sm:p-4 shadow-xs rounded-xl">
            <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
              <span className="font-semibold text-[11px] uppercase tracking-wider">Sub-City Depot Contact</span>
              <PhoneCall className="w-4 h-4 text-purple-600 shrink-0" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-[var(--color-ink)]">
              +251 11 551 8840
            </div>
            <p className="text-[11px] text-[var(--color-slate)] mt-0.5 sm:mt-1">
              Bole & Gerji Housing Emergency Line
            </p>
          </Card>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. BUILDING (PROPERTY) MANAGER OVERVIEW
  // ─────────────────────────────────────────────────────────────
  if (role === "property_manager") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Main Hero Banner - Matching Tenant's Royal Blue Gradient Theme */}
        <div className="bg-gradient-to-br from-[#00594C] to-[#003B32] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
            <Building2 className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Top row: Context & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 sm:pb-4">
              <div className="space-y-0.5">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                  <span className="truncate">Estate Management Desk • Municipal On-Site Depot</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                  Gerji & Bole Public Housing Estates (840 Units)
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="tracking-wide">Depots Active & Supervised</span>
                </span>
              </div>
            </div>

            {/* Middle row: Primary Metrics & Context Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-center">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-emerald-200">Supervised Housing Stock:</span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
                  840 Units
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <span>Occupancy: <strong>95.2%</strong></span>
                  <span>•</span>
                  <span>799 Active Tenancies</span>
                </div>
              </div>

              {/* Operations & Key Turnover Context Box */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-xs rounded-xl p-3 sm:p-4 border border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-200 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <span>Estate Operations & Turnover</span>
                  <span className="text-emerald-300 shrink-0">12 Residential Blocks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Vacant Units Ready</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">14 Units</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">Cleaned & keys verified</span>
                  </div>

                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Turnover / Repairs</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">6 Units</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">Contractor defects remediation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Primary Call-to-Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
              <p className="text-[11px] sm:text-xs text-emerald-100 max-w-lg leading-relaxed">
                Supervising 12 residential blocks, move-in key handover protocols, utility sub-meters, and common building plant infrastructure.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
                <Button
                  size="default"
                  onClick={() => onSelectTab("property_manager_desk")}
                  className="bg-white text-[#00594C] hover:bg-emerald-50 font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Building2 className="w-4 h-4 text-[#00594C] shrink-0" />
                  <span>Units & Handover Registry</span>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onSelectTab("property_manager_desk")}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-9 sm:h-10 px-3.5 sm:px-4 gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Key className="w-4 h-4 shrink-0" />
                  <span>Key Protocol Desk</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Macro Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Total Supervised</span>
            <div className="text-lg sm:text-2xl font-bold text-[var(--color-ink)] mt-0.5 sm:mt-1 truncate">840 Units</div>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium truncate block">12 Blocks</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Occupancy Rate</span>
            <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">95.2%</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">799 Active Tenancies</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Vacant Ready</span>
            <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">14 Units</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Cleaned & keys verified</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Turnover / Repairs</span>
            <div className="text-lg sm:text-2xl font-bold text-amber-700 dark:text-amber-400 mt-0.5 sm:mt-1 truncate">6 Units</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Contractors on-site</span>
          </Card>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 3. CITY MANAGEMENT (EXECUTIVE) OVERVIEW
  // ─────────────────────────────────────────────────────────────
  if (role === "executive") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Main Hero Banner - Matching Tenant's Royal Blue Gradient Theme */}
        <div className="bg-gradient-to-br from-[#00594C] to-[#003B32] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
            <Landmark className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Top row: Context & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 sm:pb-4">
              <div className="space-y-0.5">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                  <span className="truncate">Executive Municipal Housing Command Center</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                  City-Wide Rental Property Directorate (11 Sub-Cities)
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="tracking-wide">All 11 Sub-Cities Online</span>
                </span>
              </div>
            </div>

            {/* Middle row: Primary Metrics & Context Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-center">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-emerald-200">Total Administered Stock:</span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
                  72,400+ Units
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <span>Occupancy: <strong>98.1%</strong></span>
                  <span>•</span>
                  <span>Target Achieved</span>
                </div>
              </div>

              {/* City Revenue & Defect SLA Performance Context Box */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-xs rounded-xl p-3 sm:p-4 border border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-200 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <span>City Revenue & SLA Performance</span>
                  <span className="text-emerald-300 shrink-0">Municipal Cabinet KPI</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Monthly Collections</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">ETB 1.34 Billion</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">98.4% target met</span>
                  </div>

                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Average Defect SLA</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">2.4 Days</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">Target: &lt; 3.0 Days (Passed)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Primary Call-to-Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
              <p className="text-[11px] sm:text-xs text-emerald-100 max-w-lg leading-relaxed">
                Real-time oversight of 72,400+ public rental stock, ETB 1.34 Billion monthly collections, and sub-city maintenance SLA turnaround.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
                <Button
                  size="default"
                  onClick={() => onSelectTab("executive_desk")}
                  className="bg-white text-[#00594C] hover:bg-emerald-50 font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Scale className="w-4 h-4 text-[#00594C] shrink-0" />
                  <span>Sub-City Scorecards</span>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onSelectTab("executive_desk")}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-9 sm:h-10 px-3.5 sm:px-4 gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Cabinet Briefing</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Macro Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Total City Stock</span>
            <div className="text-lg sm:text-2xl font-bold text-[var(--color-ink)] mt-0.5 sm:mt-1 truncate">72,400+</div>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium truncate block">98.1% City Occupancy</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Monthly Collections</span>
            <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">ETB 1.34 B</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">98.4% target met</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Average Defect SLA</span>
            <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">2.4 Days</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Target: &lt; 3.0 Days</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Citizen Trust Rating</span>
            <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">93.2%</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Verified surveys</span>
          </Card>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 4. MAINTENANCE OFFICER OVERVIEW
  // ─────────────────────────────────────────────────────────────
  if (role === "maintenance_officer") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Main Hero Banner - Matching Tenant's Royal Blue Gradient Theme */}
        <div className="bg-gradient-to-br from-[#00594C] to-[#003B32] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
            <Truck className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Top row: Context & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 sm:pb-4">
              <div className="space-y-0.5">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                  <span className="truncate">Central Maintenance Depot & Rapid Dispatch Desk</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                  Active Defect Response & Fleet Operations
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="tracking-wide">18 Duty Crews Active</span>
                </span>
              </div>
            </div>

            {/* Middle row: Primary Metrics & Context Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-center">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-emerald-200">Active Work Orders:</span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
                  24 Orders
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <span>Avg Response: <strong>1.8 Hours</strong></span>
                  <span>•</span>
                  <span>Within Municipal SLA</span>
                </div>
              </div>

              {/* Depot Response & Fleet Status Context Box */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-xs rounded-xl p-3 sm:p-4 border border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-200 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <span>Depot Dispatch & Fleet Status</span>
                  <span className="text-emerald-300 shrink-0">11 Sub-City Depots</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Urgent Defects</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">3 Urgent</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">4-Hour SLA response targeted</span>
                  </div>

                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Duty Technicians</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">18 Crews</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">Plumbing, electrical & lifts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Primary Call-to-Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
              <p className="text-[11px] sm:text-xs text-emerald-100 max-w-lg leading-relaxed">
                Coordinating 18 municipal technician crews, emergency 4-hour SLA water/power responses, and spare parts inventory across 11 sub-city depots.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
                <Button
                  size="default"
                  onClick={() => onSelectTab("maintenance_desk")}
                  className="bg-white text-[#00594C] hover:bg-emerald-50 font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Wrench className="w-4 h-4 text-[#00594C] shrink-0" />
                  <span>Work Order Dispatch</span>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onSelectTab("maintenance_desk")}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-9 sm:h-10 px-3.5 sm:px-4 gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Package className="w-4 h-4 shrink-0" />
                  <span>Depot Inventory</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Macro Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Active Orders</span>
            <div className="text-lg sm:text-2xl font-bold text-[var(--color-ink)] mt-0.5 sm:mt-1 truncate">24 Orders</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Across 11 Sub-Cities</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Emergency Level</span>
            <div className="text-lg sm:text-2xl font-bold text-rose-700 dark:text-rose-400 mt-0.5 sm:mt-1 truncate">3 Urgent</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">4-Hour SLA response</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Duty Crews</span>
            <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">18 Crews</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Plumbing, Elec & Lifts</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Avg Response Time</span>
            <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">1.8 Hours</div>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium truncate block">Within Municipal SLA</span>
          </Card>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 5. SYSTEM ADMINISTRATOR OVERVIEW
  // ─────────────────────────────────────────────────────────────
  if (role === "admin") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Main Hero Banner - Matching Tenant's Royal Blue Gradient Theme */}
        <div className="bg-gradient-to-br from-[#00594C] to-[#003B32] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Top row: Context & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 sm:pb-4">
              <div className="space-y-0.5">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                  <span className="truncate">Addis Ababa Municipal Chief Administration</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                  Platform Security, Auditing & Access Directory
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="tracking-wide">All 11 Sub-City Nodes Synced</span>
                </span>
              </div>
            </div>

            {/* Middle row: Primary Metrics & Context Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-center">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-emerald-200">System Availability:</span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
                  99.98%
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <span>Sync Latency: <strong>18 ms</strong></span>
                  <span>•</span>
                  <span>Zero Packet Drops</span>
                </div>
              </div>

              {/* Security & Access Directory Context Box */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-xs rounded-xl p-3 sm:p-4 border border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-200 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <span>Platform Security & Governance</span>
                  <span className="text-emerald-300 shrink-0">Fayda SSO Synced</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Active Sessions</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">1,420 Active</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">Citizens & Municipal Staff</span>
                  </div>

                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Security Alerts</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">0 Active (Clean)</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">256-bit TLS Cryptography</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Primary Call-to-Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
              <p className="text-[11px] sm:text-xs text-emerald-100 max-w-lg leading-relaxed">
                Centralized RBAC governance, immutable cryptographic audit trail, Fayda SSO synchronization, and global municipal parameters.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
                <Button
                  size="default"
                  onClick={() => onSelectTab("admin_desk")}
                  className="bg-white text-[#00594C] hover:bg-emerald-50 font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Users className="w-4 h-4 text-[#00594C] shrink-0" />
                  <span>User Accounts & Roles</span>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onSelectTab("admin_desk")}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-9 sm:h-10 px-3.5 sm:px-4 gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Security Audit Log</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Macro Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">System Uptime</span>
            <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">99.98%</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">11 Sub-City Nodes</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Active Sessions</span>
            <div className="text-lg sm:text-2xl font-bold text-[var(--color-ink)] mt-0.5 sm:mt-1 truncate">1,420</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Citizens & Staff</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Sync Latency</span>
            <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">18 ms</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Zero packet drops</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Security Alerts</span>
            <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">0 Active</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">256-bit SSL</span>
          </Card>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 6. FINANCE & TENANCY OFFICER OVERVIEW
  // ─────────────────────────────────────────────────────────────
  if (role === "finance_officer" || role === "admin_officer") {
    const pendingSlips = paymentVerifications.filter(p => p.status === "pending_verification");
    const pendingAllocations = allocationApplications.filter(a => a.status === "under_review" || a.status === "submitted");

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Main Hero Banner - Matching Tenant's Royal Blue Gradient Theme */}
        <div className="bg-gradient-to-br from-[#00594C] to-[#003B32] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
            <ReceiptText className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-5">
            {/* Top row: Context & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 sm:pb-4">
              <div className="space-y-0.5">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                  <ReceiptText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                  <span className="truncate">Municipal Treasury & Revenue Clearance Directorate</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                  Bank Deposit Verification & Quota Allocation Desk
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="tracking-wide">Commercial Bank Portal Connected</span>
                </span>
              </div>
            </div>

            {/* Middle row: Primary Metrics & Context Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-center">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[11px] sm:text-xs text-emerald-200">Slips Pending Audit:</span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
                  {pendingSlips.length} Slips
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <span>Requires Commercial Bank CBE Reconciliation</span>
                </div>
              </div>

              {/* Treasury Clearing & Allocation Quotas Context Box */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-xs rounded-xl p-3 sm:p-4 border border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-200 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <span>Treasury Clearance & Quota Allocation</span>
                  <span className="text-emerald-300 shrink-0">11 Sub-Cities Active</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Quota Applications</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">{pendingAllocations.length} In Review</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">Civil service quota assessments</span>
                  </div>

                  <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-emerald-200 block truncate">Administered Stock</span>
                    <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">72,400 Units</strong>
                    <span className="text-[10px] text-emerald-200/80 block truncate">98.2% Active Tenancy Rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Primary Call-to-Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
              <p className="text-[11px] sm:text-xs text-emerald-100 max-w-lg leading-relaxed">
                Review submitted citizen deposit receipts against Commercial Bank of Ethiopia treasury records, reconcile revenue, and process tenancy quotas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
                <Button
                  size="default"
                  onClick={() => onSelectTab("ledger")}
                  className="bg-white text-[#00594C] hover:bg-emerald-50 font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  <FileCheck2 className="w-4 h-4 text-[#00594C] shrink-0" />
                  <span>Process Queue ({pendingSlips.length})</span>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => onSelectTab("allocations")}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-9 sm:h-10 px-3.5 sm:px-4 gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Review Quotas</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Slips to Verify</span>
            <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">{pendingSlips.length} Pending</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Bank reconciliation</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Allocation Queue</span>
            <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">{pendingAllocations.length} In Review</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Civil service quota</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Administered Stock</span>
            <div className="text-lg sm:text-2xl font-bold text-[var(--color-ink)] mt-0.5 sm:mt-1 truncate">72,400 Units</div>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium truncate block">98.2% Tenancy</span>
          </Card>
          <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
            <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Directives & Tariff</span>
            <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">Gazette 2026/03</div>
            <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Directive No. 44</span>
          </Card>
        </div>

        {/* Priority Pending Bank Slips Table Preview */}
        <Card className="shadow-xs border-[var(--color-line)] rounded-xl overflow-hidden">
          <CardHeader className="p-4 sm:p-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <CardTitle className="text-base font-bold text-[var(--color-ink)]">Pending Bank Deposit Slips Queue</CardTitle>
              <CardDescription className="text-xs text-[var(--color-slate)]">
                Review submitted citizen deposit receipts against Commercial Bank of Ethiopia treasury records.
              </CardDescription>
            </div>
            <Button
              size="sm"
              onClick={() => onSelectTab("ledger")}
              className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-8"
            >
              <span>Open Desk Queue ({pendingSlips.length})</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 pt-0 divide-y divide-[var(--color-line)]">
            {pendingSlips.map(slip => (
              <div key={slip.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-[var(--color-ink)]">{slip.residentName}</span>
                    <span className="text-[11px] font-mono text-[var(--color-slate)]">({slip.unitNumber})</span>
                    <Badge variant="pending" className="text-[10px] py-0.5">
                      Slip Review Required
                    </Badge>
                  </div>
                  <div className="text-[11px] text-[var(--color-slate)] mt-0.5">
                    {slip.bankName} • Slip #{slip.depositSlipNumber} • ETB {slip.amountEtb.toLocaleString()}
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => onSelectTab("ledger")}
                  className="text-xs h-7 bg-[#00594C] text-white self-start sm:self-auto"
                >
                  Verify & Clear
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 7. FIELD INSPECTOR OVERVIEW (Eng. Worku Mengesha)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Hero Banner - Matching Tenant's Royal Blue Gradient Theme */}
      <div className="bg-gradient-to-br from-[#00594C] to-[#003B32] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
          <ClipboardCheck className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 space-y-4 sm:space-y-5">
          {/* Top row: Context & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 sm:pb-4">
            <div className="space-y-0.5">
              <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                <ClipboardCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                <span className="truncate">Municipal Field Engineering & Safety Directorate</span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                Today's Field Checklist & Building Safety Audits
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span className="tracking-wide">Yeka & Kirkos Sub-City Active</span>
              </span>
            </div>
          </div>

          {/* Middle row: Primary Metrics & Context Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-center">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[11px] sm:text-xs text-emerald-200">Scheduled Inspections:</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
                {inspectionTasks.length} Surveys
              </div>
              <div className="text-[11px] sm:text-xs text-emerald-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                <span>Scheduled across Yeka & Kirkos Sub-Cities</span>
              </div>
            </div>

            {/* Field Logistics & Safety Code Context Box */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-xs rounded-xl p-3 sm:p-4 border border-white/15 space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-200 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
                <span>Field Logistics & Technical Standards</span>
                <span className="text-emerald-300 shrink-0">EBCS 2026 Certified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                  <span className="text-[10px] text-emerald-200 block truncate">Depot Work Orders</span>
                  <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">12 Work Orders</strong>
                  <span className="text-[10px] text-emerald-200/80 block truncate">Requires field supervisor sign-off</span>
                </div>

                <div className="bg-black/20 p-2 sm:p-2.5 rounded-lg border border-white/10">
                  <span className="text-[10px] text-emerald-200 block truncate">Building Safety Code</span>
                  <strong className="font-mono text-xs sm:text-sm tracking-wide break-all block mt-0.5">EBCS 2026</strong>
                  <span className="text-[10px] text-emerald-200/80 block truncate">Addis Ababa Safety Directives</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: Primary Call-to-Action Buttons */}
          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
            <p className="text-[11px] sm:text-xs text-emerald-100 max-w-lg leading-relaxed">
              Perform on-site defect surveys, verify structural and electrical installations against EBCS safety code, and certify handover protocols.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
              <Button
                size="default"
                onClick={() => onSelectTab("inspections_queue")}
                className="bg-white text-[#00594C] hover:bg-emerald-50 font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 gap-2 shadow-md cursor-pointer w-full sm:w-auto justify-center"
              >
                <ClipboardCheck className="w-4 h-4 text-[#00594C] shrink-0" />
                <span>Launch Field Inspections</span>
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => onSelectTab("technical_standards")}
                className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs h-9 sm:h-10 px-3.5 sm:px-4 gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Safety Standards</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
          <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Assigned Field Tasks</span>
          <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">{inspectionTasks.length} Inspections</div>
          <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Yeka & Kirkos Sub-Cities</span>
        </Card>

        <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
          <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Depot Work Orders</span>
          <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 sm:mt-1 truncate">12 Work Orders</div>
          <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Supervisor certification</span>
        </Card>

        <Card className="border-[var(--color-line)] p-3 sm:p-4 shadow-xs rounded-xl">
          <span className="text-[11px] sm:text-xs text-[var(--color-slate)] font-semibold uppercase">Building Safety Code</span>
          <div className="text-lg sm:text-2xl font-bold text-[#00594C] dark:text-[#00A38C] mt-0.5 sm:mt-1 truncate">EBCS 2026</div>
          <span className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate block">Municipal Directives</span>
        </Card>
      </div>

      {/* Field Inspection Schedule */}
      <Card className="shadow-xs border-[var(--color-line)] rounded-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <CardTitle className="text-base font-bold text-[var(--color-ink)]">Today's Field Inspection Schedule</CardTitle>
            <CardDescription className="text-xs text-[var(--color-slate)]">
              On-site physical defect verifications and pre-occupancy handover surveys.
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => onSelectTab("inspections_queue")}
            className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-8"
          >
            <span>Open Field Checklist</span>
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 pt-0 divide-y divide-[var(--color-line)]">
          {inspectionTasks.map(task => (
            <div key={task.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs text-[var(--color-ink)]">{task.buildingName}</span>
                  <span className="text-[11px] font-mono text-[var(--color-slate)]">({task.unitNumber})</span>
                  {task.priority === "Urgent" && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[10px] font-bold">
                      URGENT
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[var(--color-slate)] mt-0.5">
                  {task.inspectionType} • {task.locationDetails}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectTab("inspections_queue")}
                className="text-xs h-7 self-start sm:self-auto border-[var(--color-line)]"
              >
                Perform Inspection
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
