import React from "react";
import { useApp } from "../context/AppContext";
import { IMPACT_STATS } from "../data/mockData";
import { TrendingUp } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";

export const ImpactPage: React.FC = () => {
  const { language } = useApp();

  const subCityDistributionData = [
    { name: "Bole", units: 14200, color: "#00594C" },
    { name: "Kirkos", units: 11800, color: "#2B5E9E" },
    { name: "Yeka", units: 9400, color: "#3B71B2" },
    { name: "Arada", units: 8200, color: "#4C84C6" },
    { name: "Lideta", units: 7500, color: "#5E98DA" },
    { name: "Nifas Silk", units: 6900, color: "#72ACEE" },
    { name: "Gulele", units: 5800, color: "#87C0FF" },
    { name: "Others", units: 8600, color: "#64748B" }
  ];

  const housingTypeData = [
    { name: "Government rental housing", value: 68, color: "#00594C" },
    { name: "Direct purchase residences", value: 18, color: "#1B7A4A" },
    { name: "Commercial & mixed-use", value: 14, color: "#475569" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--color-line)] pb-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C] dark:text-[#00A38C] uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Institutional metrics & accountability</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
          Portfolio scale & public accountability
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-slate)] max-w-3xl">
          Detailed metrics, sub-city housing distribution, and development indicators administered by the Federal Housing Corporation.
        </p>
      </div>

      {/* Top 6 Impact Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {IMPACT_STATS.map((stat, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-md bg-[var(--color-surface)] border border-[var(--color-line)] shadow-xs space-y-1"
          >
            <div className="text-xl sm:text-2xl font-bold font-mono-num tabular-nums text-[var(--color-ink)]">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-[var(--color-ink)]">
              {language === "am" ? stat.labelAm : stat.label}
            </div>
            <div className="text-[11px] text-[var(--color-slate)]">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Data Visualization Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Sub-City Distribution */}
        <div className="bg-[var(--color-surface)] p-5 rounded-md border border-[var(--color-line)] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-2">
            <div>
              <h2 className="font-semibold text-sm text-[var(--color-ink)]">
                Residential units by sub-city
              </h2>
              <p className="text-xs text-[var(--color-slate)]">
                Active residential properties across municipal divisions.
              </p>
            </div>
            <span className="text-xs font-mono-num font-semibold text-[var(--color-ink)] bg-[var(--color-base)] px-2 py-0.5 rounded-xs border border-[var(--color-line)]">
              72,400 total
            </span>
          </div>

          <div className="h-60 sm:h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subCityDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "currentColor" }} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: "currentColor" }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--color-surface)", 
                    borderColor: "var(--color-line)", 
                    color: "var(--color-ink)", 
                    borderRadius: "4px", 
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)"
                  }}
                />
                <Bar dataKey="units" fill="#00594C" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Housing Stock Composition */}
        <div className="bg-[var(--color-surface)] p-5 rounded-md border border-[var(--color-line)] shadow-xs space-y-3">
          <div className="border-b border-[var(--color-line)] pb-2">
            <h2 className="font-semibold text-sm text-[var(--color-ink)]">
              Portfolio composition breakdown
            </h2>
            <p className="text-xs text-[var(--color-slate)]">
              Primary focus remains residential housing; commercial is an anchor revenue component.
            </p>
          </div>

          <div className="h-60 sm:h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={housingTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {housingTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => `${val}%`}
                  contentStyle={{ 
                    backgroundColor: "var(--color-surface)", 
                    borderColor: "var(--color-line)", 
                    color: "var(--color-ink)", 
                    borderRadius: "4px", 
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)"
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={32} 
                  formatter={(value) => <span className="text-xs text-[var(--color-slate)] font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reinvestment & Sustainability Section */}
      <div className="bg-[var(--color-surface)] rounded-md p-5 sm:p-6 border border-[var(--color-line)] shadow-xs space-y-4">
        <div className="space-y-1 border-b border-[var(--color-line)] pb-3">
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-ink)]">
            Reinvestment & urban development
          </h2>
          <p className="text-xs text-[var(--color-slate)] max-w-3xl leading-relaxed">
            As a public corporation, all rental and development revenues are dedicated to expanding civil servant housing access, building sustainable high-density apartments, and upgrading infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] space-y-1">
            <div className="text-xl font-bold font-mono-num text-[var(--color-ink)]">ETB 18.5 billion</div>
            <div className="text-xs font-semibold text-[var(--color-ink)]">Urban reinvestment</div>
            <p className="text-xs text-[var(--color-slate)]">Committed under the current strategic development master plan.</p>
          </div>
          <div className="p-4 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] space-y-1">
            <div className="text-xl font-bold font-mono-num text-[var(--color-ink)]">100% solar-ready</div>
            <div className="text-xs font-semibold text-[var(--color-ink)]">Renewable energy standard</div>
            <p className="text-xs text-[var(--color-slate)]">All newly constructed towers integrate rooftop solar arrays and backup storage.</p>
          </div>
          <div className="p-4 rounded-md bg-[var(--color-base)] border border-[var(--color-line)] space-y-1">
            <div className="text-xl font-bold font-mono-num text-[var(--color-ink)]">100% public ownership</div>
            <div className="text-xs font-semibold text-[var(--color-ink)]">Sovereign municipal assets</div>
            <p className="text-xs text-[var(--color-slate)]">Complete state sovereignty over public residential and smart parking assets.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
