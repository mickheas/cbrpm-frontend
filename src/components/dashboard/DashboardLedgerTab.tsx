import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  ReceiptText, 
  Download, 
  Printer, 
  Plus, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  AlertCircle,
  FileText,
  Clock,
  ExternalLink,
  Check,
  Building2,
  FileCheck2,
  Upload
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
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
import { PaymentVerificationRecord } from "../../types";

export const DashboardLedgerTab: React.FC = () => {
  const { 
    currentUser, 
    showToast, 
    paymentVerifications, 
    submitPaymentSlip, 
    verifyPaymentSlip 
  } = useApp();

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState<PaymentVerificationRecord | null>(null);

  // Form State for Bank Deposit Slip Submission
  const [invoiceRef, setInvoiceRef] = useState("INV-2026-09-8841 (September 2026)");
  const [bankChannel, setBankChannel] = useState("Commercial Bank of Ethiopia (CBE)");
  const [depositSlipNumber, setDepositSlipNumber] = useState("");
  const [depositDate, setDepositDate] = useState("2026-09-18");
  const [amountEtb, setAmountEtb] = useState<number>(currentUser?.monthlyRentEtb || 18500);
  const [depositorName, setDepositorName] = useState(currentUser?.name || "");
  const [depositorPhone, setDepositorPhone] = useState(currentUser?.phone || "");
  const [notes, setNotes] = useState("");
  const [attachedFileName, setAttachedFileName] = useState("cbe_branch_receipt_9941.pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitSlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositSlipNumber.trim()) {
      showToast("Please enter the bank transaction or deposit slip number.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitPaymentSlip({
        invoiceNo: invoiceRef.split(" ")[0],
        amountEtb: Number(amountEtb),
        bankName: bankChannel,
        depositSlipNumber: depositSlipNumber.trim(),
        paymentDate: depositDate,
        notes: notes ? `${notes} (Uploaded: ${attachedFileName})` : `Uploaded receipt: ${attachedFileName}`
      });
      setSubmitDialogOpen(false);
      setDepositSlipNumber("");
    }, 500);
  };

  const isOfficer = currentUser?.role === "admin_officer";

  return (
    <div className="space-y-6">
      
      {/* 1. Explicit Architectural Clarification Notice (Requirement 10) */}
      <div className="bg-[#E8F5F1] dark:bg-[#1A1A1A]/90 border border-[#00594C]/20 dark:border-[#00A38C]/30 rounded-xl p-4 sm:p-5 space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-[#00594C] dark:text-[#00A38C]">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Statutory Payment Verification Notice</span>
        </div>
        <p className="text-xs text-[var(--color-slate)] dark:text-slate-300 leading-relaxed">
          The City Building & Rental Property Management System (CBRPM) operates as a <strong>verification and clearance authority</strong>. The system does not collect funds or process card transactions directly. Rent must be deposited at designated commercial banks into the Addis Ababa City Administration Treasury Account. Tenants submit their bank deposit slip or electronic transaction reference below for municipal ledger verification and clearance issuance.
        </p>
      </div>

      {/* 2. Top Summary & Actions */}
      <Card className="shadow-xs">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 pb-3">
          <div>
            <CardTitle className="text-sm sm:text-base md:text-lg">
              {isOfficer ? "Municipal Payment Verification Desk" : "Rent Invoices & Bank Deposit Verification"}
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {isOfficer 
                ? "Review submitted commercial bank deposit slips, verify against treasury accounts, and issue clearance vouchers."
                : "Record of monthly tenancy invoices and municipal clearance vouchers."
              }
            </CardDescription>
          </div>

          <div className="w-full sm:w-auto">
            {!isOfficer && (
              <Button
                onClick={() => setSubmitDialogOpen(true)}
                className="w-full sm:w-auto bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-9 px-4 gap-1.5 shadow-xs cursor-pointer justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit Deposit Slip for Verification</span>
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 pt-0">
          
          {/* Mobile Card-Based List (Visible on mobile/small screens) */}
          <div className="md:hidden space-y-3">
            {paymentVerifications.map((item) => (
              <div 
                key={item.id} 
                className="p-3.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] space-y-2.5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[var(--color-ink)]">{item.period}</div>
                    <div className="text-[11px] text-[var(--color-slate)] font-mono">{item.invoiceNo}</div>
                  </div>
                  <div className="font-mono-num font-bold text-xs sm:text-sm text-[var(--color-ink)] shrink-0">
                    ETB {item.amountEtb.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[var(--color-line)]">
                  <div>
                    <span className="text-[10px] text-[var(--color-slate)] block">Slip / Ref Number:</span>
                    <span className="font-mono font-medium text-[var(--color-ink)] truncate block">{item.depositSlipNumber}</span>
                    <span className="text-[10px] text-[var(--color-slate)] truncate block">{item.bankName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--color-slate)] block">Payment Date:</span>
                    <span className="font-mono-num text-[var(--color-ink)] block">{item.paymentDate}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-[var(--color-line)]">
                  <div>
                    {item.status === "verified" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified & Cleared</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <Clock className="w-3 h-3" />
                        <span>Pending Verification</span>
                      </span>
                    )}
                  </div>

                  <div>
                    {isOfficer && item.status === "pending_verification" ? (
                      <Button
                        size="sm"
                        onClick={() => verifyPaymentSlip(item.id)}
                        className="w-full sm:w-auto bg-[#00594C] hover:bg-[#00473D] text-white text-xs h-8 px-3 font-semibold cursor-pointer"
                      >
                        Verify & Clear
                      </Button>
                    ) : item.status === "verified" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedVerification(item)}
                        className="w-full sm:w-auto text-xs h-8 px-3 border-[var(--color-line)] font-medium cursor-pointer"
                      >
                        <ReceiptText className="w-3.5 h-3.5 mr-1.5 text-[#00594C]" />
                        <span>Clearance Voucher</span>
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedVerification(item)}
                        className="w-full sm:w-auto text-xs h-8 px-2 text-[var(--color-slate)] cursor-pointer"
                      >
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Invoice & Period</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Bank Deposit Slip Ref</TableHead>
                  <TableHead className="text-xs">Payment Date</TableHead>
                  <TableHead className="text-xs">Verification Status</TableHead>
                  <TableHead className="text-right text-xs">Clearance Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentVerifications.map((item) => (
                  <TableRow key={item.id} className="text-xs">
                    
                    <TableCell>
                      <div className="font-bold text-[var(--color-ink)]">{item.period}</div>
                      <div className="text-[11px] text-[var(--color-slate)] font-mono">{item.invoiceNo}</div>
                    </TableCell>

                    <TableCell className="font-mono-num font-bold text-[var(--color-ink)]">
                      ETB {item.amountEtb.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <div className="font-mono text-xs font-semibold text-[var(--color-ink)]">
                        {item.depositSlipNumber}
                      </div>
                      <div className="text-[10px] text-[var(--color-slate)]">{item.bankName}</div>
                    </TableCell>

                    <TableCell className="text-[var(--color-slate)] font-mono-num">
                      {item.paymentDate}
                    </TableCell>

                    <TableCell>
                      {item.status === "verified" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified & Cleared</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          <Clock className="w-3 h-3" />
                          <span>Pending Verification</span>
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      {isOfficer && item.status === "pending_verification" ? (
                        <Button
                          size="sm"
                          onClick={() => verifyPaymentSlip(item.id)}
                          className="bg-[#00594C] hover:bg-[#00473D] text-white text-[11px] h-7 px-2.5 font-semibold cursor-pointer"
                        >
                          Verify & Clear
                        </Button>
                      ) : item.status === "verified" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedVerification(item)}
                          className="text-[11px] h-7 px-2.5 border-[var(--color-line)] font-medium cursor-pointer"
                        >
                          <ReceiptText className="w-3 h-3 mr-1 text-[#00594C]" />
                          <span>Clearance Voucher</span>
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedVerification(item)}
                          className="text-[11px] h-7 px-2 text-[var(--color-slate)] cursor-pointer"
                        >
                          View Details
                        </Button>
                      )}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>

      {/* 3. Modal: Submit Bank Deposit Slip for Verification */}
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Submit Bank Deposit Slip for Verification</DialogTitle>
            <DialogDescription className="text-xs">
              Provide the commercial bank deposit receipt details or mobile transaction reference for finance desk clearance.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitSlip} className="space-y-4 text-xs">
            
            <div>
              <label className="block font-semibold text-[var(--color-slate)] mb-1">
                Lease Invoice Period
              </label>
              <input
                type="text"
                readOnly
                value={invoiceRef}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-subtle)] text-[var(--color-ink)] font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[var(--color-slate)] mb-1">
                  Bank / Payment Channel
                </label>
                <select
                  value={bankChannel}
                  onChange={(e) => setBankChannel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                >
                  <option value="Commercial Bank of Ethiopia (CBE)">Commercial Bank of Ethiopia (CBE)</option>
                  <option value="CBE Birr Mobile Banking">CBE Birr Mobile Banking</option>
                  <option value="Awash Bank">Awash Bank</option>
                  <option value="Telebirr Government Account">Telebirr Gov Account</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-slate)] mb-1">
                  Deposited Amount (ETB)
                </label>
                <input
                  type="number"
                  required
                  value={amountEtb}
                  onChange={(e) => setAmountEtb(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] font-mono-num outline-none focus:border-[#00594C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[var(--color-slate)] mb-1">
                  Bank Slip / Ref Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBE-DEP-2026-99104"
                  value={depositSlipNumber}
                  onChange={(e) => setDepositSlipNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] font-mono outline-none focus:border-[#00594C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-slate)] mb-1">
                  Date of Bank Deposit
                </label>
                <input
                  type="date"
                  required
                  value={depositDate}
                  onChange={(e) => setDepositDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                />
              </div>
            </div>

            {/* Simulated Receipt Upload */}
            <div>
              <label className="block font-semibold text-[var(--color-slate)] mb-1">
                Attach Deposit Slip / Bank Receipt (PDF or Image)
              </label>
              <div className="border border-dashed border-[var(--color-line)] rounded-lg p-3 bg-[var(--color-subtle)] dark:bg-[#1A1A1A]/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--color-slate)]">
                  <FileText className="w-4 h-4 text-[#00594C]" />
                  <span className="font-mono">{attachedFileName}</span>
                </div>
                <label className="px-2 py-1 text-[11px] bg-white dark:bg-slate-700 border border-[var(--color-line)] rounded font-semibold cursor-pointer hover:bg-slate-50">
                  <span>Browse...</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[var(--color-slate)] mb-1">
                Additional Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Branch name or depositor note..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSubmitDialogOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit for Verification"}
              </Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

      {/* 4. Modal: View Official Clearance Voucher */}
      {selectedVerification && (
        <Dialog open={Boolean(selectedVerification)} onOpenChange={() => setSelectedVerification(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader className="border-b border-[var(--color-line)] pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#00594C]" />
                  <DialogTitle className="text-base font-bold">
                    Official Municipal Rent Clearance Voucher
                  </DialogTitle>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                  {selectedVerification.status === "verified" ? "OFFICIALLY VERIFIED" : "PENDING AUDIT"}
                </span>
              </div>
              <DialogDescription className="text-xs">
                Addis Ababa City Administration • Property Management Bureau
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3 text-xs">
              
              <div className="bg-[var(--color-subtle)] dark:bg-[#1A1A1A] p-3 rounded-lg space-y-1">
                <div className="flex justify-between">
                  <span className="text-[var(--color-slate)]">Clearance Voucher No:</span>
                  <strong className="font-mono text-[var(--color-ink)]">
                    {selectedVerification.clearanceVoucherNo || "Under Review"}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-slate)]">Rental Period:</span>
                  <strong className="text-[var(--color-ink)]">{selectedVerification.period}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-slate)]">Tenancy Invoice Ref:</span>
                  <strong className="font-mono text-[var(--color-ink)]">{selectedVerification.invoiceNo}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-y border-[var(--color-line)] py-3">
                <div>
                  <div className="text-[11px] text-[var(--color-slate)]">Deposited Amount</div>
                  <div className="text-base font-bold font-mono-num text-[var(--color-ink)]">
                    ETB {selectedVerification.amountEtb.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[var(--color-slate)]">Payment Channel</div>
                  <div className="font-semibold text-[var(--color-ink)]">{selectedVerification.bankName}</div>
                </div>

                <div>
                  <div className="text-[11px] text-[var(--color-slate)]">Bank Slip / Ref No.</div>
                  <div className="font-mono font-bold text-[var(--color-ink)]">{selectedVerification.depositSlipNumber}</div>
                </div>

                <div>
                  <div className="text-[11px] text-[var(--color-slate)]">Deposit Date</div>
                  <div className="font-mono-num text-[var(--color-ink)]">{selectedVerification.paymentDate}</div>
                </div>
              </div>

              {selectedVerification.verifiedBy && (
                <div className="text-[11px] text-[var(--color-slate)] space-y-0.5">
                  <div><strong>Verifying Authority:</strong> {selectedVerification.verifiedBy}</div>
                  <div><strong>Verification Timestamp:</strong> {selectedVerification.verifiedDate}</div>
                  <div><strong>Reconciliation Audit:</strong> {selectedVerification.notes}</div>
                </div>
              )}

            </div>

            <DialogFooter className="border-t border-[var(--color-line)] pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast("Printing official clearance voucher...", "info")}
                className="text-xs gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </Button>
              <Button
                size="sm"
                onClick={() => setSelectedVerification(null)}
                className="bg-[#00594C] text-white text-xs font-semibold"
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
};
