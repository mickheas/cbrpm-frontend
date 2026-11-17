export type UserRole = 
  | "resident" 
  | "property_manager" 
  | "executive" 
  | "finance_officer" 
  | "admin_officer" 
  | "maintenance_officer" 
  | "field_inspector" 
  | "admin";

export type Language = "en" | "am";

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
}

export interface Property {
  id: string;
  title: string;
  category: "government_standard" | "commercial_standard";
  subCity: string;
  neighborhood: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  priceEtbMonthly: number;
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  images: string[];
  floorPlanUrl?: string;
  description: string;
  features: string[];
  status: "available" | "reserved" | "allocation_pending";
}

export interface PropertySite {
  id: string;
  name: string;
  subCity: string;
  neighborhood: string;
  address: string;
  totalBlocks: number;
  totalUnits: number;
  availableUnits: number;
  type: "residential" | "commercial" | "mixed";
  priceRangeEtb: string;
  completionYear: number;
  coordinates: { lat: number; lng: number };
  status: "operational" | "ready_for_handover" | "under_expansion";
  keyFeatures: string[];
  image: string;
  propertyIds?: string[];
}

export interface UserSession {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  subCity: string;
  residenceName: string;
  leaseContractNo: string;
  monthlyRentEtb: number;
  category: string;
  approved: boolean;
  role: UserRole;
  faydaId?: string;
  ministryOrEmployer?: string;
  emergencyContact?: { name: string; phone: string; relation: string };
  avatarUrl?: string;
  notificationsEnabled?: boolean;
  twoFactorEnabled?: boolean;
  joinedDate?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: "allocation" | "lease" | "maintenance" | "records";
  description: string;
  eligibility: string;
  processingTime: string;
  requiredDocuments: string[];
  digitalEnabled: boolean;
}

export interface Branch {
  id: string;
  name: string;
  nameAm?: string;
  subCity: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  coordinates: { lat: number; lng: number };
  managedUnitsCount: number;
  manager: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  titleAm?: string;
  summary: string;
  summaryAm?: string;
  content: string;
  contentAm?: string;
  date: string;
  category: "Announcement" | "Directive" | "Tender" | "Tenant Notice";
  image: string;
  readTime: string;
}

export interface ParsedSearchFilters {
  subCity?: string | null;
  bedrooms?: number | null;
  maxPrice?: number | null;
  propertyType?: "all" | "residential" | "commercial";
  keywords?: string[];
}

// Payment Verification Record (Bank Deposit / Reference Verification)
export interface PaymentVerificationRecord {
  id: string;
  invoiceNo: string;
  period: string;
  dueDate: string;
  amountEtb: number;
  bankName: string;
  depositSlipNumber: string;
  paymentDate: string;
  submissionDate: string;
  verifiedDate?: string;
  verifiedBy?: string;
  status: "verified" | "pending_verification" | "action_required";
  clearanceVoucherNo?: string;
  depositSlipUrl?: string;
  notes?: string;
}

// Field Inspection Task
export interface FieldInspectionTask {
  id: string;
  buildingName: string;
  subCity: string;
  unitNumber: string;
  inspectionType: "Handover Survey" | "Defect Verification" | "Routine Safety" | "Pre-Lease Assessment";
  scheduledDate: string;
  priority: "Urgent" | "Standard" | "Scheduled";
  status: "pending" | "in_progress" | "passed" | "rectification_required";
  inspector: string;
  findings?: string;
  photosCount?: number;
  locationDetails: string;
}

// Allocation Application
export interface AllocationApplication {
  id: string;
  applicantName: string;
  faydaId: string;
  employer: string;
  subCityPreference: string;
  bedroomPreference: number;
  submissionDate: string;
  status: "submitted" | "under_review" | "approved" | "waitlisted";
  priorityScore: number;
}

// Building Property Manager: Managed Unit
export interface ManagedUnitRecord {
  id: string;
  buildingBlock: string;
  unitNumber: string;
  floor: number;
  bedroomCount: number;
  areaSqM: number;
  tenantName?: string;
  tenantPhone?: string;
  leaseId?: string;
  status: "occupied" | "vacant_ready" | "under_maintenance" | "allocation_pending";
  keyHandoverSigned: boolean;
  waterMeterReading: number;
  electricMeterReading: number;
  lastInspected: string;
}

// Executive: Sub-City Housing Scorecard
export interface SubCityHousingScorecard {
  id: string;
  subCityName: string;
  totalUnits: number;
  occupiedUnits: number;
  occupancyRate: number;
  monthlyRevenueTargetEtb: number;
  monthlyRevenueCollectedEtb: number;
  collectionRate: number;
  activeDefectsCount: number;
  avgResolutionDays: number;
  citizenSatisfactionScore: number;
  depotManager: string;
}

// Maintenance Officer: Dispatch Work Order
export interface DispatchWorkOrder {
  id: string;
  siteName: string;
  subCity: string;
  unitNumber: string;
  trade: "Plumbing" | "Electrical" | "Carpentry & Locks" | "Civil & Structural" | "Elevator" | "Roofing";
  reportedBy: string;
  reportedDate: string;
  priority: "Emergency" | "Urgent" | "Standard";
  status: "pending_dispatch" | "technician_en_route" | "in_progress" | "resolved" | "parts_ordered";
  assignedTechnician?: string;
  depotStation: string;
  estimatedCostEtb: number;
  slaTargetHours: number;
  slaRemainingHours: number;
  notes: string;
}

// Admin: System User Record
export interface AdminUserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  faydaId: string;
  staffId?: string;
  department: string;
  subCityOrSite: string;
  status: "active" | "suspended" | "pending_approval";
  lastLogin: string;
  twoFactorActive: boolean;
}

// Admin: System Audit Log
export interface SystemAuditLogEntry {
  id: string;
  timestamp: string;
  eventType: "AUTH_LOGIN" | "FAYDA_SSO" | "VOUCHER_VERIFIED" | "DIRECTIVE_UPDATED" | "ROLE_MODIFIED" | "USER_CREATED" | "EMERGENCY_DISPATCH";
  performedBy: string;
  ipAddress: string;
  subCity: string;
  details: string;
  severity: "info" | "warning" | "critical";
  signatureHash: string;
}
