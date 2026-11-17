import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Building2, 
  ShieldCheck, 
  ReceiptText, 
  Wrench, 
  FileText, 
  User, 
  LayoutDashboard, 
  ClipboardCheck, 
  FileCheck2, 
  ArrowLeft, 
  ChevronRight, 
  LogOut, 
  UserCheck, 
  ChevronDown, 
  Scale, 
  BookOpen,
  Key,
  Truck,
  Landmark,
  Package,
  Layers,
  Sparkles
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardOverviewTab } from "../components/dashboard/DashboardOverviewTab";
import { DashboardLedgerTab } from "../components/dashboard/DashboardLedgerTab";
import { DashboardMaintenanceTab, MaintenanceTicket } from "../components/dashboard/DashboardMaintenanceTab";
import { DashboardDocumentsTab } from "../components/dashboard/DashboardDocumentsTab";
import { DashboardAccountTab } from "../components/dashboard/DashboardAccountTab";
import { DashboardAllocationsTab } from "../components/dashboard/DashboardAllocationsTab";
import { DashboardFieldInspectorTab } from "../components/dashboard/DashboardFieldInspectorTab";
import { OfficerDirectivesTab } from "../components/dashboard/OfficerDirectivesTab";
import { InspectorWorkOrdersTab } from "../components/dashboard/InspectorWorkOrdersTab";
import { InspectorTechnicalStandardsTab } from "../components/dashboard/InspectorTechnicalStandardsTab";
import { DashboardPropertyManagerTab } from "../components/dashboard/DashboardPropertyManagerTab";
import { DashboardExecutiveTab } from "../components/dashboard/DashboardExecutiveTab";
import { DashboardMaintenanceOfficerTab } from "../components/dashboard/DashboardMaintenanceOfficerTab";
import { DashboardAdminTab } from "../components/dashboard/DashboardAdminTab";
import { StaffApp } from "../components/staff/StaffApp";
import { ResidentApp } from "../components/resident/ResidentApp";
import { AuthFlowCard } from "../components/auth/AuthFlowCard";
import { Button } from "../components/ui/button";

