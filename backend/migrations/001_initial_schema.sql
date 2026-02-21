-- DePeer Platform Database Schema
-- Run against PostgreSQL 15+

/* ── Extensions ── */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* ── Enums ── */
CREATE TYPE app_role AS ENUM ('investor', 'business', 'admin');
CREATE TYPE token_type AS ENUM ('revenue', 'asset', 'equity');
CREATE TYPE token_status AS ENUM ('pending', 'active', 'suspended', 'retired');
CREATE TYPE business_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE transaction_type AS ENUM ('buy', 'sell', 'payout');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
CREATE TYPE kyb_doc_type AS ENUM ('registration_cert', 'tax_cert', 'director_id', 'financial_statement', 'other');

/* ── Users ── */
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);

/* ── Businesses ── */
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  registration_number VARCHAR(50) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  founded_year INT NOT NULL,
  employee_count INT NOT NULL DEFAULT 1,
  annual_revenue NUMERIC(15, 2) NOT NULL DEFAULT 0,
  revenue_currency CHAR(3) NOT NULL DEFAULT 'USD',
  funding_stage VARCHAR(50) NOT NULL,
  website VARCHAR(500),
  description TEXT NOT NULL,
  status business_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_businesses_owner ON businesses(owner_id);
CREATE INDEX idx_businesses_status ON businesses(status);

/* ── Directors ── */
CREATE TABLE directors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  id_number VARCHAR(50) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  role_title VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE INDEX idx_directors_business ON directors(business_id);

/* ── KYB Documents ── */
CREATE TABLE kyb_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  doc_type kyb_doc_type NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

/* ── Compliance Declarations ── */
CREATE TABLE compliance_declarations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  declaration_text TEXT NOT NULL,
  accepted BOOLEAN NOT NULL DEFAULT false,
  accepted_at TIMESTAMPTZ,
  ip_address VARCHAR(45)
);

/* ── Tokens ── */
CREATE TABLE tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(200) NOT NULL,
  type token_type NOT NULL,
  total_supply INT NOT NULL,
  available_supply INT NOT NULL,
  price_per_token NUMERIC(12, 2) NOT NULL,
  price_currency CHAR(3) NOT NULL DEFAULT 'USD',
  backing_description TEXT NOT NULL,
  status token_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tokens_business ON tokens(business_id);
CREATE INDEX idx_tokens_status ON tokens(status);

/* ── Holdings ── */
CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  token_id UUID REFERENCES tokens(id) ON DELETE CASCADE NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  avg_purchase_price NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, token_id)
);

CREATE INDEX idx_holdings_user ON holdings(user_id);

/* ── Transactions ── */
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  token_id UUID REFERENCES tokens(id) ON DELETE CASCADE NOT NULL,
  type transaction_type NOT NULL,
  quantity INT NOT NULL,
  price_per_token NUMERIC(12, 2) NOT NULL,
  total_amount NUMERIC(15, 2) NOT NULL,
  status transaction_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_token ON transactions(token_id);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);

/* ── Helper function for role checks ── */
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = _user_id AND role = _role
  )
$$;
