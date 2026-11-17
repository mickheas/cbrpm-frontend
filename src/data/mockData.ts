import { 
  Property, 
  Branch, 
  NewsArticle, 
  ServiceItem, 
  PropertySite, 
  UserSession,
  PaymentVerificationRecord,
  FieldInspectionTask,
  AllocationApplication,
  ManagedUnitRecord,
  SubCityHousingScorecard,
  DispatchWorkOrder,
  AdminUserAccount,
  SystemAuditLogEntry
} from "../types";

export const DEFAULT_DEMO_USER: UserSession = {
  id: "usr-88412",
  tenantId: "AACA-T-88412",
  name: "Dr. Tewodros Kassahun",
  email: "tewodros.kassahun@addisproperty.gov.et",
  phone: "+251 91 123 4567",
  unit: "Unit B304 (Floor 3)",
  subCity: "Yeka Sub-City",
  residenceName: "Gerji City Public Housing Scheme",
  leaseContractNo: "AACA-LS-2024-88412",
  monthlyRentEtb: 18500,
  category: "Civil Servant Housing Quota (Ministry of Health)",
  approved: true,
  role: "resident",
  faydaId: "FAYDA-ETH-9941208",
  ministryOrEmployer: "Ministry of Health (Federal Hospital Directorate)",
  emergencyContact: {
    name: "Dr. Aster Mekonnen",
    phone: "+251 91 234 5678",
    relation: "Spouse"
  },
  notificationsEnabled: true,
  twoFactorEnabled: true,
  joinedDate: "September 2024"
};

export const DEMO_PROFILES: Record<string, UserSession> = {
  resident: DEFAULT_DEMO_USER,
  finance_officer: {
    id: "usr-44120",
    tenantId: "AACA-FIN-44120",
    name: "Hanna Girma",
    email: "hanna.girma@addisproperty.gov.et",
    phone: "+251 91 345 6789",
    unit: "Headquarters, Room 408",
    subCity: "Kirkos Sub-City",
    residenceName: "City Administration Finance Bureau",
    leaseContractNo: "STAFF-FIN-2022-04",
    monthlyRentEtb: 0,
    category: "Tenancy & Finance Desk Officer",
    approved: true,
    role: "finance_officer",
    faydaId: "FAYDA-GOV-4410291",
    ministryOrEmployer: "Addis Ababa City Administration Finance & Property Bureau",
    emergencyContact: {
      name: "Daniel Girma",
      phone: "+251 91 556 7890",
      relation: "Brother"
    },
    notificationsEnabled: true,
    twoFactorEnabled: true,
    joinedDate: "February 2022"
  },
  admin_officer: {
    id: "usr-44120",
    tenantId: "AACA-ADM-44120",
    name: "Hanna Girma",
    email: "hanna.girma@addisproperty.gov.et",
    phone: "+251 91 345 6789",
    unit: "Headquarters, Room 408",
    subCity: "Kirkos Sub-City",
    residenceName: "City Administration Finance Bureau",
    leaseContractNo: "STAFF-ADM-2022-04",
    monthlyRentEtb: 0,
    category: "Tenancy & Finance Desk Officer",
    approved: true,
    role: "finance_officer",
    faydaId: "FAYDA-GOV-4410291",
    ministryOrEmployer: "Addis Ababa City Administration Property Bureau",
    emergencyContact: {
      name: "Daniel Girma",
      phone: "+251 91 556 7890",
      relation: "Brother"
    },
    notificationsEnabled: true,
    twoFactorEnabled: true,
    joinedDate: "February 2022"
  },
  property_manager: {
    id: "usr-33901",
    tenantId: "AACA-MGR-33901",
    name: "W/ro Martha Desta",
    email: "martha.desta@addisproperty.gov.et",
    phone: "+251 91 456 7890",
    unit: "Gerji Estate Management Suite 101",
    subCity: "Yeka Sub-City",
    residenceName: "Gerji & Bole Public Schemes",
    leaseContractNo: "STAFF-MGR-2021-12",
    monthlyRentEtb: 0,
    category: "Senior Property & Building Manager",
    approved: true,
    role: "property_manager",
    faydaId: "FAYDA-GOV-3390114",
    ministryOrEmployer: "Addis Ababa Housing Development & Property Administration Agency",
    emergencyContact: {
      name: "Henok Tefera",
      phone: "+251 91 223 9988",
      relation: "Spouse"
    },
    notificationsEnabled: true,
    twoFactorEnabled: true,
    joinedDate: "August 2021"
  },
  executive: {
    id: "usr-10001",
    tenantId: "AACA-EXEC-10001",
    name: "Hon. Dr. Sisay Kebede",
    email: "sisay.kebede@addisproperty.gov.et",
    phone: "+251 91 001 2233",
    unit: "Mayor's Executive Complex, Fl 6",
    subCity: "Arada Sub-City",
    residenceName: "Addis Ababa City Administration HQ",
    leaseContractNo: "STAFF-CAB-2020-01",
    monthlyRentEtb: 0,
    category: "Executive / Head of Housing Bureau",
    approved: true,
    role: "executive",
    faydaId: "FAYDA-GOV-1000100",
    ministryOrEmployer: "Addis Ababa City Administration Cabinet",
    emergencyContact: {
      name: "Selamawit Sisay",
      phone: "+251 91 334 1122",
      relation: "Spouse"
    },
    notificationsEnabled: true,
    twoFactorEnabled: true,
    joinedDate: "January 2020"
  },
  maintenance_officer: {
    id: "usr-55204",
    tenantId: "AACA-MNT-55204",
    name: "Eng. Yonas Tadesse",
    email: "yonas.tadesse@addisproperty.gov.et",
    phone: "+251 91 765 4321",
    unit: "Central Maintenance Depot Desk 1",
    subCity: "Kirkos & Bole Sub-Cities",
    residenceName: "Municipal Maintenance & Logistics Depot",
    leaseContractNo: "STAFF-MNT-2022-08",
    monthlyRentEtb: 0,
    category: "Central Maintenance Dispatch Officer",
    approved: true,
    role: "maintenance_officer",
    faydaId: "FAYDA-GOV-5520489",
    ministryOrEmployer: "City Administration Infrastructure & Facility Maintenance Bureau",
    emergencyContact: {
      name: "Alemayehu Tadesse",
      phone: "+251 91 665 4433",
      relation: "Brother"
    },
    notificationsEnabled: true,
    twoFactorEnabled: true,
    joinedDate: "November 2022"
  },
  field_inspector: {
    id: "usr-77310",
    tenantId: "AACA-INS-77310",
    name: "Eng. Worku Mengesha",
    email: "worku.mengesha@addisproperty.gov.et",
    phone: "+251 91 887 6543",
    unit: "Sub-City Depot Desk 02",
    subCity: "Yeka & Kirkos Sub-Cities",
    residenceName: "Municipal Engineering Inspection Unit",
    leaseContractNo: "STAFF-INS-2023-09",
    monthlyRentEtb: 0,
    category: "Senior Municipal Building & Defect Inspector",
    approved: true,
    role: "field_inspector",
    faydaId: "FAYDA-GOV-1109432",
    ministryOrEmployer: "Addis Ababa City Administration Building Bureau",
    emergencyContact: {
      name: "Tigist Worku",
      phone: "+251 91 998 1234",
      relation: "Daughter"
    },
    notificationsEnabled: true,
    twoFactorEnabled: false,
    joinedDate: "March 2023"
  },
  admin: {
    id: "usr-99000",
    tenantId: "AACA-SYS-99000",
    name: "Ato Solomon Hailu",
    email: "solomon.hailu@addisproperty.gov.et",
    phone: "+251 91 222 3344",
    unit: "Data Center & Systems Bureau, Room 204",
    subCity: "Arada Sub-City",
    residenceName: "City IT & Electronic Governance Directorate",
    leaseContractNo: "STAFF-SYS-2019-02",
    monthlyRentEtb: 0,
    category: "Chief System Administrator",
    approved: true,
    role: "admin",
    faydaId: "FAYDA-GOV-9900088",
    ministryOrEmployer: "Addis Ababa Innovation & Technology Bureau",
    emergencyContact: {
      name: "Rahel Solomon",
      phone: "+251 91 445 6677",
      relation: "Spouse"
    },
    notificationsEnabled: true,
    twoFactorEnabled: true,
    joinedDate: "April 2019"
  }
};

