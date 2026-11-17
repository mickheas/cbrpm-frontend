import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { PROPERTY_SITES, PROPERTIES } from "../data/mockData";
import { PropertySite } from "../types";
import { 
  Building2, 
  MapPin, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  Layers,
  Phone
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export const SitesPage: React.FC = () => {
  const { 
    selectedSubCity, 
    setSelectedSubCity, 
    selectedSiteId, 
    setSelectedSiteId, 
    setRoute,
    openPropertyModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"map" | "list">("map");

  const subCities = [
    "All Sub-Cities",
    "Yeka",
    "Kirkos",
    "Bole",
    "Lemi Kura",
    "Kolfe Keranio"
  ];

  const filteredSites = useMemo(() => {
    return PROPERTY_SITES.filter(site => {
      if (selectedSubCity && selectedSubCity !== "All Sub-Cities" && site.subCity.toLowerCase() !== selectedSubCity.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          site.name.toLowerCase().includes(q) ||
          site.subCity.toLowerCase().includes(q) ||
          site.address.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedSubCity, searchQuery]);

  const activeSite = useMemo(() => {
    if (selectedSiteId) {
      const found = PROPERTY_SITES.find(s => s.id === selectedSiteId);
      if (found) return found;
    }
    return filteredSites[0] || PROPERTY_SITES[0];
  }, [selectedSiteId, filteredSites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00594C] uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Spatial Property Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
            Sub-City Housing Schemes & Sites
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-slate)] mt-1">
            Explore administered public residential clusters, depot facility hubs, and commercial zones across Addis Ababa.
          </p>
        </div>

        {/* View Toggle on Mobile */}
        <div className="sm:hidden flex rounded-lg border border-[var(--color-line)] p-1 bg-[var(--color-subtle)]">
          <button
            onClick={() => setActiveTab("map")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${activeTab === "map" ? "bg-white text-[var(--color-ink)] shadow-xs" : "text-[var(--color-slate)]"}`}
          >
            Interactive Map
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${activeTab === "list" ? "bg-white text-[var(--color-ink)] shadow-xs" : "text-[var(--color-slate)]"}`}
          >
            Directory ({filteredSites.length})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row gap-3">
        
        {/* Search */}
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[var(--color-subtle)] dark:bg-[#1A1A1A] rounded-lg">
          <Search className="w-4 h-4 text-[var(--color-slate)] shrink-0" />
          <input
            type="text"
            placeholder="Search scheme name or neighborhood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-[var(--color-ink)] placeholder:text-[var(--color-slate)]"
          />
        </div>

        {/* Sub-City Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {subCities.map((sc) => {
            const isSelected = (!selectedSubCity && sc === "All Sub-Cities") || selectedSubCity === sc;
            return (
              <button
                key={sc}
                onClick={() => setSelectedSubCity(sc === "All Sub-Cities" ? null : sc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#00594C] text-white"
                    : "bg-[var(--color-subtle)] dark:bg-[#1A1A1A] text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                }`}
              >
                {sc}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Grid: Interactive Map & Site Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Functional SVG Map & Scheme Markers (7 cols on desktop) */}
        <div className={`lg:col-span-7 space-y-4 ${activeTab === "list" ? "hidden sm:block" : "block"}`}>
          <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-4 shadow-xs">
            
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00594C]" />
                <span>Addis Ababa Sub-City Schemes</span>
              </span>
              <span className="text-[var(--color-slate)]">Click any marker to inspect</span>
            </div>

            {/* Simulated Interactive Map Surface */}
            <div className="relative w-full h-80 sm:h-96 rounded-lg bg-slate-100 dark:bg-[#1A1A1A]/80 overflow-hidden border border-[var(--color-line)] flex items-center justify-center p-4">
              
              {/* Minimal Grid Background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00594C_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Sub-City Boundary Representation */}
              <div className="relative w-full h-full max-w-md max-h-72">
                <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-xs">
                  {/* Stylized Addis Ababa outline */}
                  <polygon
                    points="200,30 280,50 340,110 370,180 320,250 210,280 120,260 50,190 70,100 130,40"
                    fill="var(--color-subtle)"
                    stroke="var(--color-line)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* Major Ring Road Axis */}
                  <circle cx="200" cy="150" r="85" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M 90,140 Q 200,160 330,130" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                  <path d="M 180,45 Q 210,150 220,270" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                </svg>

                {/* Scheme Markers */}
                {filteredSites.map((site, index) => {
                  const isSelected = activeSite?.id === site.id;
                  // Normalized positioning
                  const coordsMap: Record<string, { top: string; left: string }> = {
                    "site-gerji-highrise": { top: "52%", left: "68%" },
                    "site-kazanchis-quarter": { top: "45%", left: "50%" },
                    "site-lemi-kura-sunrise": { top: "35%", left: "78%" },
                    "site-kolfe-ringroad": { top: "50%", left: "28%" }
                  };
                  const pos = coordsMap[site.id] || { top: `${35 + index * 15}%`, left: `${30 + index * 15}%` };

                  return (
                    <button
                      key={site.id}
                      onClick={() => setSelectedSiteId(site.id)}
                      style={{ top: pos.top, left: pos.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all group z-10 cursor-pointer ${
                        isSelected 
                          ? "bg-[#00594C] text-white ring-4 ring-blue-100 dark:ring-blue-950 scale-125" 
                          : "bg-white text-[#00594C] border border-[#00594C] hover:scale-110 shadow-xs"
                      }`}
                      title={site.name}
                    >
                      <Building2 className="w-4 h-4" />
                      
                      {/* Tooltip on hover */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] font-semibold py-0.5 px-2 rounded whitespace-nowrap z-20 pointer-events-none">
                        {site.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Legend */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-[var(--color-slate)] bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-[var(--color-line)]">
                <span>Addis Ababa Metropolitan Area</span>
                <span className="font-mono-num">{filteredSites.length} Scheme Locations</span>
              </div>
            </div>

            {/* Scheme List Below Map */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredSites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSiteId(site.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    activeSite?.id === site.id
                      ? "border-[#00594C] bg-[#E8F5F1] dark:bg-[#1A1A1A]/80"
                      : "border-[var(--color-line)] hover:bg-[var(--color-subtle)]"
                  }`}
                >
                  <div className="font-bold text-xs text-[var(--color-ink)] truncate">
                    {site.name}
                  </div>
                  <div className="text-[11px] text-[var(--color-slate)] mt-0.5 flex items-center justify-between">
                    <span>{site.subCity}</span>
                    <span className="font-mono-num font-semibold text-emerald-600 dark:text-emerald-400">
                      {site.availableUnits} units available
                    </span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Selected Scheme Details & Action Workflow (5 cols on desktop) */}
        <div className={`lg:col-span-5 ${activeTab === "map" ? "block" : "block"}`}>
          {activeSite ? (
            <Card className="shadow-xs overflow-hidden">
              <div className="relative h-44 w-full bg-slate-100 dark:bg-[#1A1A1A] overflow-hidden">
                <img
                  src={activeSite.image}
                  alt={activeSite.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-white/90 dark:bg-[#121212]/90 text-xs font-semibold text-[#00594C] backdrop-blur-xs border border-[var(--color-line)]">
                  {activeSite.subCity} Sub-City
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg leading-snug">{activeSite.name}</CardTitle>
                <CardDescription className="text-xs">{activeSite.address}</CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-2 space-y-4">
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[var(--color-subtle)] dark:bg-[#1A1A1A]/50 text-center border border-[var(--color-line)]">
                  <div>
                    <div className="text-[10px] text-[var(--color-slate)] uppercase font-semibold">Blocks</div>
                    <div className="text-sm font-bold text-[var(--color-ink)] font-mono-num">{activeSite.totalBlocks}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--color-slate)] uppercase font-semibold">Total Units</div>
                    <div className="text-sm font-bold text-[var(--color-ink)] font-mono-num">{activeSite.totalUnits}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--color-slate)] uppercase font-semibold">Available</div>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono-num">{activeSite.availableUnits}</div>
                  </div>
                </div>

                {/* Monthly Rent Schedule */}
                <div>
                  <div className="text-xs text-[var(--color-slate)] font-medium mb-0.5">Municipal Rent Range</div>
                  <div className="text-sm font-bold text-[var(--color-ink)] font-mono-num">
                    {activeSite.priceRangeEtb}
                  </div>
                </div>

                {/* Key Site Features */}
                <div>
                  <div className="text-xs font-bold text-[var(--color-ink)] mb-1.5">Site Infrastructure & Amenities</div>
                  <div className="space-y-1">
                    {activeSite.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-slate)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continuation Workflows (Functional Map Rule) */}
                <div className="pt-2 border-t border-[var(--color-line)] space-y-2">
                  <Button
                    onClick={() => setRoute("rent")}
                    className="w-full bg-[#00594C] hover:bg-[#00473D] text-white text-xs font-semibold h-10 gap-2 shadow-xs"
                  >
                    <span>View Available Units in {activeSite.subCity}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setRoute("services")}
                    className="w-full text-xs font-semibold h-10 gap-2 border-[var(--color-line)] text-[var(--color-ink)]"
                  >
                    <span>Check Public Allocation Quotas</span>
                  </Button>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="p-8 text-center text-xs text-[var(--color-slate)] bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl">
              Select a scheme from the map to inspect specifications.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
