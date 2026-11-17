import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  User, 
  Smartphone, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  HelpCircle,
  FileCheck,
  UserPlus,
  LogIn,
  Landmark,
  Wrench,
  Truck,
  ReceiptText,
  ClipboardCheck,
  Users
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription 
} from "../ui/dialog";
import { UserRole } from "../../types";
import { DEMO_PROFILES } from "../../data/mockData";

interface AuthFlowCardProps {
  onSuccessRedirect?: () => void;
}

export const AuthFlowCard: React.FC<AuthFlowCardProps> = ({ onSuccessRedirect }) => {
  const { login, switchPersona, registerUser, showToast } = useApp();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [selectedRole, setSelectedRole] = useState<UserRole>("resident");
  
  // Sign In Form State
  const [identifier, setIdentifier] = useState("FAYDA-ETH-99201482");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign Up Form State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("+251 9");
  const [signupFayda, setSignupFayda] = useState("");
  const [signupSubCity, setSignupSubCity] = useState("Bole Sub-City");
  const [signupMinistry, setSignupMinistry] = useState("Civil Service");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState<UserRole>("resident");
  const [signupAgreed, setSignupAgreed] = useState(false);

  // Forgot PIN Modal
  const [forgotPinOpen, setForgotPinOpen] = useState(false);
  const [recoveryFayda, setRecoveryFayda] = useState("");

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      login({ id: identifier, password, role: selectedRole });
      if (onSuccessRedirect) onSuccessRedirect();
    }, 400);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupFayda || !signupPhone) {
      showToast("Please provide your full legal name, Fayda ID, and phone number.", "error");
      return;
    }
    if (!signupAgreed) {
      showToast("Please agree to the municipal tenancy regulations.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      registerUser({
        name: signupName,
        email: signupEmail || `${signupName.toLowerCase().replace(/\s+/g, ".")}@addisproperty.gov.et`,
        phone: signupPhone,
        faydaId: signupFayda.toUpperCase().startsWith("FAYDA") ? signupFayda.toUpperCase() : `FAYDA-ETH-${signupFayda}`,
        subCity: signupSubCity,
        ministryOrEmployer: signupMinistry,
        role: signupRole,
        category: signupRole === "resident" ? "Public Citizen / Civil Servant" : "Municipal Staff",
        unit: signupRole === "resident" ? "Bole Bulbula Block 12, Unit 304" : "Municipal Administrative Desk",
        residenceName: signupRole === "resident" ? "Bole Bulbula Scheme 03" : "City Administration HQ",
        monthlyRentEtb: signupRole === "resident" ? 14800 : 0
      });
      if (onSuccessRedirect) onSuccessRedirect();
    }, 600);
  };

  const handleQuickPersonaSelect = (roleKey: string) => {
    switchPersona(roleKey);
    if (onSuccessRedirect) onSuccessRedirect();
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      
      {/* Main Government Form Container */}
      <Card className="border-[var(--color-line)] shadow-lg bg-white dark:bg-[#121212] overflow-hidden">
        
        {/* Top Header & Municipal Seal Banner */}
        <div className="bg-[#00594C] text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200 block">
                  Addis Ababa City Administration
                </span>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Building & Rental Property Portal
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Fayda SSO 2.0</span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-black/20 rounded-xl border border-white/15 relative z-10">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === "signin"
                  ? "bg-white text-[#00594C] shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-[#00594C] shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Account</span>
            </button>
          </div>
        </div>

        <CardContent className="p-5 sm:p-6 space-y-5">
          
          {/* ─────────────────────────────────────────────────────────────
              TAB 1: SIGN IN
              ───────────────────────────────────────────────────────────── */}
          {mode === "signin" ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              
              {/* Portal Role Tier Selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[var(--color-ink)] flex items-center justify-between">
                  <span>Portal Access Category</span>
                  <span className="text-[11px] text-[var(--color-slate)] font-normal">Select your portal tier</span>
                </Label>
                
                <select
                  value={selectedRole}
                  onChange={(e) => {
                    const r = e.target.value as UserRole;
                    setSelectedRole(r);
                    // Update default dummy identifier to match role
                    if (r === "resident") setIdentifier("FAYDA-ETH-99201482");
                    else if (r === "property_manager") setIdentifier("AACA-MGR-8841");
                    else if (r === "executive") setIdentifier("AACA-EXEC-001");
                    else if (r === "finance_officer") setIdentifier("AACA-FIN-408");
                    else if (r === "maintenance_officer") setIdentifier("AACA-MNT-720");
                    else if (r === "field_inspector") setIdentifier("AACA-INS-294");
                    else if (r === "admin") setIdentifier("AACA-ROOT-001");
                  }}
                  className="w-full h-10 px-3 text-xs bg-slate-50 dark:bg-[#121212] border border-[var(--color-line)] rounded-xl font-semibold text-[var(--color-ink)] focus:outline-hidden focus:ring-2 focus:ring-[#00594C]"
                >
                  <option value="resident">Public Citizen / Civil Servant Tenant</option>
                  <option value="property_manager">Building (Property) Manager</option>
                  <option value="executive">City Management (Executive Cabinet)</option>
                  <option value="finance_officer">Finance & Tenancy Officer</option>
                  <option value="maintenance_officer">Maintenance Dispatch Officer</option>
                  <option value="field_inspector">Field Building Inspector</option>
                  <option value="admin">Chief System Administrator</option>
                </select>
              </div>

              {/* Identifier Input */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[var(--color-ink)] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00594C]" />
                  <span>National Fayda ID / Staff Identification</span>
                </Label>
                <Input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. FAYDA-ETH-99201482 or AACA-STF-XXXX"
                  className="h-10 text-xs font-mono bg-slate-50 dark:bg-[#121212]"
                />
              </div>

              {/* Password / PIN Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-[var(--color-ink)] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#00594C]" />
                    <span>Password / Security PIN</span>
                  </Label>
                  <button
                    type="button"
                    onClick={() => setForgotPinOpen(true)}
                    className="text-[11px] text-[#00594C] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 text-xs pr-10 bg-slate-50 dark:bg-[#121212]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)] hover:text-[var(--color-ink)] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authenticating with Fayda Cryptography...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to {selectedRole.replace(/_/g, " ").toUpperCase()} Portal</span>
                  </span>
                )}
              </Button>

            </form>
          ) : (
            
            /* ─────────────────────────────────────────────────────────────
               TAB 2: REGISTER (NEW ACCOUNT)
               ───────────────────────────────────────────────────────────── */
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[var(--color-ink)]">
                  Account Type & Portal Target
                </Label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 dark:bg-[#121212] border border-[var(--color-line)] rounded-xl font-semibold text-[var(--color-ink)]"
                >
                  <option value="resident">Public Citizen Tenant / Civil Servant</option>
                  <option value="property_manager">Building (Property) Manager</option>
                  <option value="finance_officer">Finance & Tenancy Officer</option>
                  <option value="maintenance_officer">Maintenance Officer</option>
                  <option value="field_inspector">Field Building Inspector</option>
                  <option value="executive">City Management Executive</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-[var(--color-ink)]">
                    Full Legal Name
                  </Label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Almaz Bekele Haile"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="h-9 text-xs bg-slate-50 dark:bg-[#121212]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-[var(--color-ink)]">
                    National Fayda ID
                  </Label>
                  <Input
                    type="text"
                    required
                    placeholder="FAYDA-ETH-XXXXXXXX"
                    value={signupFayda}
                    onChange={(e) => setSignupFayda(e.target.value)}
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-[#121212]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-[var(--color-ink)]">
                    Mobile Phone (+251)
                  </Label>
                  <Input
                    type="tel"
                    required
                    placeholder="+251 91 234 5678"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="h-9 text-xs bg-slate-50 dark:bg-[#121212]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-[var(--color-ink)]">
                    Sub-City Jurisdiction
                  </Label>
                  <select
                    value={signupSubCity}
                    onChange={(e) => setSignupSubCity(e.target.value)}
                    className="w-full h-9 px-2.5 text-xs bg-slate-50 dark:bg-[#121212] border border-[var(--color-line)] rounded-lg font-medium text-[var(--color-ink)]"
                  >
                    <option value="Bole Sub-City">Bole Sub-City</option>
                    <option value="Yeka Sub-City">Yeka Sub-City</option>
                    <option value="Kirkos Sub-City">Kirkos Sub-City</option>
                    <option value="Arada Sub-City">Arada Sub-City</option>
                    <option value="Lideta Sub-City">Lideta Sub-City</option>
                    <option value="Nifas Silk-Lafto Sub-City">Nifas Silk-Lafto Sub-City</option>
                    <option value="Akaky Kaliti Sub-City">Akaky Kaliti Sub-City</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[var(--color-ink)]">
                  Ministry, Public Office, or Commercial Employer
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. Ministry of Health, Commercial Bank of Ethiopia, Civil Service"
                  value={signupMinistry}
                  onChange={(e) => setSignupMinistry(e.target.value)}
                  className="h-9 text-xs bg-slate-50 dark:bg-[#121212]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[var(--color-ink)]">
                  Create Secret Password
                </Label>
                <Input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="h-9 text-xs bg-slate-50 dark:bg-[#121212]"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="signupAgree"
                  required
                  checked={signupAgreed}
                  onChange={(e) => setSignupAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-[var(--color-line)] text-[#00594C] focus:ring-[#00594C]"
                />
                <label htmlFor="signupAgree" className="text-[11px] text-[var(--color-slate)] leading-tight cursor-pointer">
                  I solemnly declare that the Fayda identification and tenancy documents provided are authentic under Addis Ababa Housing Directive No. 44/2026.
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Registering with Addis Ababa Municipal Registry...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    <span>Complete Registration & Open Portal</span>
                  </span>
                )}
              </Button>

            </form>
          )}

          {/* ─────────────────────────────────────────────────────────────
              INSTANT DEMO PERSONA SELECTOR (One-Click Testing for All 7 Portals)
              ───────────────────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-[var(--color-line)] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-slate)] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Instant Demo Persona Access (7 Roles)</span>
              </span>
              <span className="text-[10px] text-[var(--color-slate)]">One-click sign in</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
              
              {/* 1. Tenant */}
              <button
                type="button"
                onClick={() => handleQuickPersonaSelect("resident")}
                className="p-2 rounded-lg border border-[var(--color-line)] bg-slate-50 dark:bg-[#1A1A1A]/60 hover:bg-[#E8F5F1] dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-[var(--color-ink)] group-hover:text-[#00594C] truncate">
                  Dr. Tewodros
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold truncate">Citizen Tenant</div>
              </button>

              {/* 2. Property Manager */}
              <button
                type="button"
                onClick={() => handleQuickPersonaSelect("property_manager")}
                className="p-2 rounded-lg border border-[var(--color-line)] bg-slate-50 dark:bg-[#1A1A1A]/60 hover:bg-[#E8F5F1] dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-[var(--color-ink)] group-hover:text-[#00594C] truncate">
                  Martha Haile
                </div>
                <div className="text-[10px] text-[#00594C] font-semibold truncate">Property Manager</div>
              </button>

              {/* 3. Executive */}
              <button
                type="button"
                onClick={() => handleQuickPersonaSelect("executive")}
                className="p-2 rounded-lg border border-[var(--color-line)] bg-slate-50 dark:bg-[#1A1A1A]/60 hover:bg-[#E8F5F1] dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-[var(--color-ink)] group-hover:text-[#00594C] truncate">
                  Sisay Tadesse
                </div>
                <div className="text-[10px] text-purple-600 font-semibold truncate">City Executive</div>
              </button>

              {/* 4. Finance Officer */}
              <button
                type="button"
                onClick={() => handleQuickPersonaSelect("finance_officer")}
                className="p-2 rounded-lg border border-[var(--color-line)] bg-slate-50 dark:bg-[#1A1A1A]/60 hover:bg-[#E8F5F1] dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-[var(--color-ink)] group-hover:text-[#00594C] truncate">
                  Hanna Girma
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold truncate">Finance Officer</div>
              </button>

              {/* 5. Maintenance Officer */}
              <button
                type="button"
                onClick={() => handleQuickPersonaSelect("maintenance_officer")}
                className="p-2 rounded-lg border border-[var(--color-line)] bg-slate-50 dark:bg-[#1A1A1A]/60 hover:bg-[#E8F5F1] dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-[var(--color-ink)] group-hover:text-[#00594C] truncate">
                  Yonas Alemu
                </div>
                <div className="text-[10px] text-amber-600 font-semibold truncate">Maintenance Lead</div>
              </button>

              {/* 6. Field Inspector */}
              <button
                type="button"
                onClick={() => handleQuickPersonaSelect("field_inspector")}
                className="p-2 rounded-lg border border-[var(--color-line)] bg-slate-50 dark:bg-[#1A1A1A]/60 hover:bg-[#E8F5F1] dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-[var(--color-ink)] group-hover:text-[#00594C] truncate">
                  Eng. Worku
                </div>
                <div className="text-[10px] text-cyan-600 font-semibold truncate">Field Inspector</div>
              </button>

              {/* 7. System Admin */}
              <button
                type="button"
                onClick={() => handleQuickPersonaSelect("admin")}
                className="p-2 rounded-lg border border-[var(--color-line)] bg-slate-50 dark:bg-[#1A1A1A]/60 hover:bg-[#E8F5F1] dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer group col-span-2 sm:col-span-1"
              >
                <div className="text-[11px] font-bold text-[var(--color-ink)] group-hover:text-[#00594C] truncate">
                  Solomon Desta
                </div>
                <div className="text-[10px] text-rose-600 font-semibold truncate">System Admin</div>
              </button>

            </div>
          </div>

        </CardContent>
      </Card>

      {/* Forgot PIN Modal */}
      <Dialog open={forgotPinOpen} onOpenChange={setForgotPinOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Portal Password</DialogTitle>
            <DialogDescription>
              Enter your National Fayda ID to receive a secure recovery code via official SMS gateway.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <Label className="text-xs font-semibold">National Fayda ID Number</Label>
            <Input
              type="text"
              placeholder="FAYDA-ETH-XXXXXXXX"
              value={recoveryFayda}
              onChange={(e) => setRecoveryFayda(e.target.value)}
              className="font-mono text-xs"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setForgotPinOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                showToast(`Cryptographic reset token dispatched to mobile registered with ${recoveryFayda || "your Fayda ID"}.`, "success");
                setForgotPinOpen(false);
              }}
              className="bg-[#00594C] text-white text-xs"
            >
              Send Recovery SMS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};
