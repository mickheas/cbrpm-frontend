import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { PROPERTIES } from "../data/mockData";
import { PropertyCard } from "../components/PropertyCard";
import { 
  Building2, 
  SlidersHorizontal, 
  RotateCcw, 
  SearchX,
  MapPin,
  Layers
} from "lucide-react";
import { Button } from "../components/ui/button";

export const PropertiesRentPage: React.FC = () => {
  const { activeFilters, resetFilters, setRoute } = useApp();

  const [subCityFilter, setSubCityFilter] = useState<string>(activeFilters.subCity || "all");
  const [bedroomFilter, setBedroomFilter] = useState<number | "all">(
    activeFilters.bedrooms !== undefined && activeFilters.bedrooms !== null ? activeFilters.bedrooms : "all"
  );
  const [maxMonthlyPriceEtb, setMaxMonthlyPriceEtb] = useState<number>(120000);

  const subCities = [
    "all",
    "Bole",
    "Kirkos",
    "Yeka",
    "Lemi Kura",
    "Arada",
    "Kolfe Keranio",
    "Addis Ketema"
  ];

  const rentalProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (subCityFilter !== "all" && p.subCity.toLowerCase() !== subCityFilter.toLowerCase()) {
        return false;
      }
      if (bedroomFilter !== "all" && p.bedrooms !== bedroomFilter) {
        return false;
      }
      if (p.priceEtbMonthly > maxMonthlyPriceEtb) {
        return false;
      }
      return true;
    });
  }, [subCityFilter, bedroomFilter, maxMonthlyPriceEtb]);

  const handleReset = () => {
    setSubCityFilter("all");
    setBedroomFilter("all");
    setMaxMonthlyPriceEtb(120000);
    resetFilters();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00594C] uppercase tracking-wider mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Public Housing & Commercial Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
            Available Rental Properties
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-slate)] mt-1">
            Municipal residential apartments and commercial spaces available for statutory lease allocation.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setRoute("sites")}
          className="self-start sm:self-auto text-xs font-semibold gap-2 border-[var(--color-line)]"
        >
          <MapPin className="w-3.5 h-3.5 text-[#00594C]" />
          <span>View Sub-City Map</span>
        </Button>
      </div>

      {/* Filter Toolbar (Mobile-Friendly) */}
      <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-[#00594C]" />
            <span>Filter Inventory</span>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-medium text-[var(--color-slate)] hover:text-[#00594C] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Sub-City Filter */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-slate)] mb-1">
              Sub-City Area
            </label>
            <select
              value={subCityFilter}
              onChange={(e) => setSubCityFilter(e.target.value)}
              className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
            >
              {subCities.map((sc) => (
                <option key={sc} value={sc}>
                  {sc === "all" ? "All Sub-Cities" : `${sc} Sub-City`}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms Filter */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-slate)] mb-1">
              Bedroom Layout
            </label>
            <select
              value={bedroomFilter}
              onChange={(e) => setBedroomFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
            >
              <option value="all">Any Bedroom Count</option>
              <option value={2}>2 Bedrooms</option>
              <option value={3}>3 Bedrooms</option>
            </select>
          </div>

          {/* Max Monthly Rent */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-slate)] mb-1">
              <span>Max Monthly Rent (ETB)</span>
              <span className="font-mono-num font-bold text-[var(--color-ink)]">
                ETB {maxMonthlyPriceEtb.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={150000}
              step={5000}
              value={maxMonthlyPriceEtb}
              onChange={(e) => setMaxMonthlyPriceEtb(Number(e.target.value))}
              className="w-full accent-[#00594C] cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* Property Results List */}
      <div>
        <div className="text-xs text-[var(--color-slate)] mb-4">
          Showing <strong className="text-[var(--color-ink)]">{rentalProperties.length}</strong> available property units
        </div>

        {rentalProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl space-y-3 p-6">
            <SearchX className="w-10 h-10 text-[var(--color-slate)] mx-auto opacity-50" />
            <h3 className="font-bold text-base text-[var(--color-ink)]">No matching units found</h3>
            <p className="text-xs text-[var(--color-slate)] max-w-sm mx-auto">
              No municipal units currently match your selected filter criteria. Try adjusting your sub-city selection or maximum rent limit.
            </p>
            <Button onClick={handleReset} variant="outline" size="sm" className="text-xs">
              Reset Filters
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
