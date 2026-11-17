import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FhcCopilot } from "./components/FhcCopilot";
import { PropertyDetailModal } from "./components/PropertyDetailModal";

// Pages
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { PropertiesRentPage } from "./pages/PropertiesRentPage";
import { SitesPage } from "./pages/SitesPage";
import { InspectionsPage } from "./pages/InspectionsPage";
import { RecordsPage } from "./pages/RecordsPage";
import { PortalLoginPage } from "./pages/PortalLoginPage";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const MainContent: React.FC = () => {
  const { route, toast, hideToast, isLoggedIn, currentUser } = useApp();

  const isPortalAppMode = route === "portal-login" && isLoggedIn;

  const renderCurrentPage = () => {
    switch (route) {
      case "home":
        return <HomePage />;
      case "services":
        return <ServicesPage />;
      case "rent":
        return <PropertiesRentPage />;
      case "sites":
        return <SitesPage />;
      case "inspections":
        return <InspectionsPage />;
      case "records":
        return <RecordsPage />;
      case "portal-login":
        return <PortalLoginPage />;
      default:
        return <HomePage />;
    }
  };

  // If user is inside the Authenticated Portal Application Shell:
  // Render the portal directly without the public website header and footer (Requirement 1)
  if (isPortalAppMode) {
    return (
      <div className="min-h-screen bg-[var(--color-base)] dark:bg-black text-[var(--color-ink)] antialiased">
        <PortalLoginPage />

        {/* Floating Copilot */}
        {currentUser?.role !== "resident" && <FhcCopilot />}

        {/* Toast Notification Container */}
        {toast && (
          <div className="fixed bottom-24 md:bottom-6 left-4 right-4 md:right-auto md:left-6 z-50 animate-slide-up md:max-w-sm">
            <div className={`p-4 rounded-xl shadow-xl border flex items-start gap-3 ${
              toast.type === "success"
                ? "bg-emerald-900 text-white border-emerald-700"
                : toast.type === "error"
                ? "bg-red-900 text-white border-red-700"
                : "bg-neutral-900 text-white border-neutral-700"
            }`}>
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-[#00A38C] shrink-0 mt-0.5" />}
              <div className="text-xs font-medium leading-snug flex-1">
                {toast.message}
              </div>
              <button onClick={hideToast} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Public Website Mode: Public Header + Content + Footer
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-base)] dark:bg-black text-[var(--color-ink)] antialiased">
      {/* Public Civic Header */}
      <Header />

      {/* Main Public Dynamic Viewport */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Public Institutional Footer */}
      <Footer />

      {/* Floating Copilot Assistant */}
      <FhcCopilot />

      {/* Property Detail & Viewing Modal */}
      <PropertyDetailModal />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 animate-slide-up max-w-sm">
          <div className={`p-4 rounded-xl shadow-xl border flex items-start gap-3 ${
            toast.type === "success"
              ? "bg-emerald-900 text-white border-emerald-700"
              : toast.type === "error"
              ? "bg-red-900 text-white border-red-700"
              : "bg-slate-900 text-white border-slate-700"
          }`}>
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            {toast.type === "info" && <Info className="w-5 h-5 text-[#00A38C] shrink-0 mt-0.5" />}
            <div className="text-xs font-medium leading-snug flex-1">
              {toast.message}
            </div>
            <button onClick={hideToast} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
