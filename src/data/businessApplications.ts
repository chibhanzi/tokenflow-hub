export interface Director {
  name: string;
  role: string;
  idType: string;
  nationality: string;
}

export interface BusinessApplication {
  id: string;
  name: string;
  sector: string;
  status: "Pending" | "Approved" | "Rejected" | "Suspended";
  submittedDate: string;
  registrationNumber: string;
  country: string;
  city: string;
  foundedYear: string;
  employeeCount: string;
  annualRevenue: string;
  fundingStage: string;
  website: string;
  description: string;
  directors: Director[];
  tokenIntent: {
    type: string;
    amount: string;
    pricePerToken: string;
    backingDescription: string;
  };
  compliance: {
    termsAccepted: boolean;
    amlCompliance: boolean;
    accreditedOnly: boolean;
  };
  documents: string[];
  ownerEmail: string;
  ownerName: string;
  tokens: number;
}

export const businessApplications: BusinessApplication[] = [
  {
    id: "biz-1",
    name: "Nala Logistics",
    sector: "Transport & Logistics",
    status: "Approved",
    submittedDate: "2025-10-15",
    registrationNumber: "KE-2019-00482",
    country: "Kenya",
    city: "Nairobi",
    foundedYear: "2019",
    employeeCount: "45",
    annualRevenue: "$1.4M",
    fundingStage: "Series A",
    website: "https://nalalogistics.co.ke",
    description: "Last-mile delivery and logistics platform serving East Africa, connecting businesses with a network of drivers and warehouses.",
    directors: [
      { name: "James Kamau", role: "CEO", idType: "National ID", nationality: "Kenyan" },
      { name: "Amina Osei", role: "CFO", idType: "Passport", nationality: "Kenyan" },
    ],
    tokenIntent: { type: "Revenue", amount: "500", pricePerToken: "$15", backingDescription: "5% monthly revenue share from logistics operations" },
    compliance: { termsAccepted: true, amlCompliance: true, accreditedOnly: false },
    documents: ["Certificate of Incorporation", "Tax Compliance Certificate", "Audited Financials 2024"],
    ownerEmail: "james@nalalogistics.co.ke",
    ownerName: "James Kamau",
    tokens: 500,
  },
  {
    id: "biz-2",
    name: "Mombasa Farms",
    sector: "Agriculture",
    status: "Approved",
    submittedDate: "2025-11-20",
    registrationNumber: "KE-2017-01293",
    country: "Kenya",
    city: "Mombasa",
    foundedYear: "2017",
    employeeCount: "120",
    annualRevenue: "$1.0M",
    fundingStage: "Seed",
    website: "https://mombasafarms.com",
    description: "Large-scale organic farming operation with export partnerships across 6 countries, specializing in tropical produce.",
    directors: [
      { name: "Hassan Ali", role: "Managing Director", idType: "National ID", nationality: "Kenyan" },
      { name: "Fatma Bakari", role: "Director of Operations", idType: "National ID", nationality: "Kenyan" },
    ],
    tokenIntent: { type: "Asset", amount: "300", pricePerToken: "$20", backingDescription: "Backed by warehouse assets in Mombasa port district" },
    compliance: { termsAccepted: true, amlCompliance: true, accreditedOnly: false },
    documents: ["Certificate of Incorporation", "Land Title Deed", "Export License"],
    ownerEmail: "hassan@mombasafarms.com",
    ownerName: "Hassan Ali",
    tokens: 300,
  },
  {
    id: "biz-3",
    name: "TechHub Lagos",
    sector: "Technology",
    status: "Approved",
    submittedDate: "2025-12-01",
    registrationNumber: "NG-2021-07841",
    country: "Nigeria",
    city: "Lagos",
    foundedYear: "2021",
    employeeCount: "32",
    annualRevenue: "$2.4M",
    fundingStage: "Series A",
    website: "https://techhublagos.ng",
    description: "B2B SaaS platform providing payroll and HR solutions for SMEs across West Africa with 400+ enterprise clients.",
    directors: [
      { name: "Chidi Okonkwo", role: "CEO & Founder", idType: "Passport", nationality: "Nigerian" },
      { name: "Ngozi Adeyemi", role: "CTO", idType: "National ID", nationality: "Nigerian" },
      { name: "Emeka Uche", role: "COO", idType: "National ID", nationality: "Nigerian" },
    ],
    tokenIntent: { type: "Equity", amount: "1000", pricePerToken: "$20", backingDescription: "10% equity stake in TechHub Lagos Ltd" },
    compliance: { termsAccepted: true, amlCompliance: true, accreditedOnly: true },
    documents: ["Certificate of Incorporation", "CAC Filing", "Audited Financials 2024", "Board Resolution"],
    ownerEmail: "chidi@techhublagos.ng",
    ownerName: "Chidi Okonkwo",
    tokens: 1000,
  },
  {
    id: "biz-4",
    name: "Accra Fintech",
    sector: "Financial Services",
    status: "Pending",
    submittedDate: "2026-02-14",
    registrationNumber: "GH-2022-03291",
    country: "Ghana",
    city: "Accra",
    foundedYear: "2022",
    employeeCount: "18",
    annualRevenue: "$3.6M",
    fundingStage: "Series B",
    website: "https://accrafintech.com",
    description: "Mobile-first microfinance platform providing instant loans and savings products to underserved populations in Ghana and Côte d'Ivoire.",
    directors: [
      { name: "Kwame Asante", role: "CEO", idType: "Passport", nationality: "Ghanaian" },
      { name: "Ama Mensah", role: "CFO", idType: "National ID", nationality: "Ghanaian" },
    ],
    tokenIntent: { type: "Equity", amount: "600", pricePerToken: "$30", backingDescription: "5% equity with quarterly dividend distribution" },
    compliance: { termsAccepted: true, amlCompliance: true, accreditedOnly: true },
    documents: ["Certificate of Incorporation", "Bank of Ghana License", "Audited Financials 2025"],
    ownerEmail: "kwame@accrafintech.com",
    ownerName: "Kwame Asante",
    tokens: 600,
  },
  {
    id: "biz-5",
    name: "Dar Coffee Co.",
    sector: "Agriculture",
    status: "Pending",
    submittedDate: "2026-02-13",
    registrationNumber: "TZ-2020-05512",
    country: "Tanzania",
    city: "Dar es Salaam",
    foundedYear: "2020",
    employeeCount: "65",
    annualRevenue: "$800K",
    fundingStage: "Pre-Seed",
    website: "https://darcoffee.co.tz",
    description: "Specialty coffee roastery and export company sourcing from smallholder farmers in the Kilimanjaro and Arusha regions.",
    directors: [
      { name: "Joseph Mwanga", role: "Founder & CEO", idType: "National ID", nationality: "Tanzanian" },
    ],
    tokenIntent: { type: "Revenue", amount: "200", pricePerToken: "$12", backingDescription: "3% quarterly revenue from export sales" },
    compliance: { termsAccepted: true, amlCompliance: true, accreditedOnly: false },
    documents: ["Certificate of Incorporation", "TRA Certificate"],
    ownerEmail: "joseph@darcoffee.co.tz",
    ownerName: "Joseph Mwanga",
    tokens: 200,
  },
  {
    id: "biz-6",
    name: "XYZ Ltd",
    sector: "Retail",
    status: "Rejected",
    submittedDate: "2026-02-10",
    registrationNumber: "KE-2023-99010",
    country: "Kenya",
    city: "Nairobi",
    foundedYear: "2023",
    employeeCount: "5",
    annualRevenue: "$50K",
    fundingStage: "Pre-Seed",
    website: "",
    description: "General trading company.",
    directors: [
      { name: "John Doe", role: "Director", idType: "National ID", nationality: "Kenyan" },
    ],
    tokenIntent: { type: "Revenue", amount: "500", pricePerToken: "$10", backingDescription: "Revenue share" },
    compliance: { termsAccepted: true, amlCompliance: false, accreditedOnly: false },
    documents: ["Certificate of Incorporation"],
    ownerEmail: "john@xyz.co.ke",
    ownerName: "John Doe",
    tokens: 0,
  },
];