// Payment Verification Records (Bank Deposit / Reference Verification)
export const MOCK_PAYMENT_VERIFICATIONS: PaymentVerificationRecord[] = [
  {
    id: "pv-01",
    invoiceNo: "INV-2026-09-8841",
    period: "September 2026",
    dueDate: "05 Sep 2026",
    amountEtb: 18500,
    bankName: "Commercial Bank of Ethiopia (CBE)",
    depositSlipNumber: "CBE-DEP-2026-994102",
    paymentDate: "03 Sep 2026",
    submissionDate: "03 Sep 2026",
    status: "pending_verification",
    notes: "Slip uploaded via CBE Mobile Banking branch transfer. Pending finance officer confirmation."
  },
  {
    id: "pv-02",
    invoiceNo: "INV-2026-08-8841",
    period: "August 2026",
    dueDate: "05 Aug 2026",
    amountEtb: 18500,
    bankName: "Commercial Bank of Ethiopia (CBE)",
    depositSlipNumber: "CBE-DEP-2026-881944",
    paymentDate: "02 Aug 2026",
    submissionDate: "02 Aug 2026",
    verifiedDate: "03 Aug 2026",
    verifiedBy: "Hanna Girma (Finance Desk)",
    status: "verified",
    clearanceVoucherNo: "CBRPM-CLR-2026-08-412",
    notes: "Matched against municipal treasury statement account #10001847291."
  },
  {
    id: "pv-03",
    invoiceNo: "INV-2026-07-8841",
    period: "July 2026",
    dueDate: "05 Jul 2026",
    amountEtb: 18500,
    bankName: "Awash Bank (Finbar Branch)",
    depositSlipNumber: "AWB-SLP-440182",
    paymentDate: "03 Jul 2026",
    submissionDate: "03 Jul 2026",
    verifiedDate: "04 Jul 2026",
    verifiedBy: "Hanna Girma (Finance Desk)",
    status: "verified",
    clearanceVoucherNo: "CBRPM-CLR-2026-07-391",
    notes: "Deposit verified and cleared in full."
  },
  {
    id: "pv-04",
    invoiceNo: "INV-2026-06-8841",
    period: "June 2026",
    dueDate: "05 Jun 2026",
    amountEtb: 18500,
    bankName: "Commercial Bank of Ethiopia (CBE)",
    depositSlipNumber: "CBE-DEP-2026-662910",
    paymentDate: "01 Jun 2026",
    submissionDate: "01 Jun 2026",
    verifiedDate: "02 Jun 2026",
    verifiedBy: "Mulugeta Assefa (Treasury)",
    status: "verified",
    clearanceVoucherNo: "CBRPM-CLR-2026-06-118",
    notes: "Direct bank deposit verified."
  }
];

