import React from "react";
import { useApp } from "../context/AppContext";
import { Property } from "../types";
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  ArrowRight
} from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const { formatPrice, openPropertyModal } = useApp();

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(property);
    } else {
      openPropertyModal(property);
    }
  };

  const displayPrice = formatPrice(property.priceEtbMonthly || 0, "monthly");

  return (
    <div 
      className="bg-white dark:bg-[#121212] rounded-xl border border-[var(--color-line)] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
      id={`property-card-${property.id}`}
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-[var(--color-subtle)] border-b border-[var(--color-line)]">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/90 dark:bg-[#121212]/90 text-[var(--color-ink)] backdrop-blur-xs border border-[var(--color-line)]">
              {property.category === "commercial_standard" ? "Commercial / Mixed Unit" : "Public Residential Unit"}
            </span>

            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
              property.status === "available"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
            }`}>
              {property.status === "available" ? "Available for lease" : "Under review"}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-center gap-1 text-xs text-[var(--color-slate)] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#00594C]" />
              <span>{property.neighborhood}, {property.subCity}</span>
            </div>

            <h3 className="font-bold text-sm text-[var(--color-ink)] group-hover:text-[#00594C] transition-colors leading-snug">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--color-slate)] border-y border-[var(--color-line)] py-2">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{property.areaSqM} m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer / Price & Action */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-slate)] font-medium">Monthly Rent</div>
          <div className="text-sm font-bold text-[var(--color-ink)] font-mono-num">{displayPrice}</div>
        </div>

        <button
          onClick={handleCardClick}
          className="px-3 py-1.5 rounded-lg bg-[#E8F5F1] dark:bg-[#1A1A1A] text-[#00594C] dark:text-[#00A38C] hover:bg-[#00594C] hover:text-white dark:hover:bg-[#00594C] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
