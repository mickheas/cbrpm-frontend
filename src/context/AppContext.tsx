import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Property, 
  ParsedSearchFilters, 
  UserSession, 
  UserRole,
  PaymentVerificationRecord,
  FieldInspectionTask,
  AllocationApplication
} from "../types";
import { 
  DEFAULT_DEMO_USER, 
  DEMO_PROFILES, 
  MOCK_PAYMENT_VERIFICATIONS, 
  MOCK_FIELD_INSPECTIONS,
  MOCK_ALLOCATION_APPLICATIONS,
  PROPERTIES
} from "../data/mockData";

export type RouteName =
  | "home"
  | "services"
  | "rent"
  | "sites"
  | "inspections"
  | "records"
  | "about"
  | "contact"
  | "portal-login";

interface AppContextType {
  route: RouteName;
  setRoute: (route: RouteName) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: "am" | "en";
  setLanguage: (l: "am" | "en") => void;
  
  // Auth Session State
  currentUser: UserSession | null;
  isLoggedIn: boolean;
  login: (credentials?: { id?: string; password?: string; role?: UserRole }) => void;
  loginWithProfile: (profileKey: string) => void;
  switchPersona: (profileKey: string) => void;
  registerUser: (userData: Partial<UserSession>) => void;
  updateUserProfile: (updates: Partial<UserSession>) => void;
  logout: () => void;

  // Search & Filtering State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilters: ParsedSearchFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ParsedSearchFilters>>;
  applySearchFilters: (filters: ParsedSearchFilters, targetRoute?: RouteName) => void;
  resetFilters: () => void;
  
  // Property Detail Modal
  selectedProperty: Property | null;
  openPropertyModal: (property: Property) => void;
  closePropertyModal: () => void;

  // Property Sites & Map State
  selectedSiteId: string | null;
  setSelectedSiteId: (id: string | null) => void;
  selectedSubCity: string | null;
  setSelectedSubCity: (subCity: string | null) => void;

  // Payment Verification State & Handlers
  paymentVerifications: PaymentVerificationRecord[];
  submitPaymentSlip: (data: {
    invoiceNo: string;
    amountEtb: number;
    bankName: string;
    depositSlipNumber: string;
    paymentDate: string;
    notes?: string;
  }) => void;
  verifyPaymentSlip: (id: string, notes?: string) => void;

  // Field Inspections State & Handlers
  inspectionTasks: FieldInspectionTask[];
  updateInspectionTask: (id: string, updates: Partial<FieldInspectionTask>) => void;

  // Allocation Applications
  allocationApplications: AllocationApplication[];
  submitAllocationApplication: (app: Omit<AllocationApplication, "id" | "submissionDate" | "status" | "priorityScore">) => void;
  
  // Currency formatting (Pure ETB)
  formatPrice: (amountInEtb: number, period?: "monthly" | "total") => string;
  