// Field Inspection Tasks
export const MOCK_FIELD_INSPECTIONS: FieldInspectionTask[] = [
  {
    id: "INS-2026-104",
    buildingName: "Gerji City Residences Block 3",
    subCity: "Yeka Sub-City",
    unitNumber: "Unit B304",
    inspectionType: "Defect Verification",
    scheduledDate: "19 Sep 2026",
    priority: "Urgent",
    status: "in_progress",
    inspector: "Eng. Worku Mengesha",
    locationDetails: "Floor 3 service riser shaft valve inspection",
    findings: "Minor pressure drop reported on main bathroom valve. Washer replaced; testing riser pressure.",
    photosCount: 2
  },
  {
    id: "INS-2026-098",
    buildingName: "Lemi Kura Sunrise Scheme Block 7",
    subCity: "Lemi Kura",
    unitNumber: "Units 101-112 (Floor 1)",
    inspectionType: "Handover Survey",
    scheduledDate: "20 Sep 2026",
    priority: "Standard",
    status: "pending",
    inspector: "Eng. Worku Mengesha",
    locationDetails: "Ground floor residential entrance & utility meters",
    findings: "Pre-occupancy structural checklist and sub-meter serial number verification.",
    photosCount: 0
  },
  {
    id: "INS-2026-087",
    buildingName: "Bole Central Civic Tower",
    subCity: "Bole",
    unitNumber: "Floor 4 Public Corridor",
    inspectionType: "Routine Safety",
    scheduledDate: "17 Sep 2026",
    priority: "Standard",
    status: "passed",
    inspector: "Eng. Worku Mengesha",
    locationDetails: "Fire hose reel pressure and emergency stairwell exit lighting",
    findings: "All emergency egress paths clear. Fire extinguishers serviced until March 2027.",
    photosCount: 4
  },
  {
    id: "INS-2026-074",
    buildingName: "Kirkos Mixed Use Plaza",
    subCity: "Kirkos",
    unitNumber: "Unit 204",
    inspectionType: "Pre-Lease Assessment",
    scheduledDate: "14 Sep 2026",
    priority: "Scheduled",
    status: "rectification_required",
    inspector: "Eng. Worku Mengesha",
    locationDetails: "Balcony drainage slope and ceiling plaster",
    findings: "Water runoff drain blocked with cement residue. Contractor notified to rectify before tenant handover.",
    photosCount: 3
  }
];

// Allocation Applications
export const MOCK_ALLOCATION_APPLICATIONS: AllocationApplication[] = [
  {
    id: "APP-2026-4481",
    applicantName: "Almaz Bekele Hailu",
    faydaId: "FAYDA-ETH-3310492",
    employer: "Ministry of Innovation & Technology",
    subCityPreference: "Yeka Sub-City",
    bedroomPreference: 2,
    submissionDate: "10 Sep 2026",
    status: "under_review",
    priorityScore: 84
  },
  {
    id: "APP-2026-4478",
    applicantName: "Kassahun Tilahun",
    faydaId: "FAYDA-ETH-7718293",
    employer: "Addis Ababa Transport Bureau",
    subCityPreference: "Bole Sub-City",
    bedroomPreference: 3,
    submissionDate: "08 Sep 2026",
    status: "approved",
    priorityScore: 92
  },
  {
    id: "APP-2026-4465",
    applicantName: "Selamawit Desta",
    faydaId: "FAYDA-ETH-5510294",
    employer: "Federal Civil Service Commission",
    subCityPreference: "Kirkos Sub-City",
    bedroomPreference: 1,
    submissionDate: "01 Sep 2026",
    status: "waitlisted",
    priorityScore: 71
  }
];

export const PROPERTIES: Property[] = [
  {
    id: "prop-bole-gerji-01",
    title: "Gerji City Heights - 3-Bedroom Public Rental",
    category: "commercial_standard",
    subCity: "Bole",
    neighborhood: "Gerji / Imperial",
    address: "Gerji Main Ave, Next to Jackros Village, Addis Ababa",
    coordinates: { lat: 8.9982, lng: 38.8041 },
    priceEtbMonthly: 95000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqM: 168,
    floor: 8,
    totalFloors: 14,
    yearBuilt: 2024,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlanUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    description: "Constructed under the City Administration urban renewal program, this modern public rental residence features panoramic city views, engineered hardwood finishes, backup solar generators, and digital lease administration.",
    features: [
      "Dual backup power generators",
      "Central water reservoir (40,000L) & booster system",
      "Sub-city facility maintenance depot on site",
      "Electronic access control"
    ],
    status: "available"
  },
  {
    id: "prop-kazanchis-02",
    title: "Kazanchis Municipal Enclave - 2-Bed Public Flat",
    category: "government_standard",
    subCity: "Kirkos",
    neighborhood: "Kazanchis",
    address: "Menelik II Avenue, Kazanchis, Addis Ababa",
    coordinates: { lat: 9.0195, lng: 38.7634 },
    priceEtbMonthly: 42000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqM: 110,
    floor: 4,
    totalFloors: 10,
    yearBuilt: 2023,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Centrally positioned near public institutions with walking access to the light rail corridor, smart sub-metering, and structured civil service tenancy agreements.",
    features: [
      "Light rail corridor transit access",
      "Sub-metered electricity & water connections",
      "Underground secure parking",
      "Civil servant lease support"
    ],
    status: "available"
  },
  {
    id: "prop-yeka-gerji-03",
    title: "Yeka Civil Servants Residence - 2-Bed Standard Unit",
    category: "government_standard",
    subCity: "Yeka",
    neighborhood: "Megenagna / Shola",
    address: "Yeka Sub-City Sector 4, Addis Ababa",
    coordinates: { lat: 9.0280, lng: 38.7890 },
    priceEtbMonthly: 18500,
    bedrooms: 2,
    bathrooms: 1,
    areaSqM: 88,
    floor: 3,
    totalFloors: 6,
    yearBuilt: 2022,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b9ba237?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Standard municipal public employee residential flat featuring reliable municipal water connectivity, quiet courtyard, and immediate access to primary public schools.",
    features: [
      "Standard municipal rent schedule",
      "Courtyard playground & community room",
      "Direct municipal depot support",
      "Public bus route connectivity"
    ],
    status: "available"
  },
  {
    id: "prop-lemi-kura-04",
    title: "Lemi Kura Urban Expansion - 3-Bed Family Unit",
    category: "government_standard",
    subCity: "Lemi Kura",
    neighborhood: "Ayat / Lemi",
    address: "Ayat Zone 3, Lemi Kura Sub-City, Addis Ababa",
    coordinates: { lat: 9.0340, lng: 38.8520 },
    priceEtbMonthly: 24000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqM: 125,
    floor: 2,
    totalFloors: 5,
    yearBuilt: 2023,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Spacious suburban city residence designed for larger families with generous balcony space, dedicated storage room, and nearby health center.",
    features: [
      "Family-oriented residential block",
      "Dedicated utility drying balconies",
      "Near municipal health center",
      "Solar corridor lighting"
    ],
    status: "available"
  }
];

