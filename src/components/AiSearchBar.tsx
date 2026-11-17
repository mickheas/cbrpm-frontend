import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Search, 
  MapPin, 
  Layers, 
  ArrowRight,
  Filter
} from "lucide-react";
import { ParsedSearchFilters } from "../types";

export const AiSearchBar: React.FC = () => {
  const { applySearchFilters, searchQuery, setSearchQuery } = useApp();
  const [inputVal, setInputVal] = useState(searchQuery || "");
  const [selectedSubCity, setSelectedSubCity] = useState<string>("");

  const subCities = [
    "All Sub-Cities",
    "Bole",
    "Yeka",
    "Kirkos",
    "Arada",
    "Lemi Kura",
    "Addis Ketema",
    "Kolfe Keranio",
    "Nifas Silk-Lafto",
    "Gulele",
    "Lideta",
    "Akaki Kality"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: ParsedSearchFilters = {
      subCity: selectedSubCity && selectedSubCity !== "All Sub-Cities" ? selectedSubCity : null,
      keywords: inputVal ? [inputVal] : []
    };
    setSearchQuery(inputVal);
    applySearchFilters(filters, "rent");
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-xl p-2 sm:p-2.5 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[var(--color-subtle)] dark:bg-[#1A1A1A] rounded-lg">
          <Search className="w-4 h-4 text-[var(--color-slate)] shrink-0" />
          <input
            type="text"
            placeholder="Search by building name, neighborhood, or bedroom size..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-[var(--color-ink)] placeholder:text-[var(--color-slate)]"
          />
        </div>

        {/* Sub-City Selector */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-subtle)] dark:bg-[#1A1A1A] rounded-lg shrink-0">
          <MapPin className="w-4 h-4 text-[#00594C] shrink-0" />
          <select
            value={selectedSubCity}
            onChange={(e) => setSelectedSubCity(e.target.value)}
            className="text-xs sm:text-sm bg-transparent border-none outline-none text-[var(--color-ink)] font-medium cursor-pointer"
          >
            {subCities.map((sc) => (
              <option key={sc} value={sc} className="text-slate-900 bg-white dark:bg-[#121212] dark:text-slate-100">
                {sc}
              </option>
            ))}
          </select>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#00594C] hover:bg-[#00473D] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Find Properties</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </form>
  );
};
