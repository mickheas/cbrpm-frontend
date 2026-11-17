import React from "react";
import { Building2 } from "lucide-react";

export const HeroArchitecturalPattern: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. AMBIENT SOFT SLATE & ROYAL GREEN GLOW FIELD
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,89,76,0.08),transparent_75%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,163,140,0.12),transparent_75%)]" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(0,89,76,0.06),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,163,140,0.09),transparent_70%)] blur-2xl" />
      <div className="absolute left-0 bottom-10 w-80 h-80 bg-[radial-gradient(circle,rgba(83,104,98,0.06),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-2xl" />

      {/* ─────────────────────────────────────────────────────────────
          2. DELICATE CAD GRID CANVAS WITH RADIAL FADE-OUT MASK
      ────────────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full text-[#00594C] dark:text-[#00A38C]"
        viewBox="0 0 1440 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle CAD Drafting Grid Pattern */}
          <pattern
            id="hero-cad-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.04"
              className="dark:stroke-neutral-500/20"
            />
            {/* Fine grid intersections / crosshairs */}
            <circle cx="0" cy="0" r="1" fill="currentColor" fillOpacity="0.08" className="dark:fill-emerald-400/20" />
            <circle cx="60" cy="0" r="1" fill="currentColor" fillOpacity="0.08" className="dark:fill-emerald-400/20" />
            <circle cx="0" cy="60" r="1" fill="currentColor" fillOpacity="0.08" className="dark:fill-emerald-400/20" />
            <circle cx="60" cy="60" r="1" fill="currentColor" fillOpacity="0.08" className="dark:fill-emerald-400/20" />
          </pattern>

          {/* Center Radial Fade Mask: Keeps search bar and heading 100% crisp & readable */}
          <mask id="hero-radial-contrast-mask">
            <rect width="1440" height="680" fill="white" />
            <radialGradient id="center-fade-decay" cx="50%" cy="46%" r="48%">
              <stop offset="0%" stopColor="black" stopOpacity="0.95" />
              <stop offset="35%" stopColor="black" stopOpacity="0.82" />
              <stop offset="70%" stopColor="black" stopOpacity="0.28" />
              <stop offset="100%" stopColor="white" stopOpacity="0.0" />
            </radialGradient>
            <ellipse cx="720" cy="310" rx="540" ry="260" fill="url(#center-fade-decay)" />
          </mask>
        </defs>

        {/* CAD Grid Layer across entire canvas, subject to center radial fade */}
        <rect
          width="1440"
          height="680"
          fill="url(#hero-cad-grid)"
          mask="url(#hero-radial-contrast-mask)"
        />

        {/* Cadastral Coordinates & Technical Datum Guides */}
        <g mask="url(#hero-radial-contrast-mask)">
          <line x1="80" y1="110" x2="1360" y2="110" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.06" strokeDasharray="4 8" />
          <line x1="80" y1="540" x2="1360" y2="540" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.06" strokeDasharray="4 8" />
          
          <g className="text-[10px] font-mono tracking-widest uppercase opacity-25 dark:opacity-35 select-none" fill="currentColor">
            <text x="90" y="102">AA-CADASTRAL // SECTOR 04-BOLE</text>
            <text x="1220" y="102">DATUM +2355m N.N.</text>
            <text x="90" y="555">MUNICIPAL ASSET REGISTER 2026</text>
            <text x="1235" y="555">GRID REF: ET-AA-09</text>
          </g>
        </g>
      </svg>

      {/* ─────────────────────────────────────────────────────────────
          3. OFFICIAL MUNICIPAL BUILDING WATERMARK ICONS
             (Inspired directly by the tenant dashboard main card icon)
      ────────────────────────────────────────────────────────────── */}
      {/* Right Side: Primary Civic Building Emblem Watermark */}
      <div 
        className="absolute -right-8 sm:right-6 lg:right-16 top-1/2 -translate-y-1/2 text-[#00594C] dark:text-[#00A38C] opacity-[0.07] dark:opacity-[0.14] pointer-events-none transition-opacity duration-300"
        style={{
          maskImage: "radial-gradient(circle at 55% 50%, black 50%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at 55% 50%, black 50%, transparent 95%)"
        }}
      >
        <Building2 
          className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px]" 
          strokeWidth={0.8} 
        />
      </div>

      {/* Left Side: Subtle Secondary Civic Landmark Watermark */}
      <div 
        className="absolute -left-12 sm:left-4 lg:left-14 top-1/2 -translate-y-1/2 text-[#00594C] dark:text-[#00A38C] opacity-[0.045] dark:opacity-[0.09] pointer-events-none transition-opacity duration-300 hidden sm:block"
        style={{
          maskImage: "radial-gradient(circle at 45% 50%, black 50%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at 45% 50%, black 50%, transparent 95%)"
        }}
      >
        <Building2 
          className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px]" 
          strokeWidth={0.8} 
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM FADE-OUT DIVIDER (Seamless blend into next section)
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-base)] to-transparent" />
    </div>
  );
};
