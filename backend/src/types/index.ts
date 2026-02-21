/* ── Enums ── */
export type AppRole = "investor" | "business" | "admin";
export type TokenType = "revenue" | "asset" | "equity";
export type TokenStatus = "pending" | "active" | "suspended" | "retired";
export type BusinessStatus = "pending" | "approved" | "rejected" | "suspended";
export type TransactionType = "buy" | "sell" | "payout";
export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled";
export type KYBDocType = "registration_cert" | "tax_cert" | "director_id" | "financial_statement" | "other";

/* ── Users ── */
export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

/* ── Business ── */
export interface Business {
  id: string;
  owner_id: string;
  company_name: string;
  registration_number: string;
  country: string;
  city: string;
  sector: string;
  founded_year: number;
  employee_count: number;
  annual_revenue: number;
  revenue_currency: string;
  funding_stage: string;
  website?: string;
  description: string;
  status: BusinessStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Director {
  id: string;
  business_id: string;
  full_name: string;
  id_number: string;
  nationality: string;
  role_title: string;
  email: string;
}

export interface KYBDocument {
  id: string;
  business_id: string;
  doc_type: KYBDocType;
  file_name: string;
  file_path: string;
  uploaded_at: Date;
}

export interface ComplianceDeclaration {
  id: string;
  business_id: string;
  declaration_text: string;
  accepted: boolean;
  accepted_at?: Date;
  ip_address?: string;
}

/* ── Tokens ── */
export interface Token {
  id: string;
  business_id: string;
  name: string;
  type: TokenType;
  total_supply: number;
  available_supply: number;
  price_per_token: number;
  price_currency: string;
  backing_description: string;
  status: TokenStatus;
  created_at: Date;
  updated_at: Date;
}

/* ── Holdings & Transactions ── */
export interface Holding {
  id: string;
  user_id: string;
  token_id: string;
  quantity: number;
  avg_purchase_price: number;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  id: string;
  user_id: string;
  token_id: string;
  type: TransactionType;
  quantity: number;
  price_per_token: number;
  total_amount: number;
  status: TransactionStatus;
  created_at: Date;
}

/* ── API payloads ── */
export interface RegisterBusinessPayload {
  /* user */
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  /* company */
  company_name: string;
  registration_number: string;
  country: string;
  city: string;
  sector: string;
  founded_year: number;
  employee_count: number;
  annual_revenue: number;
  revenue_currency: string;
  funding_stage: string;
  website?: string;
  description: string;
  /* directors */
  directors: Omit<Director, "id" | "business_id">[];
  /* token intent */
  token_type: TokenType;
  token_supply: number;
  price_per_token: number;
  backing_description: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, "password_hash">;
  roles: AppRole[];
}
