import { Router, Response } from "express";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
import db from "../config/database";

const router = Router();

/* ── List all businesses (admin) ── */
router.get("/", authenticate, requireRole("admin"), async (_req, res) => {
  try {
    const businesses = await db("businesses")
      .join("users", "businesses.owner_id", "users.id")
      .select(
        "businesses.*",
        "users.email as owner_email",
        "users.first_name as owner_first_name",
        "users.last_name as owner_last_name"
      )
      .orderBy("businesses.created_at", "desc");

    res.json(businesses);
  } catch (err) {
    console.error("List businesses error:", err);
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
});

/* ── Get own business (business owner) ── */
router.get("/mine", authenticate, requireRole("business"), async (req: AuthRequest, res: Response) => {
  try {
    const business = await db("businesses").where({ owner_id: req.userId }).first();
    if (!business) return res.status(404).json({ error: "Business not found" });

    const directors = await db("directors").where({ business_id: business.id });
    const documents = await db("kyb_documents").where({ business_id: business.id });

    res.json({ ...business, directors, documents });
  } catch {
    res.status(500).json({ error: "Failed to fetch business" });
  }
});

/* ── Get business by ID (public, approved only) ── */
router.get("/:id", async (req, res) => {
  try {
    const business = await db("businesses")
      .where({ id: req.params.id, status: "approved" })
      .first();

    if (!business) return res.status(404).json({ error: "Business not found" });

    const tokens = await db("tokens")
      .where({ business_id: business.id, status: "active" })
      .select("id", "name", "type", "total_supply", "available_supply", "price_per_token", "price_currency", "backing_description");

    res.json({ ...business, tokens });
  } catch {
    res.status(500).json({ error: "Failed to fetch business" });
  }
});

/* ── Approve / reject business (admin) ── */
router.patch("/:id/status", authenticate, requireRole("admin"), async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected", "suspended"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await db("businesses")
      .where({ id: req.params.id })
      .update({ status, updated_at: new Date() })
      .returning("*");

    if (!updated.length) return res.status(404).json({ error: "Business not found" });

    // If approved, also activate pending tokens
    if (status === "approved") {
      await db("tokens")
        .where({ business_id: req.params.id, status: "pending" })
        .update({ status: "active", updated_at: new Date() });
    }

    res.json(updated[0]);
  } catch {
    res.status(500).json({ error: "Status update failed" });
  }
});

export default router;
