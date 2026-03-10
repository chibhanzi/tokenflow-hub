-- DePeer Monetisation Schema
-- Payments, subscriptions, and platform fees

CREATE TYPE payment_type AS ENUM ('deposit', 'token_purchase', 'listing_fee', 'subscription', 'withdrawal');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('ecocash', 'onemoney', 'zimswitch', 'visa', 'mastercard', 'bank_transfer');
CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'cancelled');

/* ── Payments ── */
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type payment_type NOT NULL,
  reference_id VARCHAR(255) NOT NULL,
  subtotal NUMERIC(15, 2) NOT NULL,
  platform_fee NUMERIC(15, 2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(15, 2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  method payment_method NOT NULL,
  phone VARCHAR(20) NOT NULL,
  paynow_reference TEXT,
  status payment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_type ON payments(type);

/* ── Subscriptions ── */
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  tier VARCHAR(50) NOT NULL,
  status subscription_status NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
