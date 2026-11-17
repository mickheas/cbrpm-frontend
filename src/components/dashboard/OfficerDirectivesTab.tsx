import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Scale, 
  BookOpen,
  ArrowUpRight,
  Printer
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface DirectiveItem {
  id: string;
  referenceNo: string;
  title: string;
  category: "Rent Tariff" | "Allocation Policy" | "Defect Penalty" | "Sub-City Operations";
  effectiveDate: string;
  summary: string;
  fileSize: string;
  proclamationRef: string;
}

const DIRECTIVES: DirectiveItem[] = [
  {
    id: "DIR-01",
    referenceNo: "AACA-DIR-44/2024",
    title: "Public Housing Allocation & Civil Service Quota Regulation",
    category: "Allocation Policy",
    effectiveDate: "01 Sep 2024",
    summary: "Sets out statutory point grading for federal ministry civil servants, priority quotas for healthcare/education personnel, and salary band criteria.",
    fileSize: "1.8 MB PDF",
    proclamationRef: "Proclamation No. 89/2016"
  },
  {
    id: "DIR-02",
    referenceNo: "AACA-TRF-12/2025",
    title: "Harmonized Municipal Rent Schedule & Sub-City Grade Indices",
    category: "Rent Tariff",
    effectiveDate: "08 Jan 2025",
    summary: "Official ETB square-meter base rates for Bole, Kirkos, Yeka, and Lideta sub-city residential buildings, with subsidized civil service ceiling caps.",
    fileSize: "920 KB PDF",
    proclamationRef: "Council Regulation No. 104/2024"
  },
  {
    id: "DIR-03",
    referenceNo: "AACA-REV-08/2026",
    title: "Bank Slip Verification & Treasury Reconciliation Standards",
    category: "Sub-City Operations",
    effectiveDate: "15 Mar 2026",
    summary: "Mandates two-officer verification protocol for commercial bank deposit receipts and automated clearance certificate issuance.",
    fileSize: "740 KB PDF",
    proclamationRef: "Ministry of Finance Guideline 22/B"
  },
  {
    id: "DIR-04",
    referenceNo: "AACA-BLD-19/2025",
    title: "Building Defect Classification & Unauthorized Alteration Sanctions",
    category: "Defect Penalty",
    effectiveDate: "20 Nov 2025",
    summary: "Establishes municipal depot repair chargebacks, tenant damage liabilities, and statutory notice periods prior to lease termination.",
    fileSize: "1.2 MB PDF",
    proclamationRef: "Building Code Directive Part 6"
  }
];

export const OfficerDirectivesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered = DIRECTIVES.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.referenceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Institutional Directives Banner */}
      <div className="bg-[#E8F5F1] dark:bg-[#121212] border border-[#00594C]/20 dark:border-[#00A38C]/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00594C] dark:text-[#00A38C]">
            <Scale className="w-4 h-4" />
            <span>Administrative Directives & Gazettes</span>
          </div>
          <h2 className="text-base font-bold text-[var(--color-ink)]">
            City Council Directives, Rent Tariffs & Allocation Frameworks
          </h2>
          <p className="text-xs text-[var(--color-slate)]">
            Statutory regulatory instruments governing Addis Ababa municipal housing administration.
          </p>
        </div>

        <div className="text-xs font-mono text-[var(--color-slate)] bg-white dark:bg-[#1A1A1A] px-3 py-1.5 rounded-md border border-[var(--color-line)] shrink-0">
          Official Gazette Edition 2026/03
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by directive title or reference number (e.g., DIR-44/2024)..."
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "Allocation Policy", "Rent Tariff", "Sub-City Operations", "Defect Penalty"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#00594C] text-white"
                  : "bg-white dark:bg-[#1A1A1A] text-[var(--color-slate)] border border-[var(--color-line)] hover:text-[var(--color-ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Directive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(directive => (
          <Card key={directive.id} className="shadow-xs hover:border-[#00594C]/40 transition-colors">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <Badge variant="outline" className="text-[10px] font-mono py-0.5">
                  {directive.referenceNo}
                </Badge>
                <span className="text-[10px] font-semibold text-[var(--color-slate)]">
                  Effective: {directive.effectiveDate}
                </span>
              </div>
              <CardTitle className="text-sm font-bold text-[var(--color-ink)] leading-snug">
                {directive.title}
              </CardTitle>
              <CardDescription className="text-xs text-[var(--color-slate)] pt-1">
                Authorized under {directive.proclamationRef}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              <p className="text-xs text-[var(--color-ink)]/80 leading-relaxed bg-[var(--color-subtle)] p-3 rounded-md">
                {directive.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-line)]">
                <span className="text-[11px] font-mono text-[var(--color-slate)]">
                  {directive.fileSize}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="h-7 text-xs px-2.5 border-[var(--color-line)]"
                  >
                    <Printer className="w-3 h-3 mr-1" />
                    <span>Print</span>
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs px-2.5 bg-[#00594C] text-white hover:bg-[#00473D]"
                    onClick={() => alert(`Downloading official Gazette copy of ${directive.referenceNo}`)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};
