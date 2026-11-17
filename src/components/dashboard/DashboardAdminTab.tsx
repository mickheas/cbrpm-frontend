import React, { useState } from "react";
import { 
  ShieldCheck, 
  Users, 
  Server, 
  Key, 
  Lock, 
  Activity, 
  Search, 
  UserPlus, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sliders, 
  RefreshCw,
  Eye,
  Settings,
  Database
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { MOCK_ADMIN_USERS, MOCK_AUDIT_LOGS } from "../../data/mockData";
import { AdminUserAccount, SystemAuditLogEntry, UserRole } from "../../types";
import { useApp } from "../../context/AppContext";

export const DashboardAdminTab: React.FC = () => {
  const { showToast } = useApp();
  const [users, setUsers] = useState<AdminUserAccount[]>(MOCK_ADMIN_USERS);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [searchUser, setSearchUser] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Create User Modal State
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("finance_officer");
  const [newUserDept, setNewUserDept] = useState("Kirkos Sub-City Depot Desk");

  // System Config State
  const [rentCap, setRentCap] = useState("5.0");
  const [emergencySla, setEmergencySla] = useState("4");
  const [routineSla, setRoutineSla] = useState("48");
  const [faydaEnforced, setFaydaEnforced] = useState(true);

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "active" ? "suspended" : "active";
        showToast(`User ${u.name} account status changed to: ${nextStatus.toUpperCase()}.`, "info");
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newAccount: AdminUserAccount = {
      id: `USR-00${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      phone: "+251 91 000 1234",
      role: newUserRole,
      faydaId: `FAYDA-GOV-${Math.floor(1000000 + Math.random() * 9000000)}`,
      staffId: `AACA-${newUserRole.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      department: newUserDept,
      subCityOrSite: "Central Administration HQ",
      status: "active",
      lastLogin: "Never (New Account)",
      twoFactorActive: true
    };

    setUsers([newAccount, ...users]);
    setCreateUserOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    showToast(`Municipal staff account created for ${newAccount.name} (${newAccount.role}).`, "success");
  };

  const handleSaveConfig = () => {
    showToast("Global municipal portal parameters updated and saved across all sub-cities.", "success");
  };

  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesSearch = 
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.faydaId.toLowerCase().includes(searchUser.toLowerCase()) ||
      (u.staffId && u.staffId.toLowerCase().includes(searchUser.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* System Administrator Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">System Core Status</span>
            <Server className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            99.98%
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            All 11 Sub-City Nodes Online
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Active Portal Sessions</span>
            <Users className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[var(--color-ink)]">
            1,420
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Tenants, Managers & Officers
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Database Latency</span>
            <Database className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[#00473D] dark:text-[#00A38C]">
            18 ms
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Cloud Run & In-Memory Cache
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Security Incidents</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            0 Alerts
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Fayda 2FA & SSL Enforced
          </div>
        </Card>
      </div>

      {/* User Accounts & RBAC Directory */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00594C]" />
                <span>Municipal User Accounts & RBAC Role Management</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Manage accounts across all 7 portal tiers: Resident, Property Manager, Executive, Finance Officer, Maintenance Officer, Field Inspector, and Admin.
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[160px]">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
                <Input
                  type="text"
                  placeholder="Search user, staff ID, or Fayda..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="pl-8 h-8 text-xs bg-slate-50 dark:bg-[#121212]"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-lg font-medium text-[var(--color-ink)]"
              >
                <option value="all">All Roles</option>
                <option value="resident">Resident Citizen</option>
                <option value="property_manager">Property Manager</option>
                <option value="executive">City Executive</option>
                <option value="finance_officer">Finance Officer</option>
                <option value="maintenance_officer">Maintenance Officer</option>
                <option value="field_inspector">Field Inspector</option>
                <option value="admin">System Admin</option>
              </select>

              <Button
                size="sm"
                onClick={() => setCreateUserOpen(true)}
                className="h-8 text-xs bg-[#00594C] hover:bg-[#003B32] text-white"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1" />
                <span>Add Staff User</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#121212]/60 border-b border-[var(--color-line)] text-[var(--color-slate)] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Name / Contact</th>
                  <th className="py-3 px-3">Role & Privilege</th>
                  <th className="py-3 px-3">Fayda National ID</th>
                  <th className="py-3 px-3">Sub-City / Site</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Last Active</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--color-ink)]">
                      <div>{user.name}</div>
                      <div className="text-[11px] font-normal text-[var(--color-slate)]">{user.email}</div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-xs font-medium text-[var(--color-ink)] capitalize">
                        {user.role.replace(/_/g, " ")}
                      </span>
                      {user.staffId && (
                        <div className="text-[10px] font-mono text-[var(--color-slate)] mt-0.5">{user.staffId}</div>
                      )}
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-[var(--color-slate)]">
                      {user.faydaId}
                    </td>

                    <td className="py-3 px-3 text-[var(--color-slate)]">
                      <div>{user.subCityOrSite}</div>
                      <div className="text-[10px]">{user.department}</div>
                    </td>

                    <td className="py-3 px-3">
                      {user.status === "active" ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="text-rose-700 dark:text-rose-400 font-semibold text-xs">
                          Suspended
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-[var(--color-slate)]">
                      {user.lastLogin}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`h-7 text-[11px] px-2 ${
                            user.status === "active" 
                              ? "text-rose-600 hover:text-rose-700 border-rose-200" 
                              : "text-emerald-600 hover:text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {user.status === "active" ? "Suspend" : "Activate"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cryptographic Tamper-Evident Audit Trail */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#00594C]" />
            <span>Immutable Municipal Security & Audit Logs</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Cryptographically sealed activity trail of authentication events, financial clearance approvals, and executive decrees.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-line)]">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[var(--color-slate)]">{log.id}</span>
                    <span 
                      className={`text-[11px] font-semibold ${
                        log.severity === "critical"
                          ? "text-rose-700 dark:text-rose-400"
                          : log.severity === "warning"
                          ? "text-amber-700 dark:text-amber-400"
                          : "text-[#00473D] dark:text-[#00A38C]"
                      }`}
                    >
                      {log.eventType}
                    </span>
                    <span className="text-[11px] text-[var(--color-slate)]">• {log.subCity}</span>
                  </div>
                  <div className="text-[var(--color-ink)] font-medium">
                    {log.details}
                  </div>
                  <div className="text-[11px] text-[var(--color-slate)] flex items-center gap-3">
                    <span>By: <strong className="text-[var(--color-ink)]">{log.performedBy}</strong></span>
                    <span>IP: {log.ipAddress}</span>
                    <span>Time: {log.timestamp}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="font-mono text-[10px] text-[var(--color-slate)] bg-slate-100 dark:bg-[#1A1A1A] py-1 px-2 rounded border border-[var(--color-line)]">
                    SHA256: {log.signatureHash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global System Settings */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00594C]" />
            <span>Global System Policies & Municipal Parameters</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Configure statutory escalation ceilings, maintenance dispatch SLA thresholds, and digital gateway parameters.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-ink)]">
                Annual Rent Escalation Cap (%)
              </label>
              <Input
                type="number"
                value={rentCap}
                onChange={(e) => setRentCap(e.target.value)}
                className="h-9 text-xs"
              />
              <span className="text-[10px] text-[var(--color-slate)]">Directive 44 statutory limit</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-ink)]">
                Emergency Defect SLA (Hours)
              </label>
              <Input
                type="number"
                value={emergencySla}
                onChange={(e) => setEmergencySla(e.target.value)}
                className="h-9 text-xs"
              />
              <span className="text-[10px] text-[var(--color-slate)]">Water bursts & elevator traps</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-ink)]">
                Routine Maintenance SLA (Hours)
              </label>
              <Input
                type="number"
                value={routineSla}
                onChange={(e) => setRoutineSla(e.target.value)}
                className="h-9 text-xs"
              />
              <span className="text-[10px] text-[var(--color-slate)]">General fixture maintenance</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-line)]">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="faydaEnforce"
                checked={faydaEnforced}
                onChange={(e) => setFaydaEnforced(e.target.checked)}
                className="rounded border-[var(--color-line)] text-[#00594C] focus:ring-[#00594C]"
              />
              <label htmlFor="faydaEnforce" className="text-xs font-medium text-[var(--color-ink)] cursor-pointer">
                Strict National Fayda e-ID Verification Enforced for All Staff Portals
              </label>
            </div>

            <Button
              size="sm"
              onClick={handleSaveConfig}
              className="bg-[#00594C] hover:bg-[#003B32] text-white text-xs h-8 px-4"
            >
              Save Parameters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Provision Municipal Staff User</DialogTitle>
            <DialogDescription>
              Assign role, department, and sub-city portal access for a municipal employee.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateUserSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-ink)]">Full Name</label>
              <Input
                type="text"
                required
                placeholder="e.g. Ato Daniel Bekele"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-ink)]">Official Work Email</label>
              <Input
                type="email"
                required
                placeholder="daniel.bekele@addisproperty.gov.et"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--color-ink)]">Role Tier</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full h-9 px-2.5 text-xs bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-lg font-medium text-[var(--color-ink)]"
                >
                  <option value="property_manager">Property Manager</option>
                  <option value="executive">City Executive</option>
                  <option value="finance_officer">Finance Officer</option>
                  <option value="maintenance_officer">Maintenance Officer</option>
                  <option value="field_inspector">Field Inspector</option>
                  <option value="admin">System Admin</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--color-ink)]">Department / Depot</label>
                <Input
                  type="text"
                  value={newUserDept}
                  onChange={(e) => setNewUserDept(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCreateUserOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-[#00594C] hover:bg-[#003B32] text-white text-xs"
              >
                Provision Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};
