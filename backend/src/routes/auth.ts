import { Router, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import db from "../config/database";
import { validate } from "../middleware/validate";
import { registerInvestorSchema, registerBusinessSchema, loginSchema } from "../validators/auth";
import { AuthRequest, authenticate } from "../middleware/auth";

const router = Router();

/* ── Register investor ── */
router.post("/register/investor", validate(registerInvestorSchema), async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    const exists = await db("users").where({ email }).first();
    if (exists) return res.status(409).json({ error: "Email already registered" });

    const id = uuid();
    const password_hash = await bcrypt.hash(password, 12);

    await db.transaction(async (trx) => {
      await trx("users").insert({ id, email, password_hash, first_name, last_name, phone });
      await trx("user_roles").insert({ id: uuid(), user_id: id, role: "investor" });
    });

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    res.status(201).json({
      token,
      user: { id, email, first_name, last_name, phone },
      roles: ["investor"],
    });
  } catch (err) {
    console.error("Register investor error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

/* ── Register business ── */
router.post("/register/business", validate(registerBusinessSchema), async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone, directors, token_type, token_supply, price_per_token, backing_description, ...company } = req.body;

    const exists = await db("users").where({ email }).first();
    if (exists) return res.status(409).json({ error: "Email already registered" });

    const userId = uuid();
    const businessId = uuid();
    const password_hash = await bcrypt.hash(password, 12);

    await db.transaction(async (trx) => {
      // user
      await trx("users").insert({ id: userId, email, password_hash, first_name, last_name, phone });
      await trx("user_roles").insert({ id: uuid(), user_id: userId, role: "business" });

      // business
      await trx("businesses").insert({
        id: businessId,
        owner_id: userId,
        ...company,
        status: "pending",
      });

      // directors
      for (const d of directors) {
        await trx("directors").insert({ id: uuid(), business_id: businessId, ...d });
      }

      // token intent (pending approval)
      await trx("tokens").insert({
        id: uuid(),
        business_id: businessId,
        name: `${company.company_name} ${token_type} Token`,
        type: token_type,
        total_supply: token_supply,
        available_supply: token_supply,
        price_per_token,
        price_currency: company.revenue_currency,
        backing_description,
        status: "pending",
      });
    });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    res.status(201).json({
      token,
      user: { id: userId, email, first_name, last_name, phone },
      roles: ["business"],
      business_id: businessId,
    });
  } catch (err) {
    console.error("Register business error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

/* ── Login ── */
router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db("users").where({ email }).first();
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const roles = await db("user_roles").where({ user_id: user.id }).select("role");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    res.json({
      token,
      user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, phone: user.phone },
      roles: roles.map((r: { role: string }) => r.role),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ── Get current user ── */
router.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await db("users").where({ id: req.userId }).select("id", "email", "first_name", "last_name", "phone").first();
    res.json({ user, roles: req.userRoles });
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
