import { Paynow } from "paynow";
import dotenv from "dotenv";

dotenv.config();

const paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID || "",
  process.env.PAYNOW_INTEGRATION_KEY || ""
);

paynow.resultUrl = process.env.PAYNOW_RESULT_URL || "http://localhost:4000/api/payments/result";
paynow.returnUrl = process.env.PAYNOW_RETURN_URL || "http://localhost:3000/investor/marketplace";

export default paynow;

/* ── Platform fee config ── */
export const PLATFORM_FEE_PERCENT = 2.5;
export const LISTING_FEE_USD = 50;

export const SUBSCRIPTION_TIERS = {
  starter: { name: "Starter", price: 29, tokens_limit: 1, features: ["1 token listing", "Basic analytics", "Email support"] },
  growth: { name: "Growth", price: 99, tokens_limit: 5, features: ["5 token listings", "Advanced analytics", "Priority support", "Investor insights"] },
  enterprise: { name: "Enterprise", price: 249, tokens_limit: -1, features: ["Unlimited listings", "Custom analytics", "Dedicated account manager", "API access", "White-label options"] },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;
