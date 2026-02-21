import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth";
import db from "../config/database";

const router = Router();

/* ── Dashboard stats ── */
router.get("/stats", authenticate, requireRole("admin"), async (_req, res) => {
  try {
    const [{ count: totalUsers }] = await db("users").count();
    const [{ count: totalBusinesses }] = await db("businesses").count();
    const [{ count: pendingBusinesses }] = await db("businesses").where({ status: "pending" }).count();
    const [{ count: totalTransactions }] = await db("transactions").count();
    const [{ sum: totalVolume }] = await db("transactions").where({ status: "completed" }).sum("total_amount");

    res.json({
      total_users: Number(totalUsers),
      total_businesses: Number(totalBusinesses),
      pending_businesses: Number(pendingBusinesses),
      total_transactions: Number(totalTransactions),
      total_volume: Number(totalVolume) || 0,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

/* ── List users ── */
router.get("/users", authenticate, requireRole("admin"), async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const users = await db("users")
      .leftJoin("user_roles", "users.id", "user_roles.user_id")
      .select("users.id", "users.email", "users.first_name", "users.last_name", "users.created_at")
      .select(db.raw("array_agg(user_roles.role) as roles"))
      .groupBy("users.id")
      .orderBy("users.created_at", "desc")
      .limit(Number(limit))
      .offset(offset);

    const [{ count }] = await db("users").count();

    res.json({ users, total: Number(count), page: Number(page), limit: Number(limit) });
  } catch {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