export const PortalLoginPage: React.FC = () => {
  const { 
    isLoggedIn, 
    currentUser, 
    switchPersona, 
    logout, 
    setRoute, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState("overview");

  // Maintenance tickets state for resident view
  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>([
    {
      id: "MNT-2026-1048",
      category: "Plumbing & water pressure",
      description: "Main supply riser valve washer replacement on floor 3 service shaft.",
      reportedDate: "18 Aug 2026",
      depot: "Yeka Sub-City Depot (Team 2)",
      priority: "Standard",
      status: "in_progress",
      technician: "Eng. Worku Mengesha"
    },
    {
      id: "MNT-2026-0982",
      category: "Electrical & corridor lighting",
      description: "Timer sensor recalibration for 3rd floor west landing public fixtures.",
      reportedDate: "02 Aug 2026",
      depot: "Yeka Sub-City Depot (Electrical Div.)",
      priority: "Standard",
      status: "resolved",
      technician: "Tech. Solomon Bekele"
    }
  ]);
  const [maintDialogOpen, setMaintDialogOpen] = useState(false);

  const handleCreateTicket = (ticketData: Partial<MaintenanceTicket>) => {
    const newId = `MNT-2026-${Math.floor(1050 + Math.random() * 50)}`;
    const formattedDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const newTicket: MaintenanceTicket = {
      id: newId,
      category: ticketData.category || "Plumbing & water pressure",
      description: ticketData.description || "General defect inspection",
      reportedDate: formattedDate,
      depot: ticketData.depot || "Sub-City Central Depot (Team 2)",
      priority: ticketData.priority || "Standard",
      status: "pending",
      technician: "Municipal Depot Dispatch Desk"
    };

    setMaintenanceTickets(prev => [newTicket, ...prev]);
    showToast(`Municipal work order ${newId} logged and dispatched to depot.`, "success");
  };

  // ─────────────────────────────────────────────────────────────
  // 1. UNAUTHENTICATED STATE: Unified Municipal Portal & Login
  // ─────────────────────────────────────────────────────────────
  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full mx-auto space-y-4">
          
          {/* Public Return Navigation */}
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setRoute("home")}
              className="inline-flex items-center gap-1.5 text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
            <span className="text-[11px] font-mono text-[var(--color-slate)]">
              CBRPM v2.4 • Addis Ababa Housing System
            </span>
          </div>

          {/* Auth Flow Card (Sign In + Register) */}
          <AuthFlowCard onSuccessRedirect={() => setActiveTab("overview")} />

        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. AUTHENTICATED STATE: Dedicated Application Shell
  // ─────────────────────────────────────────────────────────────
  const role = currentUser.role;

  if (role === "resident") {
    return <ResidentApp tickets={maintenanceTickets} onCreateTicket={handleCreateTicket} />;
  }

  return (
    <StaffApp
      tickets={maintenanceTickets}
      onCreateTicket={handleCreateTicket}
      maintDialogOpen={maintDialogOpen}
      setMaintDialogOpen={setMaintDialogOpen}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex flex-col">
      
      {/* Application Top Bar with Clear Global Hierarchy */}
      <header className="bg-white dark:bg-[#121212] border-b border-[var(--color-line)] sticky top-0 z-30 px-2.5 sm:px-6 py-2 sm:py-2.5 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
          
          {/* Municipal Portal Brand */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 shrink">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00594C] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-[var(--color-ink)] leading-none truncate">
                <span className="sm:hidden">CBRPM</span>
                <span className="hidden sm:inline">CBRPM Municipal Portal</span>
              </div>
              <div className="text-[10px] text-[var(--color-slate)] hidden md:block truncate mt-0.5">
                City Administration of Addis Ababa
              </div>
            </div>
          </div>

          {/* Global Controls & 7-Role Persona Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Clean Persona Switcher Selector */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-[var(--color-subtle)] dark:bg-[#1A1A1A] p-0.5 sm:p-1 rounded-lg border border-[var(--color-line)] shrink min-w-0 max-w-[125px] xs:max-w-[160px] sm:max-w-none">
              <span className="text-[11px] font-semibold text-[var(--color-slate)] pl-1 hidden lg:inline shrink-0">
                Role:
              </span>
              <select
                value={role}
                onChange={(e) => {
                  switchPersona(e.target.value);
                  setActiveTab("overview");
                }}
                className="bg-transparent text-[11px] sm:text-xs font-semibold text-[var(--color-ink)] focus:outline-hidden cursor-pointer py-1 px-1 sm:px-1.5 w-full truncate"
                title="Switch persona to test role-specific dashboards"
              >
                <option value="resident">Tenant (Dr. Tewodros)</option>
                <option value="property_manager">Property Mgr (Martha Haile)</option>
                <option value="executive">City Exec (Sisay Tadesse)</option>
                <option value="finance_officer">Finance (Hanna Girma)</option>
                <option value="maintenance_officer">Maintenance (Yonas Alemu)</option>
                <option value="field_inspector">Inspector (Eng. Worku)</option>
                <option value="admin">System Admin (Solomon Desta)</option>
              </select>
            </div>

            {/* Back to Public Website */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRoute("home")}
              className="text-xs h-7 sm:h-8 px-2 sm:px-3 border-[var(--color-line)] text-[var(--color-slate)] hover:text-[var(--color-ink)] shrink-0"
              title="Back to Public Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:mr-1" />
              <span className="hidden md:inline">Public Site</span>
              <span className="hidden sm:inline md:hidden">Exit</span>
            </Button>

            {/* Sign Out */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                showToast("Signed out of portal session.", "info");
              }}
              className="text-xs h-7 sm:h-8 px-1.5 sm:px-2.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>

          </div>

        </div>
      </header>

      {/* Main Application Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 space-y-6">
        
        {/* User Identity & Immediate Action Panel */}
        <DashboardHeader
          onSelectTab={setActiveTab}
          onOpenDefectModal={() => setMaintDialogOpen(true)}
          onOpenDepositModal={() => setActiveTab("ledger")}
        />

        {/* Dynamic Navigation Tabs (Strictly Tailored to Role) */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          
          <div className="-mx-3 px-3 sm:mx-0 sm:px-0 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
            <TabsList className="bg-white dark:bg-[#121212] border border-[var(--color-line)] p-1 rounded-xl inline-flex min-w-max sm:min-w-0 sm:w-auto shadow-xs gap-1">
              
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Overview</span>
              </TabsTrigger>

              {/* 1. RESIDENT TENANT TABS */}
              {role === "resident" && (
                <>
                  <TabsTrigger 
                    value="ledger" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <ReceiptText className="w-3.5 h-3.5" />
                    <span>Rent & Deposit Slips</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="maintenance" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Defects & Depot Requests</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="documents" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tenancy Contract</span>
                  </TabsTrigger>
                </>
              )}

              {/* 2. BUILDING (PROPERTY) MANAGER TABS */}
              {role === "property_manager" && (
                <>
                  <TabsTrigger 
                    value="property_manager_desk" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Managed Units & Keys</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="maintenance" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Estate Repairs</span>
                  </TabsTrigger>
                </>
              )}

              {/* 3. CITY MANAGEMENT (EXECUTIVE) TABS */}
              {role === "executive" && (
                <>
                  <TabsTrigger 
                    value="executive_desk" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Sub-City Scorecards & Decrees</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="directives" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Directives & Circulars</span>
                  </TabsTrigger>
                </>
              )}

              {/* 4. FINANCE OFFICER TABS */}
              {(role === "finance_officer" || role === "admin_officer") && (
                <>
                  <TabsTrigger 
                    value="ledger" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <ReceiptText className="w-3.5 h-3.5" />
                    <span>Bank Slip Verification Desk</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="allocations" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Allocation Applications Desk</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="directives" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Directives & Circulars</span>
                  </TabsTrigger>
                </>
              )}

              {/* 5. MAINTENANCE OFFICER TABS */}
              {role === "maintenance_officer" && (
                <>
                  <TabsTrigger 
                    value="maintenance_desk" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Work Order Dispatch & Inventory</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="technical_standards" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Building Code Standards</span>
                  </TabsTrigger>
                </>
              )}

              {/* 6. FIELD INSPECTOR TABS (NO Bank Slips, NO Tenancy Documents) */}
              {role === "field_inspector" && (
                <>
                  <TabsTrigger 
                    value="inspections_queue" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Field Checklist</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="depot_orders" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Depot Work Orders</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="technical_standards" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Building Code & Standards</span>
                  </TabsTrigger>
                </>
              )}

              {/* 7. SYSTEM ADMINISTRATOR TABS */}
              {role === "admin" && (
                <>
                  <TabsTrigger 
                    value="admin_desk" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>User Accounts & Security Auditing</span>
                  </TabsTrigger>

                  <TabsTrigger 
                    value="directives" 
                    className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Municipal Directives</span>
                  </TabsTrigger>
                </>
              )}

              <TabsTrigger 
                value="account" 
                className="flex items-center gap-1.5 py-2 px-3 sm:px-3.5 text-xs font-semibold data-[state=active]:bg-[#00594C] data-[state=active]:text-white rounded-lg cursor-pointer shrink-0 min-h-[36px]"
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </TabsTrigger>

            </TabsList>
          </div>

          {/* TAB: Overview */}
          <TabsContent value="overview">
            <DashboardOverviewTab
              onSelectTab={setActiveTab}
              onOpenDefectModal={() => setMaintDialogOpen(true)}
              onOpenDepositModal={() => setActiveTab("ledger")}
            />
          </TabsContent>

          {/* TAB: Bank Slip Verification / Resident Payments */}
          <TabsContent value="ledger">
            <DashboardLedgerTab />
          </TabsContent>

          {/* TAB: Maintenance & Defect Tickets (Resident / Property Manager) */}
          <TabsContent value="maintenance">
            <DashboardMaintenanceTab
              tickets={maintenanceTickets}
              onCreateTicket={handleCreateTicket}
              maintDialogOpen={maintDialogOpen}
              setMaintDialogOpen={setMaintDialogOpen}
            />
          </TabsContent>

          {/* TAB: Building Property Manager Desk */}
          <TabsContent value="property_manager_desk">
            <DashboardPropertyManagerTab />
          </TabsContent>

          {/* TAB: City Management Executive Desk */}
          <TabsContent value="executive_desk">
            <DashboardExecutiveTab />
          </TabsContent>

          {/* TAB: Maintenance Officer Dispatch Desk */}
          <TabsContent value="maintenance_desk">
            <DashboardMaintenanceOfficerTab />
          </TabsContent>

          {/* TAB: System Admin Console */}
          <TabsContent value="admin_desk">
            <DashboardAdminTab />
          </TabsContent>

          {/* TAB: Allocation Applications (Finance Officer) */}
          <TabsContent value="allocations">
            <DashboardAllocationsTab />
          </TabsContent>

          {/* TAB: Directives & Circulars */}
          <TabsContent value="directives">
            <OfficerDirectivesTab />
          </TabsContent>

          {/* TAB: Field Inspection Checklist (Field Inspector) */}
          <TabsContent value="inspections_queue">
            <DashboardFieldInspectorTab />
          </TabsContent>

          {/* TAB: Depot Work Orders (Field Inspector) */}
          <TabsContent value="depot_orders">
            <InspectorWorkOrdersTab />
          </TabsContent>

          {/* TAB: Technical Standards (Field Inspector / Maintenance) */}
          <TabsContent value="technical_standards">
            <InspectorTechnicalStandardsTab />
          </TabsContent>

          {/* TAB: Tenancy Documents (Resident) */}
          <TabsContent value="documents">
            <DashboardDocumentsTab />
          </TabsContent>

          {/* TAB: Account Profile */}
          <TabsContent value="account">
            <DashboardAccountTab />
          </TabsContent>

        </Tabs>

      </main>

    </div>
  );
};
