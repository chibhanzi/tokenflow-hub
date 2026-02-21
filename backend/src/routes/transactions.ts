import { Router, Response } from "express";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
import { validate } from "../middleware/validate";
import db from "../config/database";

const router = Router();

const buySchema = z.object({
  token_id: z.string().uuid(),
  quantity: z.number().int().min(1),
});

const sellSchema = z.object({
  token_id: z.string().uuid(),
  quantity: z.number().int().min(1),
  price_per_token: z.number().min(0.01),
});

/* ── Buy tokens ── */
router.post("/buy", authenticate, requireRole("investor"), validate(buySchema), async (req: AuthRequest, res: Response) => {
  try {
    const { token_id, quantity } = req.body;

    const token = await db("tokens").where({ id: token_id, status: "active" }).first();
    if (!token) return res.status(404).json({ error: "Token not found or inactive" });
    if (token.available_supply < quantity) {
      return res.status(400).json({ error: "Insufficient supply", available: token.available_supply });
    }

    const total_amount = quantity * token.price_per_token;
    const txId = uuid();

    await db.transaction(async (trx) => {
      // record transaction
      await trx("transactions").insert({
        id: txId,
        user_id: req.userId,
        token_id,
        type: "buy",
        quantity,
        price_per_token: token.price_per_token,
        total_amount,
        status: "completed",
      });

      // update supply
      await trx("tokens").where({ id: token_id }).decrement("available_supply", quantity);

      // update or create holding
      const existing = await trx("holdings").where({ user_id: req.userId, token_id }).first();
      if (existing) {
        const newQty = existing.quantity + quantity;
        const newAvg = ((existing.avg_purchase_price * existing.quantity) + (token.price_per_token * quantity)) / newQty;
        await trx("holdings").where({ id: existing.id }).update({ quantity: newQty, avg_purchase_price: newAvg, updated_at: new Date() });
      } else {
        await trx("holdings").insert({
          id: uuid(),
          user_id: req.userId,
          token_id,
          quantity,
          avg_purchase_price: token.price_per_token,
        });
      }
    });

    res.status(201).json({ transaction_id: txId, quantity, total_amount });
  } catch (err) {
    console.error("Buy error:", err);
    res.status(500).json({ error: "Purchase failed" });
  }
});

/* ── Sell tokens ── */
router.post("/sell", authenticate, requireRole("investor"), validate(sellSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { token_id, quantity, price_per_token } = req.body;

    const holding = await db("holdings").where({ user_id: req.userId, token_id }).first();
    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient holdings" });
    }

    const total_amount = quantity * price_per_token;
    const txId = uuid();

    await db.transaction(async (trx) => {
      await trx("transactions").insert({
        id: txId,
        user_id: req.userId,
        token_id,
        type: "sell",
        quantity,
        price_per_token,
        total_amount,
        status: "completed",
      });

      // return supply to token pool
      await trx("tokens").where({ id: token_id }).increment("available_supply", quantity);

      // update holding
      const newQty = holding.quantity - quantity;
      if (newQty === 0) {
        await trx("holdings").where({ id: holding.id }).delete();
      } else {
        await trx("holdings").where({ id: holding.id }).update({ quantity: newQty, updated_at: new Date() });
      }
    });

    res.status(201).json({ transaction_id: txId, quantity, total_amount });
  } catch (err) {
    console.error("Sell error:", err);
    res.status(500).json({ error: "Sale failed" });
  }
});

/* ── Get user's transaction history ── */
router.get("/history", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const transactions = await db("transactions")
      .join("tokens", "transactions.token_id", "tokens.id")
      .join("businesses", "tokens.business_id", "businesses.id")
      .where({ "transactions.user_id": req.userId })
      .select(
        "transactions.*",
        "tokens.name as token_name",
        "tokens.type as token_type",
        "businesses.company_name"
      )
      .orderBy("transactions.created_at", "desc")
      .limit(Number(limit))
      .offset(offset);

    const [{ count }] = await db("transactions").where({ user_id: req.userId }).count();

    res.json({ transactions, total: Number(count), page: Number(page), limit: Number(limit) });
  } catch {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

/* ── Get user's holdings / portfolio ── */
router.get("/portfolio", authenticate, requireRole("investor"), async (req: AuthRequest, res: Response) => {
  try {
    const holdings = await db("holdings")
      .join("tokens", "holdings.token_id", "tokens.id")
      .join("businesses", "tokens.business_id", "businesses.id")
      .where({ "holdings.user_id": req.userId })
      .select(
        "holdings.*",
        "tokens.name as token_name",
        "tokens.type as token_type",
        "tokens.price_per_token as current_price",
        "businesses.company_name",
        "businesses.sector"
      );

    const total_value = holdings.reduce((sum: number, h: any) => sum + h.quantity * h.current_price, 0);

    res.json({ holdings, total_value });
  } catch {
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

export default router;
