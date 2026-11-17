import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  X, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  CheckCircle2, 
  Send,
  Building2
} from "lucide-react";
import { Button } from "./ui/button";

export const PropertyDetailModal: React.FC = () => {
  const { 
    selectedProperty, 
    closePropertyModal, 
    formatPrice, 
    showToast 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Viewing form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+251 9");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefNumber, setSubmittedRefNumber] = useState<string | null>(null);

  if (!selectedProperty) return null;

  const displayPrice = formatPrice(selectedProperty.priceEtbMonthly || 0, "monthly");

  const handleSubmitViewing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ref = `AACA-${selectedProperty.subCity.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRefNumber(ref);
      showToast(`Viewing request registered. Reference ID: ${ref}`, "success");
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#121212] rounded-xl shadow-xl border border-[var(--color-line)] overflow-hidden flex flex-col"
        id="property-detail-modal"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[var(--color-line)] flex items-center justify-between gap-4 bg-[var(--color-subtle)] dark:bg-[#1A1A1A]/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-slate)] mb-0.5">
              <span className="font-semibold text-[#00594C]">{selectedProperty.subCity} Sub-City</span>
              <span>•</span>
              <span>{selectedProperty.neighborhood}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--color-ink)] leading-snug">
              {selectedProperty.title}
            </h2>
          </div>
          <button
            onClick={closePropertyModal}
            className="p-1.5 rounded-lg text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:bg-[var(--color-line)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">
          
          {/* Main Photo Gallery */}
          <div className="space-y-2">
            <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-[#1A1A1A]">
              <img
                src={selectedProperty.images[activeImageIndex] || selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? "border-[#00594C]" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[var(--color-subtle)] dark:bg-[#1A1A1A]/40 p-4 rounded-xl border border-[var(--color-line)]">
            <div>
              <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider font-semibold">Monthly Rent</div>
              <div className="text-base font-bold text-[var(--color-ink)] font-mono-num">{displayPrice}</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider font-semibold">Bedrooms</div>
              <div className="text-base font-bold text-[var(--color-ink)]">{selectedProperty.bedrooms} Bed</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider font-semibold">Floor Area</div>
              <div className="text-base font-bold text-[var(--color-ink)]">{selectedProperty.areaSqM} m²</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-wider font-semibold">Floor Level</div>
              <div className="text-base font-bold text-[var(--color-ink)]">Floor {selectedProperty.floor} of {selectedProperty.totalFloors}</div>
            </div>
          </div>

          {/* Property Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[var(--color-ink)]">Property Description</h3>
            <p className="text-xs sm:text-sm text-[var(--color-slate)] leading-relaxed">
              {selectedProperty.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[var(--color-ink)]">Key Municipal Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedProperty.features.map((feat, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-[var(--color-slate)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection / Viewing Request */}
          <div className="border-t border-[var(--color-line)] pt-6 space-y-3">
            <h3 className="font-bold text-sm text-[var(--color-ink)]">Schedule an On-Site Verification Viewing</h3>
            <p className="text-xs text-[var(--color-slate)]">
              Interested in this unit? Register with the Sub-City Property Desk to coordinate an on-site inspection visit.
            </p>

            {submittedRefNumber ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs space-y-1">
                <div className="font-bold text-emerald-800 dark:text-emerald-200">Viewing Request Confirmed</div>
                <div className="text-emerald-700 dark:text-emerald-300">
                  Your reference ID is <strong className="font-mono">{submittedRefNumber}</strong>. The {selectedProperty.subCity} depot staff will contact you at {phone}.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitViewing} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Legal Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-[var(--color-line)] bg-white dark:bg-[#1A1A1A] text-[var(--color-ink)] outline-none focus:border-[#00594C]"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00594C] text-white text-xs font-semibold h-9"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  <span>{isSubmitting ? "Registering..." : "Submit Viewing Request"}</span>
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
