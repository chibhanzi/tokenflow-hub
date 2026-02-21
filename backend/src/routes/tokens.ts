import { Router, Response } from "express";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
import db from "../config/database";

const router = Router();

/* ── List marketplace tokens (public, active only) ── */
router.get("/marketplace", async (req, res) => {
  try {
    const { sector, type, min_price, max_price } = req.query;

    let query = db("tokens")
      .join("businesses", "tokens.business_id", "businesses.id")
      .where({ "tokens.status": "active", "businesses.status": "approved" })
      .select(
        "tokens.*",
        "businesses.company_name",
        "businesses.sector",
        "businesses.country",
        "businesses.city",
        "businesses.employee_count",
        "businesses.annual_revenue"
      );

    if (sector) query = query.where("businesses.sector", sector as string);
    if (type) query = query.where("tokens.type", type as string);
    if (min_price) query = query.where("tokens.price_per_token", ">=", Number(min_price));
    if (max_price) query = query.where("tokens.price_per_token", "<=", Number(max_price));

    const tokens = await query.orderBy("tokens.created_at", "desc");
    res.json(tokens);
  } catch (err) {
    console.error("Marketplace error:", err);
    res.status(500).json({ error: "Failed to fetch tokens" });
  }
});

/* ── Get tokens for own business ── */
router.get("/mine", authenticate, requireRole("business"), async (req: AuthRequest, res: Response) => {
  try {
    const business = await db("businesses").where({ owner_id: req.userId }).first();
    if (!business) return res.status(404).json({ error: "Business not found" });

    const tokens = await db("tokens").where({ business_id: business.id });
    res.json(tokens);
  } catch {
    res.status(500).json({ error: "Failed to fetch tokens" });
  }
});

/* ── Get single token ── */
router.get("/:id", async (req, res) => {
  try {
    const token = await db("tokens")
      .join("businesses", "tokens.business_id", "businesses.id")
      .where({ "tokens.id": req.params.id })
      .select("tokens.*", "businesses.company_name", "businesses.sector", "businesses.country", "businesses.city")
      .first();

    if (!token) return res.status(404).json({ error: "Token not found" });
    res.json(token);
  } catch {
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

export default router;
