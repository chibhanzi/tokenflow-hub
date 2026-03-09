import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
import { validate } from "../middleware/validate";
import db from "../config/database";
import paynow, { PLATFORM_FEE_PERCENT, LISTING_FEE_USD, SUBSCRIPTION_TIERS, SubscriptionTier } from "../config/paynow";

const router = Router();

/* ── Schemas ── */
const tokenPaymentSchema = z.object({
  token_id: z.string().uuid(),
  quantity: z.number().int().min(1),
  phone: z.string().min(10).max(15),
  method: z.enum(["ecocash", "onemoney", "innbucks"]),
});

const listingFeeSchema = z.object({
  business_id: z.string().uuid(),
  phone: z.string().min(10).max(15),
  method: z.enum(["ecocash", "onemoney", "innbucks"]),
});

const subscriptionSchema = z.object({
  tier: z.enum(["starter", "growth", "enterprise"]),
  phone: z.string().min(10).max(15),
  method: z.enum(["ecocash", "onemoney", "innbucks"]),
});

/* ── Buy tokens via Paynow mobile money ── */
router.post(
  "/buy-tokens",
  authenticate,
  requireRole("investor"),
  validate(tokenPaymentSchema),
  async (req: AuthRequest, res: Response) => {
    try {
      const { token_id, quantity, phone, method } = req.body;

      const token = await db("tokens").where({ id: token_id, status: "active" }).first();
      if (!token) return res.status(404).json({ error: "Token not found or inactive" });
      if (token.available_supply < quantity) {
        return res.status(400).json({ error: "Insufficient supply", available: token.available_supply });
      }

      const subtotal = quantity * token.price_per_token;
      const platform_fee = +(subtotal * PLATFORM_FEE_PERCENT / 100).toFixed(2);
      const total_amount = +(subtotal + platform_fee).toFixed(2);
      const paymentId = uuid();

      // Record pending payment
      await db("payments").insert({
        id: paymentId,
        user_id: req.userId,
        type: "token_purchase",
        reference_id: token_id,
        subtotal,
        platform_fee,
        total_amount,
        currency: token.price_currency,
        method,
        phone,
        status: "pending",
      });

      // Create Paynow payment
      const payment = paynow.createPayment(`DePeer-Token-${paymentId}`, req.userId);
      payment.add("Token Purchase", total_amount);

      const response = await paynow.sendMobile(payment, phone, method);

      if (response.success) {
        await db("payments").where({ id: paymentId }).update({
          paynow_reference: response.pollUrl,
          status: "processing",
        });

        return res.status(201).json({
          payment_id: paymentId,
          poll_url: response.pollUrl,
          instructions: response.instructions || "Check your phone to approve the payment",
          subtotal,
          platform_fee,
          total_amount,
        });
      } else {
        await db("payments").where({ id: paymentId }).update({ status: "failed" });
        return res.status(400).json({ error: response.error || "Payment initiation failed" });
      }
    } catch (err) {
      console.error("Token payment error:", err);
      res.status(500).json({ error: "Payment failed" });
    }
  }
);

/* ── Pay listing/issuance fee ── */
router.post(
  "/listing-fee",
  authenticate,
  requireRole("business"),
  validate(listingFeeSchema),
  async (req: AuthRequest, res: Response) => {
    try {
      const { business_id, phone, method } = req.body;

      const business = await db("businesses").where({ id: business_id, owner_id: req.userId }).first();
      if (!business) return res.status(404).json({ error: "Business not found" });

      const paymentId = uuid();

      await db("payments").insert({
        id: paymentId,
        user_id: req.userId,
        type: "listing_fee",
        reference_id: business_id,
        subtotal: LISTING_FEE_USD,
        platform_fee: 0,
        total_amount: LISTING_FEE_USD,
        currency: "USD",
        method,
        phone,
        status: "pending",
      });

      const payment = paynow.createPayment(`DePeer-Listing-${paymentId}`, req.userId);
      payment.add("Token Listing Fee", LISTING_FEE_USD);

      const response = await paynow.sendMobile(payment, phone, method);

      if (response.success) {
        await db("payments").where({ id: paymentId }).update({
          paynow_reference: response.pollUrl,
          status: "processing",
        });

        return res.status(201).json({
          payment_id: paymentId,
          poll_url: response.pollUrl,
          instructions: response.instructions || "Check your phone to approve the payment",
          total_amount: LISTING_FEE_USD,
        });
      } else {
        await db("payments").where({ id: paymentId }).update({ status: "failed" });
        return res.status(400).json({ error: response.error || "Payment initiation failed" });
      }
    } catch (err) {
      console.error("Listing fee error:", err);
      res.status(500).json({ error: "Payment failed" });
    }
  }
);

