import { z } from "zod";

export const registerInvestorSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(20).optional(),
});

const directorSchema = z.object({
  full_name: z.string().trim().min(1).max(200),
  id_number: z.string().trim().min(1).max(50),
  nationality: z.string().trim().min(1).max(100),
  role_title: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
});

export const registerBusinessSchema = z.object({
  /* user */
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(20).optional(),
  /* company */
  company_name: z.string().trim().min(1).max(200),
  registration_number: z.string().trim().min(1).max(50),
  country: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  sector: z.string().trim().min(1).max(100),
  founded_year: z.number().int().min(1900).max(new Date().getFullYear()),
  employee_count: z.number().int().min(1),
  annual_revenue: z.number().min(0),
  revenue_currency: z.string().trim().length(3),
  funding_stage: z.string().trim().min(1).max(50),
  website: z.string().url().max(500).optional(),
  description: z.string().trim().min(10).max(2000),
  /* directors */
  directors: z.array(directorSchema).min(1).max(10),
  /* token intent */
  token_type: z.enum(["revenue", "asset", "equity"]),
  token_supply: z.number().int().min(1),
  price_per_token: z.number().min(0.01),
  backing_description: z.string().trim().min(10).max(1000),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