export const PROPERTY_SITES: PropertySite[] = [
  {
    id: "site-gerji-highrise",
    name: "Gerji City Public Housing Scheme",
    subCity: "Yeka",
    neighborhood: "Gerji",
    address: "Imperial – Jackros Corridor, Yeka, Addis Ababa",
    totalBlocks: 6,
    totalUnits: 720,
    availableUnits: 18,
    type: "residential",
    priceRangeEtb: "ETB 18,500 – ETB 45,000 / month",
    completionYear: 2023,
    coordinates: { lat: 8.9982, lng: 38.8041 },
    status: "operational",
    keyFeatures: [
      "Sub-city maintenance depot on-site",
      "Backup generators for water pumps & lifts",
      "Public primary school within 300m"
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "site-kazanchis-quarter",
    name: "Kazanchis Civic Enclave",
    subCity: "Kirkos",
    neighborhood: "Kazanchis",
    address: "Menelik II Avenue, Kirkos, Addis Ababa",
    totalBlocks: 4,
    totalUnits: 480,
    availableUnits: 12,
    type: "mixed",
    priceRangeEtb: "ETB 35,000 – ETB 65,000 / month",
    completionYear: 2024,
    coordinates: { lat: 9.0195, lng: 38.7634 },
    status: "operational",
    keyFeatures: [
      "Transit-adjacent city location",
      "Dedicated sub-metering infrastructure",
      "Underground secure parking"
    ],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "site-lemi-kura-sunrise",
    name: "Lemi Kura Sunrise Residences",
    subCity: "Lemi Kura",
    neighborhood: "Ayat / Lemi",
    address: "Ayat Zone 3, Lemi Kura, Addis Ababa",
    totalBlocks: 8,
    totalUnits: 960,
    availableUnits: 34,
    type: "residential",
    priceRangeEtb: "ETB 18,000 – ETB 32,000 / month",
    completionYear: 2023,
    coordinates: { lat: 9.0340, lng: 38.8520 },
    status: "operational",
    keyFeatures: [
      "Large family apartment blocks",
      "Dedicated green parks and sports field",
      "Direct connection to eastern bus hub"
    ],
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "site-kolfe-ringroad",
    name: "Kolfe Gateway Scheme",
    subCity: "Kolfe Keranio",
    neighborhood: "Tor Hailoch / Kolfe",
    address: "Ring Road Sector 3, Kolfe Keranio, Addis Ababa",
    totalBlocks: 5,
    totalUnits: 560,
    availableUnits: 25,
    type: "residential",
    priceRangeEtb: "ETB 16,000 – ETB 28,000 / month",
    completionYear: 2022,
    coordinates: { lat: 9.0150, lng: 38.7050 },
    status: "operational",
    keyFeatures: [
      "Ring road transit access",
      "Civil servant subsidized quotas",
      "Fire safety sprinkler systems"
    ],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "srv-allocation",
    title: "Public Housing Allocation",
    category: "allocation",
    description: "Application and quota scoring for eligible civil servants, public agency employees, and priority municipal allotments.",
    eligibility: "Permanent public servants, verified civil servants, or approved public agency personnel.",
    processingTime: "15-20 business days",
    requiredDocuments: [
      "National Fayda Identification ID",
      "Verified Public Employment Certificate",
      "Official Housing Bureau Eligibility Assessment"
    ],
    digitalEnabled: true
  },
  {
    id: "srv-lease",
    title: "Statutory Tenancy Agreements",
    category: "lease",
    description: "Execution, digital signing, and renewal of municipal lease contracts under City Administration guidelines.",
    eligibility: "Approved allocation beneficiaries and existing municipal tenants.",
    processingTime: "2-3 business days",
    requiredDocuments: [
      "Allotment Confirmation Letter",
      "Signed Tenancy Terms and Conditions",
      "Emergency Contact & Witness Form"
    ],
    digitalEnabled: true
  },
  {
    id: "srv-maintenance",
    title: "Depot Maintenance & Defect Triage",
    category: "maintenance",
    description: "Reporting and triage of plumbing, electrical, elevator, and structural defects dispatched to sub-city depots.",
    eligibility: "Active residents of City Administration managed properties.",
    processingTime: "Emergency: 4 hours | Standard: 48 hours",
    requiredDocuments: [
      "Active Tenancy Contract Number",
      "Defect Description and Unit Location",
      "Unit Access Permission"
    ],
    digitalEnabled: true
  },
  {
    id: "srv-verification",
    title: "Payment Slip Verification",
    category: "records",
    description: "Verification and matching of commercial bank deposit slips or CBE transfer references for rent settlement clearance.",
    eligibility: "Active municipal tenants.",
    processingTime: "1-2 business days",
    requiredDocuments: [
      "Bank Deposit Slip or Electronic Transaction Reference",
      "Lease Contract Invoice Reference",
      "Depositor Identification"
    ],
    digitalEnabled: true
  }
];

export const BRANCHES: Branch[] = [
  {
    id: "br-yeka",
    name: "Yeka Sub-City Property & Depot Office",
    subCity: "Yeka",
    address: "Around Megenagna, Yeka Sub-City Hall Complex",
    phone: "+251 116 67 02 11",
    email: "yeka.depot@addisproperty.gov.et",
    workingHours: "Mon – Fri: 8:30 AM – 5:30 PM",
    coordinates: { lat: 9.0280, lng: 38.7890 },
    managedUnitsCount: 14200,
    manager: "Ato Daniel Assefa"
  },
  {
    id: "br-kirkos",
    name: "Kirkos Sub-City Property Office",
    subCity: "Kirkos",
    address: "Near Mexico Square, Kirkos Administrative Bureau",
    phone: "+251 115 52 44 80",
    email: "kirkos.depot@addisproperty.gov.et",
    workingHours: "Mon – Fri: 8:30 AM – 5:30 PM",
    coordinates: { lat: 9.0110, lng: 38.7520 },
    managedUnitsCount: 11800,
    manager: "W/ro Aster Hailu"
  },
  {
    id: "br-bole",
    name: "Bole Sub-City Property Management",
    subCity: "Bole",
    address: "Bole Medhanialem Corridor, Bole Sub-City Office",
    phone: "+251 116 61 90 22",
    email: "bole.depot@addisproperty.gov.et",
    workingHours: "Mon – Fri: 8:30 AM – 5:30 PM",
    coordinates: { lat: 8.9950, lng: 38.7860 },
    managedUnitsCount: 18500,
    manager: "Ato Yohannes Bekele"
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-01",
    title: "City Administration Launches Digital Payment Verification Portal",
    summary: "Tenants can now submit bank deposit references and mobile transaction slips online for direct municipal ledger verification.",
    content: "Under the directive of Addis Ababa City Administration, the City Building & Rental Property Management System now provides a dedicated portal where tenants can submit deposit references from any commercial bank for municipal finance clearance.",
    date: "15 Sep 2026",
    category: "Directive",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    readTime: "3 min read"
  },
  {
    id: "news-02",
    title: "Comprehensive Structural & Fire Safety Audits in Yeka and Bole Schemes",
    summary: "Municipal building inspectors conduct multi-point condition surveys to ensure tenant safety and timely preventative maintenance.",
    content: "A joint inspection task force has commenced physical building assessments covering elevator risers, emergency pumps, and common corridor systems across over 40 public housing blocks.",
    date: "10 Sep 2026",
    category: "Announcement",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read"
  },
  {
    id: "news-03",
    title: "Civil Service Housing Allocation Review for Fiscal Year 2026/27",
    summary: "Transparency scoring criteria published for ministries and public agencies allotted residential units under municipal quota.",
    content: "The City Administration has released the updated quota evaluation framework, ensuring transparent prioritization based on service tenure, verified housing need, and public sector contribution.",
    date: "04 Sep 2026",
    category: "Tenant Notice",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    readTime: "3 min read"
  }
];

export const IMPACT_STATS = [
  {
    label: "Total Administered Units",
    labelAm: "የሚተዳደሩ ቤቶች ድምር",
    value: "72,400+",
    description: "Public residential and commercial buildings across all 11 sub-cities."
  },
  {
    label: "Civil Service Allocation",
    labelAm: "የመንግሥት ሠራተኞች ድልድል",
    value: "45,000+",
    description: "Units dedicated to federal ministry and civic agency personnel."
  },
  {
    label: "Municipal Depots",
    labelAm: "የጥገና ዲፖዎች",
    value: "11 Active",
    description: "Operational maintenance workshops responding to defect tickets."
  },
  {
    label: "Occupancy Rate",
    labelAm: "የይዞታ ምጣኔ",
    value: "98.2%",
    description: "Active lease agreements verified under statutory city directives."
  },
  {
    label: "Average Triage Time",
    labelAm: "አማካይ የመፍትሔ ጊዜ",
    value: "2.8 Days",
    description: "Depot engineer dispatch for verified plumbing and electrical defects."
  },
  {
    label: "Payment Verification",
    labelAm: "የክፍያ ማረጋገጫ",
    value: "100%",
    description: "Reconciled with Commercial Bank of Ethiopia treasury accounts."
  }
];

// ─────────────────────────────────────────────────────────────
// BUILDING & PROPERTY MANAGER DATA
// ─────────────────────────────────────────────────────────────
export const MOCK_MANAGED_UNITS: ManagedUnitRecord[] = [
  {
    id: "UNIT-GER-B1-101",
    buildingBlock: "Gerji Block 04",
    unitNumber: "101",
    floor: 1,
    bedroomCount: 2,
    areaSqM: 84.5,
    tenantName: "Dr. Tewodros Kassahun",
    tenantPhone: "+251 91 123 4567",
    leaseId: "AACA-LEASE-2024-8842",
    status: "occupied",
    keyHandoverSigned: true,
    waterMeterReading: 412.8,
    electricMeterReading: 12480,
    lastInspected: "14 Jul 2026"
  },
  {
    id: "UNIT-GER-B1-102",
    buildingBlock: "Gerji Block 04",
    unitNumber: "102",
    floor: 1,
    bedroomCount: 3,
    areaSqM: 112.0,
    tenantName: "W/ro Almaz Tadesse",
    tenantPhone: "+251 91 234 5678",
    leaseId: "AACA-LEASE-2023-7721",
    status: "occupied",
    keyHandoverSigned: true,
    waterMeterReading: 589.2,
    electricMeterReading: 18940,
    lastInspected: "02 Jun 2026"
  },
  {
    id: "UNIT-GER-B1-201",
    buildingBlock: "Gerji Block 04",
    unitNumber: "201",
    floor: 2,
    bedroomCount: 2,
    areaSqM: 84.5,
    status: "vacant_ready",
    keyHandoverSigned: false,
    waterMeterReading: 320.0,
    electricMeterReading: 8900,
    lastInspected: "10 Aug 2026"
  },
  {
    id: "UNIT-GER-B1-202",
    buildingBlock: "Gerji Block 04",
    unitNumber: "202",
    floor: 2,
    bedroomCount: 2,
    areaSqM: 84.5,
    tenantName: "Ato Dawit Haile",
    tenantPhone: "+251 91 345 6789",
    leaseId: "AACA-LEASE-2025-9012",
    status: "occupied",
    keyHandoverSigned: true,
    waterMeterReading: 478.4,
    electricMeterReading: 14120,
    lastInspected: "18 May 2026"
  },
  {
    id: "UNIT-GER-B2-301",
    buildingBlock: "Gerji Block 05",
    unitNumber: "301",
    floor: 3,
    bedroomCount: 1,
    areaSqM: 62.0,
    status: "under_maintenance",
    keyHandoverSigned: false,
    waterMeterReading: 215.6,
    electricMeterReading: 6700,
    lastInspected: "19 Aug 2026"
  },
  {
    id: "UNIT-GER-B2-302",
    buildingBlock: "Gerji Block 05",
    unitNumber: "302",
    floor: 3,
    bedroomCount: 3,
    areaSqM: 118.0,
    tenantName: "Dr. Aster Bekele",
    tenantPhone: "+251 91 567 8901",
    leaseId: "AACA-LEASE-2022-6410",
    status: "occupied",
    keyHandoverSigned: true,
    waterMeterReading: 710.1,
    electricMeterReading: 21450,
    lastInspected: "28 Jun 2026"
  },
  {
    id: "UNIT-BOL-B1-104",
    buildingBlock: "Bole Atlas Block 02",
    unitNumber: "104",
    floor: 1,
    bedroomCount: 2,
    areaSqM: 92.0,
    status: "allocation_pending",
    keyHandoverSigned: false,
    waterMeterReading: 110.0,
    electricMeterReading: 4500,
    lastInspected: "12 Aug 2026"
  },
  {
    id: "UNIT-BOL-B1-205",
    buildingBlock: "Bole Atlas Block 02",
    unitNumber: "205",
    floor: 2,
    bedroomCount: 3,
    areaSqM: 125.0,
    tenantName: "Ato Biruk Tesfaye",
    tenantPhone: "+251 91 889 0011",
    leaseId: "AACA-LEASE-2024-8390",
    status: "occupied",
    keyHandoverSigned: true,
    waterMeterReading: 390.5,
    electricMeterReading: 15300,
    lastInspected: "05 Jul 2026"
  }
];

// ─────────────────────────────────────────────────────────────
// CITY MANAGEMENT (EXECUTIVE) SCORECARD DATA
// ─────────────────────────────────────────────────────────────
export const MOCK_EXECUTIVE_SCORECARDS: SubCityHousingScorecard[] = [
  {
    id: "SC-BOLE",
    subCityName: "Bole Sub-City (ቦሌ)",
    totalUnits: 14850,
    occupiedUnits: 14610,
    occupancyRate: 98.4,
    monthlyRevenueTargetEtb: 245000000,
    monthlyRevenueCollectedEtb: 242800000,
    collectionRate: 99.1,
    activeDefectsCount: 18,
    avgResolutionDays: 2.1,
    citizenSatisfactionScore: 94.5,
    depotManager: "Eng. Henok Tilahun"
  },
  {
    id: "SC-YEKA",
    subCityName: "Yeka Sub-City (የካ)",
    totalUnits: 11200,
    occupiedUnits: 10980,
    occupancyRate: 98.0,
    monthlyRevenueTargetEtb: 168000000,
    monthlyRevenueCollectedEtb: 164200000,
    collectionRate: 97.7,
    activeDefectsCount: 24,
    avgResolutionDays: 2.6,
    citizenSatisfactionScore: 91.8,
    depotManager: "Eng. Worku Mengesha"
  },
  {
    id: "SC-KIRKOS",
    subCityName: "Kirkos Sub-City (ቂርቆስ)",
    totalUnits: 8900,
    occupiedUnits: 8750,
    occupancyRate: 98.3,
    monthlyRevenueTargetEtb: 155000000,
    monthlyRevenueCollectedEtb: 153500000,
    collectionRate: 99.0,
    activeDefectsCount: 14,
    avgResolutionDays: 1.9,
    citizenSatisfactionScore: 95.0,
    depotManager: "Eng. Solomon Dibaba"
  },
  {
    id: "SC-ARADA",
    subCityName: "Arada Sub-City (አራዳ)",
    totalUnits: 6200,
    occupiedUnits: 6090,
    occupancyRate: 98.2,
    monthlyRevenueTargetEtb: 98000000,
    monthlyRevenueCollectedEtb: 96100000,
    collectionRate: 98.1,
    activeDefectsCount: 16,
    avgResolutionDays: 2.4,
    citizenSatisfactionScore: 92.4,
    depotManager: "Eng. Tigist Mamo"
  },
  {
    id: "SC-NIFAS",
    subCityName: "Nifas Silk-Lafto (ንፋስ ስልክ ላፍቶ)",
    totalUnits: 9800,
    occupiedUnits: 9540,
    occupancyRate: 97.3,
    monthlyRevenueTargetEtb: 142000000,
    monthlyRevenueCollectedEtb: 137800000,
    collectionRate: 97.0,
    activeDefectsCount: 29,
    avgResolutionDays: 3.1,
    citizenSatisfactionScore: 89.6,
    depotManager: "Eng. Fikadu Kebede"
  },
  {
    id: "SC-KOLFE",
    subCityName: "Kolfe Keranio (ኮልፌ ቀራኒዮ)",
    totalUnits: 7500,
    occupiedUnits: 7320,
    occupancyRate: 97.6,
    monthlyRevenueTargetEtb: 105000000,
    monthlyRevenueCollectedEtb: 101200000,
    collectionRate: 96.4,
    activeDefectsCount: 32,
    avgResolutionDays: 3.4,
    citizenSatisfactionScore: 88.9,
    depotManager: "Eng. Getachew Abebe"
  },
  {
    id: "SC-LEMI",
    subCityName: "Lemi Kura Sub-City (ለሚ ኩራ)",
    totalUnits: 8100,
    occupiedUnits: 7920,
    occupancyRate: 97.8,
    monthlyRevenueTargetEtb: 118000000,
    monthlyRevenueCollectedEtb: 115600000,
    collectionRate: 98.0,
    activeDefectsCount: 21,
    avgResolutionDays: 2.8,
    citizenSatisfactionScore: 91.2,
    depotManager: "Eng. Meron Haile"
  },
  {
    id: "SC-LIDETA",
    subCityName: "Lideta Sub-City (ልደታ)",
    totalUnits: 5850,
    occupiedUnits: 5760,
    occupancyRate: 98.5,
    monthlyRevenueTargetEtb: 92000000,
    monthlyRevenueCollectedEtb: 91100000,
    collectionRate: 99.0,
    activeDefectsCount: 11,
    avgResolutionDays: 1.8,
    citizenSatisfactionScore: 96.1,
    depotManager: "Eng. Kassahun Alemu"
  }
];

// ─────────────────────────────────────────────────────────────
// MAINTENANCE OFFICER DISPATCH DATA
// ─────────────────────────────────────────────────────────────
export const MOCK_DISPATCH_WORK_ORDERS: DispatchWorkOrder[] = [
  {
    id: "WO-2026-8801",
    siteName: "Gerji Housing Scheme",
    subCity: "Yeka Sub-City",
    unitNumber: "Block 04, Unit 302",
    trade: "Plumbing",
    reportedBy: "Dr. Aster Bekele",
    reportedDate: "18 Aug 2026, 09:15",
    priority: "Emergency",
    status: "in_progress",
    assignedTechnician: "Tech. Solomon Bekele & Team A",
    depotStation: "Yeka Central Depot (Station 1)",
    estimatedCostEtb: 4200,
    slaTargetHours: 4,
    slaRemainingHours: 1.5,
    notes: "Main vertical riser joint pressure leakage threatening lower floor electrical conduits."
  },
  {
    id: "WO-2026-8802",
    siteName: "Bole Atlas Scheme",
    subCity: "Bole Sub-City",
    unitNumber: "Block 02, Elevator B",
    trade: "Elevator",
    reportedBy: "W/ro Martha Desta (Building Mgr)",
    reportedDate: "18 Aug 2026, 11:30",
    priority: "Emergency",
    status: "technician_en_route",
    assignedTechnician: "Otis & Municipal Specialist Eng. Daniel",
    depotStation: "Bole Sub-City Depot",
    estimatedCostEtb: 18500,
    slaTargetHours: 4,
    slaRemainingHours: 2.8,
    notes: "Traction motor brake sensor error code E-41. Unit safely locked at ground level."
  },
  {
    id: "WO-2026-8798",
    siteName: "Kirkos Gotera Scheme",
    subCity: "Kirkos Sub-City",
    unitNumber: "Block 08, Corridor 2F",
    trade: "Electrical",
    reportedBy: "Ato Elias Wondimu",
    reportedDate: "17 Aug 2026, 16:45",
    priority: "Standard",
    status: "pending_dispatch",
    depotStation: "Kirkos Central Depot",
    estimatedCostEtb: 2800,
    slaTargetHours: 48,
    slaRemainingHours: 26,
    notes: "Corridor timer relay replacement and emergency exit battery backup test."
  },
  {
    id: "WO-2026-8795",
    siteName: "Arada Churchill Scheme",
    subCity: "Arada Sub-City",
    unitNumber: "Block 01, Unit 401",
    trade: "Carpentry & Locks",
    reportedBy: "W/ro Hirut Assefa",
    reportedDate: "17 Aug 2026, 10:20",
    priority: "Standard",
    status: "resolved",
    assignedTechnician: "Tech. Girma Zewde",
    depotStation: "Arada Municipal Station",
    estimatedCostEtb: 1500,
    slaTargetHours: 48,
    slaRemainingHours: 0,
    notes: "Fire door closer tension recalibration and acoustic smoke gasket sealing completed."
  },
  {
    id: "WO-2026-8791",
    siteName: "Lideta Commercial Center",
    subCity: "Lideta Sub-City",
    unitNumber: "Roof Terrace Plant Room",
    trade: "Roofing",
    reportedBy: "Municipal Inspector Worku M.",
    reportedDate: "16 Aug 2026, 14:00",
    priority: "Urgent",
    status: "parts_ordered",
    assignedTechnician: "Waterproofing Crew 3",
    depotStation: "Central Logistics Depot",
    estimatedCostEtb: 34000,
    slaTargetHours: 24,
    slaRemainingHours: 8,
    notes: "Membrane bituminous layer replacement around HVAC chiller base pads before heavy rains."
  }
];

// ─────────────────────────────────────────────────────────────
// ADMIN PORTAL USER & AUDIT DATA
// ─────────────────────────────────────────────────────────────
export const MOCK_ADMIN_USERS: AdminUserAccount[] = [
  {
    id: "USR-001",
    name: "Dr. Tewodros Kassahun",
    email: "tewodros.kassahun@aau.edu.et",
    phone: "+251 91 123 4567",
    role: "resident",
    faydaId: "FAYDA-ETH-88429104",
    department: "Public / Addis Ababa University",
    subCityOrSite: "Gerji Housing Scheme (Unit 304)",
    status: "active",
    lastLogin: "Today, 10:14",
    twoFactorActive: true
  },
  {
    id: "USR-002",
    name: "W/ro Martha Desta",
    email: "martha.desta@addisproperty.gov.et",
    phone: "+251 91 456 7890",
    role: "property_manager",
    faydaId: "FAYDA-GOV-3390114",
    staffId: "AACA-MGR-33901",
    department: "Housing Agency Property Operations",
    subCityOrSite: "Gerji & Bole Public Schemes",
    status: "active",
    lastLogin: "Today, 08:30",
    twoFactorActive: true
  },
  {
    id: "USR-003",
    name: "Hon. Dr. Sisay Kebede",
    email: "sisay.kebede@addisproperty.gov.et",
    phone: "+251 91 001 2233",
    role: "executive",
    faydaId: "FAYDA-GOV-1000100",
    staffId: "AACA-EXEC-10001",
    department: "City Cabinet / Head of Housing Bureau",
    subCityOrSite: "City Administration HQ",
    status: "active",
    lastLogin: "Yesterday, 17:45",
    twoFactorActive: true
  },
  {
    id: "USR-004",
    name: "Hanna Girma",
    email: "hanna.girma@addisproperty.gov.et",
    phone: "+251 91 345 6789",
    role: "finance_officer",
    faydaId: "FAYDA-GOV-4410291",
    staffId: "AACA-FIN-44120",
    department: "Revenue & Treasury Desk",
    subCityOrSite: "Kirkos Sub-City & Central Treasury",
    status: "active",
    lastLogin: "Today, 09:05",
    twoFactorActive: true
  },
  {
    id: "USR-005",
    name: "Eng. Yonas Tadesse",
    email: "yonas.tadesse@addisproperty.gov.et",
    phone: "+251 91 765 4321",
    role: "maintenance_officer",
    faydaId: "FAYDA-GOV-5520489",
    staffId: "AACA-MNT-55204",
    department: "Maintenance & Depot Logistics",
    subCityOrSite: "Central Maintenance Depot",
    status: "active",
    lastLogin: "Today, 07:50",
    twoFactorActive: true
  },
  {
    id: "USR-006",
    name: "Eng. Worku Mengesha",
    email: "worku.mengesha@addisproperty.gov.et",
    phone: "+251 91 887 6543",
    role: "field_inspector",
    faydaId: "FAYDA-GOV-1109432",
    staffId: "AACA-INS-77310",
    department: "Building Codes & Quality Bureau",
    subCityOrSite: "Yeka & Kirkos Sub-Cities",
    status: "active",
    lastLogin: "Today, 08:12",
    twoFactorActive: false
  },
  {
    id: "USR-007",
    name: "Ato Solomon Hailu",
    email: "solomon.hailu@addisproperty.gov.et",
    phone: "+251 91 222 3344",
    role: "admin",
    faydaId: "FAYDA-GOV-9900088",
    staffId: "AACA-SYS-99000",
    department: "Innovation & Technology Directorate",
    subCityOrSite: "City Administration Data Center",
    status: "active",
    lastLogin: "Today, 06:45",
    twoFactorActive: true
  }
];

export const MOCK_AUDIT_LOGS: SystemAuditLogEntry[] = [
  {
    id: "AUD-99104",
    timestamp: "19 Aug 2026, 10:14:22",
    eventType: "FAYDA_SSO",
    performedBy: "Dr. Tewodros Kassahun",
    ipAddress: "196.188.24.112 (Ethio Telecom)",
    subCity: "Yeka Sub-City",
    details: "Citizen tenant biometric authentication successful via Fayda National e-ID Gateway.",
    severity: "info",
    signatureHash: "0x8f4c...3e1a"
  },
  {
    id: "AUD-99103",
    timestamp: "19 Aug 2026, 09:22:05",
    eventType: "VOUCHER_VERIFIED",
    performedBy: "Hanna Girma (Finance Officer)",
    ipAddress: "10.4.12.88 (City Intranet)",
    subCity: "Kirkos Sub-City",
    details: "Approved CBE deposit slip ETB 14,800. Digital clearance voucher CBRPM-CLR-2026-0842 sealed.",
    severity: "info",
    signatureHash: "0x2a9d...9f8b"
  },
  {
    id: "AUD-99102",
    timestamp: "19 Aug 2026, 09:16:40",
    eventType: "EMERGENCY_DISPATCH",
    performedBy: "Eng. Yonas Tadesse",
    ipAddress: "10.4.18.21 (Depot Dispatch LAN)",
    subCity: "Yeka Sub-City",
    details: "Emergency work order WO-2026-8801 dispatched to Yeka Depot Team A. SLA timer started: 4 hours.",
    severity: "warning",
    signatureHash: "0x5e1b...7c4d"
  },
  {
    id: "AUD-99101",
    timestamp: "18 Aug 2026, 17:30:11",
    eventType: "DIRECTIVE_UPDATED",
    performedBy: "Hon. Dr. Sisay Kebede",
    ipAddress: "10.2.1.1 (Cabinet LAN)",
    subCity: "City HQ",
    details: "Executive sign-off on Directive 44/2026 Annex B civil service rent indexation adjustments.",
    severity: "warning",
    signatureHash: "0x77ab...22f1"
  },
  {
    id: "AUD-99100",
    timestamp: "18 Aug 2026, 14:05:54",
    eventType: "ROLE_MODIFIED",
    performedBy: "Ato Solomon Hailu (Admin)",
    ipAddress: "10.1.0.4 (Data Center Admin)",
    subCity: "City HQ",
    details: "Updated security privileges for inspector desk to enable offline biometric cryptographic signing.",
    severity: "critical",
    signatureHash: "0x992c...ee34"
  }
];