/* ── Subscribe to a plan ── */
router.post(
  "/subscribe",
  authenticate,
  requireRole("business"),
  validate(subscriptionSchema),
  async (req: AuthRequest, res: Response) => {
    try {
      const { tier, phone, method } = req.body;
      const tierConfig = SUBSCRIPTION_TIERS[tier as SubscriptionTier];
      const paymentId = uuid();

      await db("payments").insert({
        id: paymentId,
        user_id: req.userId,
        type: "subscription",
        reference_id: tier,
        subtotal: tierConfig.price,
        platform_fee: 0,
        total_amount: tierConfig.price,
        currency: "USD",
        method,
        phone,
        status: "pending",
      });

      const payment = paynow.createPayment(`DePeer-Sub-${paymentId}`, req.userId);
      payment.add(`${tierConfig.name} Plan`, tierConfig.price);

      const response = await paynow.sendMobile(payment, phone, method);

      if (response.success) {
        await db("payments").where({ id: paymentId }).update({
          paynow_reference: response.pollUrl,
          status: "processing",
        });

        return res.status(201).json({
          payment_id: paymentId,
          poll_url: response.pollUrl,
          instructions: response.instructions || "Check your phone to approve the payment",
          tier: tierConfig.name,
          total_amount: tierConfig.price,
        });
      } else {
        await db("payments").where({ id: paymentId }).update({ status: "failed" });
        return res.status(400).json({ error: response.error || "Payment initiation failed" });
      }
    } catch (err) {
      console.error("Subscription error:", err);
      res.status(500).json({ error: "Subscription payment failed" });
    }
  }
);

/* ── Poll payment status ── */
router.get("/status/:paymentId", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const record = await db("payments").where({ id: req.params.paymentId, user_id: req.userId }).first();
    if (!record) return res.status(404).json({ error: "Payment not found" });

    if (record.status === "processing" && record.paynow_reference) {
      try {
        const status = await paynow.pollTransaction(record.paynow_reference);
        if (status.paid()) {
          await db("payments").where({ id: record.id }).update({ status: "completed", updated_at: new Date() });

          // Fulfil based on payment type
          if (record.type === "token_purchase") {
            await fulfillTokenPurchase(record);
          } else if (record.type === "subscription") {
            await fulfillSubscription(record);
          }

          return res.json({ status: "completed", payment: { ...record, status: "completed" } });
        } else if (status.cancelled()) {
          await db("payments").where({ id: record.id }).update({ status: "cancelled", updated_at: new Date() });
          return res.json({ status: "cancelled" });
        }
      } catch {
        // Poll failed, return current status
      }
    }

    res.json({ status: record.status, payment: record });
  } catch {
    res.status(500).json({ error: "Failed to check payment status" });
  }
});

/* ── Paynow result callback ── */
router.post("/result", async (req: Request, res: Response) => {
  try {
    // Paynow sends status updates here
    const { reference, paynowreference, status: payStatus } = req.body;

    if (reference && payStatus) {
      const paymentId = reference.split("-").pop();
      const newStatus = payStatus.toLowerCase() === "paid" ? "completed" : payStatus.toLowerCase() === "cancelled" ? "cancelled" : "processing";

      const record = await db("payments").where({ id: paymentId }).first();
      if (record) {
        await db("payments").where({ id: paymentId }).update({ status: newStatus, paynow_reference: paynowreference || record.paynow_reference, updated_at: new Date() });

        if (newStatus === "completed") {
          if (record.type === "token_purchase") await fulfillTokenPurchase(record);
          if (record.type === "subscription") await fulfillSubscription(record);
        }
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Paynow callback error:", err);
    res.status(200).json({ ok: true }); // Always return 200 to Paynow
  }
});

/* ── Get pricing tiers (public) ── */
router.get("/tiers", (_req: Request, res: Response) => {
  res.json({
    tiers: SUBSCRIPTION_TIERS,
    listing_fee: LISTING_FEE_USD,
    transaction_fee_percent: PLATFORM_FEE_PERCENT,
  });
});

/* ── Helpers ── */
async function fulfillTokenPurchase(payment: any) {
  const token = await db("tokens").where({ id: payment.reference_id }).first();
  if (!token) return;

  await db.transaction(async (trx) => {
    await trx("transactions").insert({
      id: uuid(),
      user_id: payment.user_id,
      token_id: payment.reference_id,
      type: "buy",
      quantity: Math.floor(payment.subtotal / token.price_per_token),
      price_per_token: token.price_per_token,
      total_amount: payment.subtotal,
      status: "completed",
    });

    const qty = Math.floor(payment.subtotal / token.price_per_token);
    await trx("tokens").where({ id: payment.reference_id }).decrement("available_supply", qty);

    const existing = await trx("holdings").where({ user_id: payment.user_id, token_id: payment.reference_id }).first();
    if (existing) {
      const newQty = existing.quantity + qty;
      const newAvg = ((existing.avg_purchase_price * existing.quantity) + (token.price_per_token * qty)) / newQty;
      await trx("holdings").where({ id: existing.id }).update({ quantity: newQty, avg_purchase_price: newAvg, updated_at: new Date() });
    } else {
      await trx("holdings").insert({
        id: uuid(),
        user_id: payment.user_id,
        token_id: payment.reference_id,
        quantity: qty,
        avg_purchase_price: token.price_per_token,
      });
    }
  });
}

async function fulfillSubscription(payment: any) {
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  const existing = await db("subscriptions").where({ user_id: payment.user_id, status: "active" }).first();
  if (existing) {
    await db("subscriptions").where({ id: existing.id }).update({
      tier: payment.reference_id,
      expires_at: expiresAt,
      updated_at: new Date(),
    });
  } else {
    await db("subscriptions").insert({
      id: uuid(),
      user_id: payment.user_id,
      tier: payment.reference_id,
      status: "active",
      expires_at: expiresAt,
    });
  }
}

export default router;