  // Civic AI Desk Copilot Drawer State
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  
  // Toast notification
  toast: { message: string; type: "success" | "info" | "error" } | null;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteName>("home");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLangState] = useState<"am" | "en">(() => {
    try { return localStorage.getItem("cbrpm-lang") === "en" ? "en" : "am"; } catch { return "am"; }
  });
  const setLanguage = (l: "am" | "en") => {
    setLangState(l);
    try { localStorage.setItem("cbrpm-lang", l); } catch { /* ignore */ }
  };
  
  // Auth state initialized with demo user
  const [currentUser, setCurrentUser] = useState<UserSession | null>(DEFAULT_DEMO_USER);
  const isLoggedIn = currentUser !== null;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<ParsedSearchFilters>({
    subCity: null,
    bedrooms: null,
    maxPrice: null,
    propertyType: "all",
    keywords: []
  });
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedSubCity, setSelectedSubCity] = useState<string | null>(null);

  // Operational State
  const [paymentVerifications, setPaymentVerifications] = useState<PaymentVerificationRecord[]>(MOCK_PAYMENT_VERIFICATIONS);
  const [inspectionTasks, setInspectionTasks] = useState<FieldInspectionTask[]>(MOCK_FIELD_INSPECTIONS);
  const [allocationApplications, setAllocationApplications] = useState<AllocationApplication[]>(MOCK_ALLOCATION_APPLICATIONS);

  // Civic AI Desk Copilot Drawer State
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  // Sync dark mode class with root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const login = (credentials?: { id?: string; password?: string; role?: UserRole }) => {
    const idLower = credentials?.id?.toLowerCase() || "";
    if (credentials?.role && DEMO_PROFILES[credentials.role]) {
      const profile = DEMO_PROFILES[credentials.role];
      setCurrentUser(profile);
      showToast(`Signed in to ${profile.category} Portal.`, "success");
      return;
    }
    if (idLower.includes("adm") || idLower.includes("sys") || idLower.includes("solomon")) {
      setCurrentUser(DEMO_PROFILES.admin);
      showToast("Signed in as Chief System Administrator.", "success");
    } else if (idLower.includes("mgr") || idLower.includes("prop") || idLower.includes("martha")) {
      setCurrentUser(DEMO_PROFILES.property_manager);
      showToast("Signed in as Building & Property Manager.", "success");
    } else if (idLower.includes("exec") || idLower.includes("mayor") || idLower.includes("sisay")) {
      setCurrentUser(DEMO_PROFILES.executive);
      showToast("Signed in as City Management Executive.", "success");
    } else if (idLower.includes("fin") || idLower.includes("hanna") || idLower.includes("treasury")) {
      setCurrentUser(DEMO_PROFILES.finance_officer);
      showToast("Signed in as Tenancy & Finance Officer.", "success");
    } else if (idLower.includes("mnt") || idLower.includes("yonas") || idLower.includes("depot")) {
      setCurrentUser(DEMO_PROFILES.maintenance_officer);
      showToast("Signed in as Central Maintenance Dispatch Officer.", "success");
    } else if (idLower.includes("ins") || idLower.includes("worku")) {
      setCurrentUser(DEMO_PROFILES.field_inspector);
      showToast("Signed in as Municipal Building Inspector.", "success");
    } else {
      setCurrentUser(DEFAULT_DEMO_USER);
      showToast("Signed in to Resident Tenant Portal.", "success");
    }
  };

  const loginWithProfile = (profileKey: string) => {
    switchPersona(profileKey);
  };

  const switchPersona = (profileKey: string) => {
    const profile = DEMO_PROFILES[profileKey];
    if (profile) {
      setCurrentUser(profile);
      showToast(`Switched persona to ${profile.name} (${profile.category}).`, "info");
    }
  };

  const registerUser = (userData: Partial<UserSession>) => {
    const role = userData.role || "resident";
    const newSession: UserSession = {
      id: `usr-${Date.now().toString().slice(-5)}`,
      tenantId: `AACA-${role.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-5)}`,
      name: userData.name || "Registered User",
      email: userData.email || "user@addisproperty.gov.et",
      phone: userData.phone || "+251 91 000 0000",
      unit: userData.unit || "Assigned Scheme Unit",
      subCity: userData.subCity || "Kirkos Sub-City",
      residenceName: userData.residenceName || "Municipal Housing Portfolio",
      leaseContractNo: `REG-${Date.now().toString().slice(-6)}`,
      monthlyRentEtb: userData.monthlyRentEtb || (role === "resident" ? 14800 : 0),
      category: userData.category || (role === "resident" ? "Public Citizen / Civil Servant" : "Municipal Staff"),
      approved: true,
      role: role,
      faydaId: userData.faydaId || `FAYDA-ETH-${Date.now().toString().slice(-8)}`,
      ministryOrEmployer: userData.ministryOrEmployer || "Civil Service",
      notificationsEnabled: true,
      twoFactorEnabled: true,
      joinedDate: "August 2026"
    };
    setCurrentUser(newSession);
    showToast(`Registration verified. Welcome, ${newSession.name}!`, "success");
  };

  const updateUserProfile = (updates: Partial<UserSession>) => {
    setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    showToast("Profile settings updated successfully.", "success");
  };

  const logout = () => {
    setCurrentUser(null);
    setRoute("home");
    showToast("Signed out of CBRPM system.", "info");
  };

  const applySearchFilters = (filters: ParsedSearchFilters, targetRoute: RouteName = "rent") => {
    setActiveFilters(filters);
    setRoute(targetRoute);
  };

  const resetFilters = () => {
    setActiveFilters({
      subCity: null,
      bedrooms: null,
      maxPrice: null,
      propertyType: "all",
      keywords: []
    });
    setSearchQuery("");
  };

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property);
  };

  const closePropertyModal = () => {
    setSelectedProperty(null);
  };

  // Payment Verification Submission
  const submitPaymentSlip = (data: {
    invoiceNo: string;
    amountEtb: number;
    bankName: string;
    depositSlipNumber: string;
    paymentDate: string;
    notes?: string;
  }) => {
    const newRecord: PaymentVerificationRecord = {
      id: `pv-${Date.now()}`,
      invoiceNo: data.invoiceNo,
      period: "Current Period",
      dueDate: "05th of month",
      amountEtb: data.amountEtb,
      bankName: data.bankName,
      depositSlipNumber: data.depositSlipNumber,
      paymentDate: data.paymentDate,
      submissionDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "pending_verification",
      notes: data.notes || "Submitted by tenant via portal. Awaiting finance desk verification."
    };

    setPaymentVerifications(prev => [newRecord, ...prev]);
    showToast(`Bank deposit reference ${data.depositSlipNumber} submitted for municipal verification.`, "success");
  };

  // Finance Officer Verification
  const verifyPaymentSlip = (id: string, notes?: string) => {
    const voucher = `CBRPM-CLR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const verifiedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    
    setPaymentVerifications(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: "verified",
          verifiedDate,
          verifiedBy: currentUser ? currentUser.name : "Municipal Verifying Officer",
          clearanceVoucherNo: voucher,
          notes: notes || "Bank deposit confirmed against municipal account statement."
        };
      }
      return item;
    }));

    showToast(`Deposit verified! Official Clearance Voucher #${voucher} issued.`, "success");
  };

  // Field Inspection Status update
  const updateInspectionTask = (id: string, updates: Partial<FieldInspectionTask>) => {
    setInspectionTasks(prev => prev.map(task => {
      if (task.id === id) {
        return { ...task, ...updates };
      }
      return task;
    }));
    showToast(`Inspection ${id} status updated.`, "success");
  };

  // Allocation Application Submission
  const submitAllocationApplication = (app: Omit<AllocationApplication, "id" | "submissionDate" | "status" | "priorityScore">) => {
    const newApp: AllocationApplication = {
      id: `APP-2026-${Math.floor(5000 + Math.random() * 4000)}`,
      applicantName: app.applicantName,
      faydaId: app.faydaId,
      employer: app.employer,
      subCityPreference: app.subCityPreference,
      bedroomPreference: app.bedroomPreference,
      submissionDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "submitted",
      priorityScore: Math.floor(70 + Math.random() * 25)
    };
    setAllocationApplications(prev => [newApp, ...prev]);
    showToast(`Housing allocation application ${newApp.id} submitted for review.`, "success");
  };

  // Price Formatter (Pure ETB)
  const formatPrice = (amountInEtb: number, period: "monthly" | "total" = "monthly"): string => {
    const formattedNum = amountInEtb.toLocaleString("en-US");
    if (period === "monthly") {
      return `ETB ${formattedNum} / month`;
    }
    return `ETB ${formattedNum}`;
  };

  const showToast = (message: string, type: "success" | "info" | "error" = "info") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <AppContext.Provider
      value={{
        route,
        setRoute,
        darkMode,
        toggleDarkMode,
        language,
        setLanguage,
        currentUser,
        isLoggedIn,
        login,
        loginWithProfile,
        switchPersona,
        registerUser,
        updateUserProfile,
        logout,
        searchQuery,
        setSearchQuery,
        activeFilters,
        setActiveFilters,
        applySearchFilters,
        resetFilters,
        selectedProperty,
        openPropertyModal,
        closePropertyModal,
        selectedSiteId,
        setSelectedSiteId,
        selectedSubCity,
        setSelectedSubCity,
        paymentVerifications,
        submitPaymentSlip,
        verifyPaymentSlip,
        inspectionTasks,
        updateInspectionTask,
        allocationApplications,
        submitAllocationApplication,
        formatPrice,
        isCopilotOpen,
        setIsCopilotOpen,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
