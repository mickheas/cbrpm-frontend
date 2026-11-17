import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  ExternalLink,
  Building2,
  FileCheck2,
  Award
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription 
} from "../ui/dialog";

export const DashboardDocumentsTab: React.FC = () => {
  const { currentUser, showToast } = useApp();
  const [activeDoc, setActiveDoc] = useState<"lease" | "clearance" | "tax" | null>(null);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Statutory Tenancy Documentation & Certified Clearances</CardTitle>
          <CardDescription>
            Official digital documents verified under the Addis Ababa City Administration digital identity archive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Doc 1: Lease Agreement */}
            <div className="p-4 rounded-md border border-[var(--color-line)] bg-[var(--color-base)] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] text-[#00594C] dark:text-[#00A38C]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <Badge variant="approved">Certified Active</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-ink)]">
                    Statutory Residential Tenancy Contract
                  </h3>
                  <p className="text-xs text-[var(--color-slate)] mt-1 font-mono-num">
                    Ref: {currentUser.leaseContractNo}
                  </p>
                </div>
                <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                  24-month renewable public residential tenancy agreement approved under City Council proclamation.
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--color-line)] flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveDoc("lease")}
                  className="text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  <span>View Contract</span>
                </Button>
                <span className="text-[10px] font-mono-num text-[var(--color-slate)]">PDF • 1.4 MB</span>
              </div>
            </div>

            {/* Doc 2: Employer Clearance */}
            <div className="p-4 rounded-md border border-[var(--color-line)] bg-[var(--color-base)] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] text-[#1B7A4A]">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <Badge variant="paid">Civil Service Stamped</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-ink)]">
                    Housing Allowance Employer Clearance
                  </h3>
                  <p className="text-xs text-[var(--color-slate)] mt-1 font-mono-num">
                    Ref: AACA-CLR-2026-901
                  </p>
                </div>
                <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                  Certificate required by federal ministries and public agencies for monthly housing payroll subsidy.
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--color-line)] flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveDoc("clearance")}
                  className="text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  <span>View Certificate</span>
                </Button>
                <span className="text-[10px] font-mono-num text-[var(--color-slate)]">PDF • 890 KB</span>
              </div>
            </div>

            {/* Doc 3: Annual Tax Clearance */}
            <div className="p-4 rounded-md border border-[var(--color-line)] bg-[var(--color-base)] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] text-[#A6690B]">
                    <Award className="w-5 h-5" />
                  </div>
                  <Badge variant="approved">FY 2026 Cleared</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-ink)]">
                    Municipal Tax & Revenue Statement
                  </h3>
                  <p className="text-xs text-[var(--color-slate)] mt-1 font-mono-num">
                    Ref: MOR-REV-8841-02
                  </p>
                </div>
                <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                  Consolidated proof of zero municipal arrears across rent, sanitation surcharge, and fire safety levy.
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--color-line)] flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveDoc("tax")}
                  className="text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  <span>View Tax Slip</span>
                </Button>
                <span className="text-[10px] font-mono-num text-[var(--color-slate)]">PDF • 640 KB</span>
              </div>
            </div>

          </div>

        </CardContent>
      </Card>

      {/* Document View Modal */}
      {activeDoc && (
        <Dialog open={!!activeDoc} onOpenChange={() => setActiveDoc(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#00594C] dark:text-[#00A38C]" />
                <span>
                  {activeDoc === "lease" 
                    ? "Official Tenancy Agreement Contract" 
                    : activeDoc === "clearance" 
                    ? "Housing Allowance Employer Clearance" 
                    : "Municipal Tax & Revenue Clearance Statement"}
                </span>
              </DialogTitle>
              <DialogDescription>
                Federal Democratic Republic of Ethiopia • Addis Ababa City Administration
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 bg-[var(--color-base)] border border-[var(--color-line)] rounded-md space-y-6 text-xs">
              
              {/* Document Header with Official Seal */}
              <div className="text-center space-y-1 pb-4 border-b-2 border-[var(--color-line)]">
                <div className="text-base font-bold text-[var(--color-ink)]">
                  የአዲስ አበባ ከተማ አስተዳደር የህንፃ እና የኪራይ ይዞታዎች አስተዳደር
                </div>
                <div className="text-xs font-semibold text-[var(--color-slate)] tracking-wider uppercase">
                  Addis Ababa City Administration Building & Rental Property Management System
                </div>
                <div className="text-[11px] text-[var(--color-slate)] font-mono-num pt-1">
                  Document Authentication Hash: SHA256-ETH-AACA-9941208-2026
                </div>
              </div>

              {/* Body */}
              {activeDoc === "lease" && (
                <div className="space-y-4 leading-relaxed text-[var(--color-ink)]">
                  <p>
                    <strong>THIS STATUTORY TENANCY CONTRACT</strong> is ratified on this 1st day of September 2024 by and between the <strong>ADDIS ABABA CITY ADMINISTRATION BUILDING & RENTAL PROPERTY MANAGEMENT SYSTEM</strong> (herein referred to as the "Lessor") and:
                  </p>
                  <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md space-y-1">
                    <div><strong>Citizen Lessee:</strong> {currentUser.name} ({currentUser.nameAm})</div>
                    <div><strong>National Fayda ID:</strong> {currentUser.faydaId || "FAYDA-ETH-9941208"}</div>
                    <div><strong>Designated Property:</strong> {currentUser.residenceName}, {currentUser.subCity}</div>
                    <div><strong>Unit Allocation:</strong> {currentUser.unit}</div>
                    <div><strong>Agreed Monthly Tenancy Rent:</strong> ETB {currentUser.monthlyRentEtb.toLocaleString()} / month</div>
                  </div>
                  <p className="text-xs text-[var(--color-slate)]">
                    1. <strong>Occupancy Purpose:</strong> The premises shall be utilized strictly for lawful residential occupancy. Subletting or commercial conversion without formal City Council dispensation is strictly prohibited.<br/>
                    2. <strong>Maintenance Demarcation:</strong> Structural framework, roof waterproofing, passenger lifts, and central pump lines shall be maintained by the Sub-City Depot. Internal tenant fixtures remain tenant care.<br/>
                    3. <strong>Dispute Resolution:</strong> Governed under the judicial arbitration tribunal of the Federal First Instance Court, Addis Ababa.
                  </p>
                </div>
              )}

              {activeDoc === "clearance" && (
                <div className="space-y-4 leading-relaxed text-[var(--color-ink)]">
                  <p>
                    <strong>TO WHOM IT MAY CONCERN / CIVIL SERVICE HUMAN RESOURCES:</strong>
                  </p>
                  <p>
                    This is to formally certify that <strong>{currentUser.name}</strong>, holder of National Fayda ID <strong>{currentUser.faydaId || "FAYDA-ETH-9941208"}</strong> and employed under <strong>{currentUser.ministryOrEmployer || "Civil Service"}</strong>, is an active lawful tenant in good standing at {currentUser.residenceName}, {currentUser.unit}.
                  </p>
                  <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md space-y-1">
                    <div><strong>Contract Number:</strong> {currentUser.leaseContractNo}</div>
                    <div><strong>Payment Ledger Status:</strong> 100% Settled (Zero Arrears)</div>
                    <div><strong>Authorized Monthly Rent:</strong> ETB {currentUser.monthlyRentEtb.toLocaleString()}</div>
                    <div><strong>Allowance Eligibility Code:</strong> AACA-PUB-ALLW-2026</div>
                  </div>
                  <p className="text-xs text-[var(--color-slate)]">
                    This clearance is issued for official submission to government payroll departments to authorize the statutory public service housing allowance disbursement.
                  </p>
                </div>
              )}

              {activeDoc === "tax" && (
                <div className="space-y-4 leading-relaxed text-[var(--color-ink)]">
                  <p>
                    <strong>ANNUAL MUNICIPAL REVENUE & LEVY CLEARANCE STATEMENT</strong>
                  </p>
                  <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md space-y-1">
                    <div><strong>Taxpayer Entity:</strong> {currentUser.name}</div>
                    <div><strong>Sub-City Revenue Branch:</strong> {currentUser.subCity} Revenue Bureau</div>
                    <div><strong>Audit Period:</strong> Ethiopian Fiscal Year 2017 / 2018 (2025/2026 GC)</div>
                    <div><strong>Total Revenue Remitted:</strong> ETB {(currentUser.monthlyRentEtb * 12).toLocaleString()}</div>
                    <div><strong>Clearance Status:</strong> FULLY COMPLIANT (CLEARED)</div>
                  </div>
                </div>
              )}

              {/* Signatures & Seal Box */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-line)] text-[11px]">
                <div className="space-y-1">
                  <div className="text-[var(--color-slate)]">Authorized City Registrar:</div>
                  <div className="font-bold text-[var(--color-ink)]">Solomon Birhanu</div>
                  <div className="text-[var(--color-slate)]">Bureau of Land & Property Administration</div>
                  <div className="text-[10px] text-[#1B7A4A] font-mono-num">DIGITALLY SIGNED & VERIFIED</div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-[var(--color-slate)]">Verification Seal:</div>
                  <div className="font-mono-num text-[10px] text-[var(--color-slate)]">
                    QR-VERIFY-ET-2026-OK
                  </div>
                  <div className="inline-flex items-center gap-1 text-[#1B7A4A] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Statutory Enforceable</span>
                  </div>
                </div>
              </div>

            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  showToast("Sending document to printer...", "info");
                  window.print();
                }}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  showToast("Certified PDF downloaded with verifiable cryptographic signature.", "success");
                  setActiveDoc(null);
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
};
