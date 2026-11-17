import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  ReceiptText, 
  Search, 
  CheckCircle2, 
  FileText, 
  Download, 
  ShieldCheck, 
  Building2, 
  AlertCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";

export const RecordsPage: React.FC = () => {
  const { setRoute, paymentVerifications } = useApp();

  const [searchRef, setSearchRef] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    setHasSearched(true);
    const q = searchRef.trim().toLowerCase();
    const found = paymentVerifications.find(
      (pv) =>
        pv.depositSlipNumber.toLowerCase().includes(q) ||
        (pv.clearanceVoucherNo && pv.clearanceVoucherNo.toLowerCase().includes(q)) ||
        pv.invoiceNo.toLowerCase().includes(q)
    );
    setSearchResult(found || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00594C] uppercase tracking-wider mb-1">
            <ReceiptText className="w-3.5 h-3.5" />
            <span>Audit & Verification Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
            Payment Verification & Official Records
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-slate)] mt-1">
            Official municipal ledger matching, bank deposit verification, and statutory lease documentation.
          </p>
        </div>

        <Button
          onClick={() => setRoute("portal-login")}
          className="w-full sm:w-auto bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-10 gap-2 shadow-xs cursor-pointer justify-center"
        >
          <span>Submit Payment Slip in Portal</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Statutory Architecture Notice (Requirement 10) */}
      <div className="bg-[#E8F5F1] dark:bg-[#1A1A1A]/80 border border-[#00594C]/20 dark:border-[#00A38C]/30 rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-[#00594C] dark:text-[#00A38C] font-bold text-sm">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Municipal Payment Verification Architecture</span>
        </div>
        <p className="text-xs text-[var(--color-slate)] dark:text-slate-300 leading-relaxed">
          The Addis Ababa City Administration Building & Rental Property Management System (CBRPM) operates as a <strong>verification and audit authority</strong>, not a payment gateway. Tenancy rent must be paid directly into designated municipal accounts at commercial banks (such as Commercial Bank of Ethiopia, CBE Birr, or Awash Bank). Tenants submit their deposit receipt slip or bank transaction reference for finance desk reconciliation and clearance issuance.
        </p>
      </div>

      {/* Public Voucher & Slip Verification Search */}
      <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-[var(--color-ink)]">
            Verify Municipal Clearance Voucher or Bank Slip
          </h2>
          <p className="text-xs text-[var(--color-slate)] mt-0.5">
            Authenticate the clearance status of any tenant deposit or official clearance voucher.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] dark:bg-[#1A1A1A]">
            <Search className="w-4 h-4 text-[var(--color-slate)] shrink-0" />
            <input
              type="text"
              placeholder="Enter Voucher # (e.g. CBRPM-CLR-2026-08-412) or Deposit Slip # (e.g. CBE-DEP-2026-881944)..."
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-[var(--color-ink)]"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-11 px-6 shadow-xs"
          >
            Verify Record
          </Button>
        </form>

        {/* Search Result Display */}
        {hasSearched && (
          <div className="pt-4 border-t border-[var(--color-line)]">
            {searchResult ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Clearance Record Verified</span>
                  </div>
                  <span className="font-mono-num font-semibold text-emerald-700 dark:text-emerald-300">
                    Status: {searchResult.status === "verified" ? "CLEARED & VERIFIED" : "UNDER VERIFICATION"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-[var(--color-slate)] block">Clearance Voucher</span>
                    <strong className="text-[var(--color-ink)] font-mono">{searchResult.clearanceVoucherNo || "Pending Desk Review"}</strong>
                  </div>
                  <div>
                    <span className="text-[var(--color-slate)] block">Deposit Slip Ref</span>
                    <strong className="text-[var(--color-ink)] font-mono">{searchResult.depositSlipNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[var(--color-slate)] block">Deposited Amount</span>
                    <strong className="text-[var(--color-ink)] font-mono-num">ETB {searchResult.amountEtb.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[var(--color-slate)] block">Bank Channel</span>
                    <strong className="text-[var(--color-ink)]">{searchResult.bankName}</strong>
                  </div>
                </div>

                {searchResult.verifiedBy && (
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300 border-t border-emerald-200 dark:border-emerald-800 pt-2">
                    Verified on {searchResult.verifiedDate} by {searchResult.verifiedBy}. {searchResult.notes}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-3 text-xs text-amber-800 dark:text-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>No matching clearance record found for reference "{searchRef}". Verify the slip number with your issuing bank branch or check the resident portal.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Official Directives & Documents */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-ink)]">
            Official Municipal Directives & Forms
          </h2>
          <p className="text-xs text-[var(--color-slate)]">
            Statutory regulations governing municipal tenancy, allocation quotas, and maintenance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <FileText className="w-6 h-6 text-[#00594C]" />
              <h3 className="font-bold text-sm text-[var(--color-ink)]">
                Directive No. 44/2024: Public Housing Allocation
              </h3>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Rules governing quota determination, civil servant eligibility, and public agency residential assignments.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[var(--color-line)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-slate)]">PDF • 1.4 MB</span>
              <button className="font-semibold text-[#00594C] hover:underline flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <FileText className="w-6 h-6 text-[#00594C]" />
              <h3 className="font-bold text-sm text-[var(--color-ink)]">
                Standard Tenancy Agreement Contract (Template)
              </h3>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Statutory terms and conditions for residential and commercial municipal tenants across all sub-cities.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[var(--color-line)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-slate)]">PDF • 840 KB</span>
              <button className="font-semibold text-[#00594C] hover:underline flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <FileText className="w-6 h-6 text-[#00594C]" />
              <h3 className="font-bold text-sm text-[var(--color-ink)]">
                Building Inspection & Defect Protocol Manual
              </h3>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Technical inspection guidelines for sub-city depot engineers assessing structural, fire, and plumbing conditions.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[var(--color-line)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-slate)]">PDF • 2.1 MB</span>
              <button className="font-semibold text-[#00594C] hover:underline flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
