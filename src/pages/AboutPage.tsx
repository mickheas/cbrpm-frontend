import React from "react";
import { 
  Landmark, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileText, 
  Users, 
  History
} from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--color-line)] pb-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C] dark:text-[#00A38C] uppercase tracking-wider">
          <Landmark className="w-3.5 h-3.5" />
          <span>Addis Ababa City Administration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
          About City Building & Rental Property Management
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-slate)] max-w-3xl">
          The municipal administration department responsible for receiving completed buildings, administering public and commercial rental leases, managing maintenance workflows, collecting rental revenues, and safeguarding city property assets.
        </p>
      </div>

      {/* Portfolio Scope Notice */}
      <div className="p-4 rounded-md bg-[var(--color-info-dim)] border border-[var(--color-line)] space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C] dark:text-[#00A38C]">
          <Landmark className="w-3.5 h-3.5" />
          <span>Municipal asset scope</span>
        </div>
        <p className="text-xs text-[var(--color-ink)] leading-relaxed">
          The City Administration Building and Rental Property Management System spans residential housing, mixed-use commercial centers, market plazas, and municipal administrative buildings across all 11 sub-cities of Addis Ababa.
        </p>
      </div>

      {/* History and Legal Mandate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-slate)]">
            <History className="w-3.5 h-3.5 text-[#00594C] dark:text-[#00A38C]" />
            <span>Institutional mandate & city governance</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-ink)]">
            Comprehensive city property management
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Established under Addis Ababa City Administration directives, the department operates a unified digital system for property handover from contractors, tenant onboarding, lease agreement renewals, and rental fee administration.
          </p>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            The system streamlines daily operations across 11 sub-city branch depots, linking maintenance inspections, defect logging, SLA dispatch, and financial reconciliation into a transparent municipal workflow.
          </p>
        </div>

        <div className="bg-[var(--color-surface)] rounded-md p-5 border border-[var(--color-line)] space-y-3 shadow-xs">
          <h2 className="font-semibold text-sm text-[var(--color-ink)] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00594C] dark:text-[#00A38C]" />
            <span>Core municipal responsibilities</span>
          </h2>

          <ul className="space-y-2 text-xs text-[var(--color-slate)]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B7A4A] dark:text-[#22C55E] shrink-0 mt-0.5" />
              <span>Building handover acceptance from construction bureaus with defect snagging and digital registry recording.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B7A4A] dark:text-[#22C55E] shrink-0 mt-0.5" />
              <span>Standardized lease agreements, contract renewals, and regulated rental tariff administration.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B7A4A] dark:text-[#22C55E] shrink-0 mt-0.5" />
              <span>Multi-channel rent billing and payment tracking (CBE, Telebirr) with automated arrears monitoring.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B7A4A] dark:text-[#22C55E] shrink-0 mt-0.5" />
              <span>End-to-end maintenance dispatch, technical inspections, contractor assignments, and tenant complaint ticketing.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Governance & Quality Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-surface)] p-5 rounded-md border border-[var(--color-line)] space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--color-ink)]">
            Quality & SLA standards
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Standard operating procedures ensure timely defect inspections, guaranteed response SLAs, and auditable contractor dispatches.
          </p>
        </div>

        <div className="bg-[var(--color-surface)] p-5 rounded-md border border-[var(--color-line)] space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--color-ink)]">
            Sub-city coordination
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Coordinated across 11 sub-city branch administration offices and maintenance depots for immediate ground support.
          </p>
        </div>

        <div className="bg-[var(--color-surface)] p-5 rounded-md border border-[var(--color-line)] space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-md bg-[var(--color-base)] text-[#00594C] dark:text-[#00A38C] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--color-ink)]">
            Auditing & financial governance
          </h2>
          <p className="text-xs text-[var(--color-slate)] leading-relaxed">
            Complete reconciliation of rental receivables, security deposits, penalty assessments, and municipal revenue audits.
          </p>
        </div>
      </div>
    </div>
  );
};
