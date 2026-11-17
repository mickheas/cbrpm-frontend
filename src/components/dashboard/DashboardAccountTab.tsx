import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  Key, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Smartphone,
  History,
  Fingerprint
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export const DashboardAccountTab: React.FC = () => {
  const { currentUser, updateUserProfile, showToast } = useApp();

  if (!currentUser) return null;

  // Local form state
  const [name, setName] = useState(currentUser.name || "");
  const [nameAm, setNameAm] = useState(currentUser.nameAm || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [employer, setEmployer] = useState(currentUser.ministryOrEmployer || "");
  const [emergencyName, setEmergencyName] = useState(currentUser.emergencyContact?.name || "Dr. Aster Mekonnen");
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser.emergencyContact?.phone || "+251 91 234 5678");
  const [emergencyRelation, setEmergencyRelation] = useState(currentUser.emergencyContact?.relation || "Spouse");

  // Security toggles
  const [twoFactor, setTwoFactor] = useState(currentUser.twoFactorEnabled ?? true);
  const [notifications, setNotifications] = useState(currentUser.notificationsEnabled ?? true);
  const [smsBilling, setSmsBilling] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  // Password fields
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      nameAm,
      email,
      phone,
      ministryOrEmployer: employer,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relation: emergencyRelation,
      },
      twoFactorEnabled: twoFactor,
      notificationsEnabled: notifications,
    });
  };

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      showToast("Security PIN must be at least 4 digits.", "error");
      return;
    }
    if (newPin !== confirmPin) {
      showToast("New PINs do not match. Please re-enter.", "error");
      return;
    }
    showToast("Portal Security PIN successfully updated and encrypted.", "success");
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
  };

  const userInitials = currentUser.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      
      {/* 1. Account & Identity Hero Banner */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-[#00594C]/15" status="online">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="text-base font-bold bg-[#E8F5F1] dark:bg-[#03241E] text-[#00594C] dark:text-[#00A38C]">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[var(--color-ink)]">
                    {currentUser.name}
                  </h2>
                  <Badge variant="approved">Identity Verified</Badge>
                </div>
                <div className="text-xs text-[var(--color-slate)] flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00594C] dark:text-[#00A38C]" />
                    <strong className="font-mono-num">{currentUser.faydaId || "FAYDA-ETH-9941208"}</strong>
                  </span>
                  <span>•</span>
                  <span>Citizen Category: <strong>{currentUser.category}</strong></span>
                  <span>•</span>
                  <span>Member Since: {currentUser.joinedDate || "Sep 2024"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-num px-3 py-1.5 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] text-[var(--color-slate)]">
                Tenant #{currentUser.tenantId}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Bento Grid: Profile Form & Security Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Personal & Civil Service Details */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal & Employment Information</CardTitle>
              <CardDescription>
                Synchronized with the Addis Ababa City Civil Service & National Fayda Registry.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="fullname-en">Full Legal Name (Latin / English)</Label>
                    <Input
                      id="fullname-en"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="fullname-am">የሙሉ ስም (Amharic)</Label>
                    <Input
                      id="fullname-am"
                      value={nameAm}
                      onChange={(e) => setNameAm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="email-input">Official Email Address</Label>
                    <Input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone-input">Primary Mobile Phone</Label>
                    <Input
                      id="phone-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="employer-input">Public Employer / Ministry / Organization</Label>
                  <Input
                    id="employer-input"
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                  />
                  <p className="text-[11px] text-[var(--color-slate)]">
                    Used for housing allowance verification under federal and regional civil service frameworks.
                  </p>
                </div>

                <Separator />

                {/* Emergency Contact Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                    Emergency Contact in Addis Ababa
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="em-name">Contact Person</Label>
                      <Input
                        id="em-name"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="em-phone">Contact Phone</Label>
                      <Input
                        id="em-phone"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="em-rel">Relationship</Label>
                      <Input
                        id="em-rel"
                        value={emergencyRelation}
                        onChange={(e) => setEmergencyRelation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit">
                    <Save className="w-3.5 h-3.5 mr-1" />
                    <span>Save Profile Changes</span>
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>

          {/* Security PIN Change Card */}
          <Card>
            <CardHeader>
              <CardTitle>Change Portal Access PIN / Password</CardTitle>
              <CardDescription>
                Secure credentials used for quick mobile and biometric authentication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePinUpdate} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="curr-pin">Current PIN</Label>
                    <Input
                      id="curr-pin"
                      type="password"
                      maxLength={6}
                      placeholder="••••"
                      value={currentPin}
                      onChange={(e) => setCurrentPin(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-pin">New 4-6 Digit PIN</Label>
                    <Input
                      id="new-pin"
                      type="password"
                      maxLength={6}
                      placeholder="••••"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="conf-pin">Confirm New PIN</Label>
                    <Input
                      id="conf-pin"
                      type="password"
                      maxLength={6}
                      placeholder="••••"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <Button type="submit" variant="outline" size="sm">
                    <Lock className="w-3.5 h-3.5 mr-1" />
                    <span>Update Security PIN</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Columns: Security, 2FA, Preferences, and Audit Log */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Security & 2FA Toggles */}
          <Card>
            <CardHeader>
              <CardTitle>Security & Preferences</CardTitle>
              <CardDescription>
                Configure authentication factors and real-time municipal alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between space-x-3 p-3 rounded-md bg-[var(--color-base)] border border-[var(--color-line)]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00594C] dark:text-[#00A38C]" />
                    <span>National Fayda 2FA OTP</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-slate)]">
                    Require a 6-digit SMS OTP to registered mobile upon login.
                  </p>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={(val) => {
                    setTwoFactor(val);
                    showToast(`Two-factor authentication ${val ? "enabled" : "disabled"}.`, "info");
                  }}
                />
              </div>

              {/* Biometrics Toggle */}
              <div className="flex items-center justify-between space-x-3 p-3 rounded-md bg-[var(--color-base)] border border-[var(--color-line)]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-[#1B7A4A]" />
                    <span>Biometric Device Fast-Pass</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-slate)]">
                    Allow device fingerprint / Face ID for session sign-in.
                  </p>
                </div>
                <Switch
                  checked={biometrics}
                  onCheckedChange={(val) => {
                    setBiometrics(val);
                    showToast(`Biometric authentication ${val ? "enabled" : "disabled"}.`, "info");
                  }}
                />
              </div>

              {/* SMS Rent Reminders */}
              <div className="flex items-center justify-between space-x-3 p-3 rounded-md bg-[var(--color-base)] border border-[var(--color-line)]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#A6690B]" />
                    <span>Monthly SMS Rent Alerts</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-slate)]">
                    Dispatched 3 days prior to the 5th of each month.
                  </p>
                </div>
                <Switch
                  checked={smsBilling}
                  onCheckedChange={(val) => {
                    setSmsBilling(val);
                    showToast(`SMS billing reminders ${val ? "active" : "muted"}.`, "info");
                  }}
                />
              </div>

              {/* Maintenance Notifications */}
              <div className="flex items-center justify-between space-x-3 p-3 rounded-md bg-[var(--color-base)] border border-[var(--color-line)]">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#00594C] dark:text-[#00A38C]" />
                    <span>Work Order Progress Notifications</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-slate)]">
                    Receive technician dispatch and completion updates.
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={(val) => {
                    setNotifications(val);
                    showToast(`Work order notifications ${val ? "active" : "muted"}.`, "info");
                  }}
                />
              </div>

            </CardContent>
          </Card>

          {/* Audit Log Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Recent Authentication Audit Log</CardTitle>
                <History className="w-4 h-4 text-[var(--color-slate)]" />
              </div>
              <CardDescription>
                Security records of sessions authenticated to your tenant ID.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="p-2.5 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[var(--color-ink)]">Current Active Session</div>
                  <div className="text-[11px] text-[var(--color-slate)] font-mono-num">
                    Addis Ababa, ET • 197.156.103.42
                  </div>
                </div>
                <Badge variant="paid">Active Now</Badge>
              </div>

              <div className="p-2.5 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[var(--color-ink)]">Fayda OTP Authenticated</div>
                  <div className="text-[11px] text-[var(--color-slate)] font-mono-num">
                    Yesterday at 14:22 • Mobile Chrome
                  </div>
                </div>
                <span className="text-[10px] text-[var(--color-slate)] font-mono-num">Verified</span>
              </div>

              <div className="p-2.5 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[var(--color-ink)]">Rent Settlement via Telebirr</div>
                  <div className="text-[11px] text-[var(--color-slate)] font-mono-num">
                    04 Aug 2026 at 09:15 • USSD Push
                  </div>
                </div>
                <span className="text-[10px] text-[#1B7A4A] font-mono-num">Success</span>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
};
