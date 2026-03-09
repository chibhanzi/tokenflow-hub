import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import businessRoutes from "./routes/businesses";
import tokenRoutes from "./routes/tokens";
import transactionRoutes from "./routes/transactions";
import adminRoutes from "./routes/admin";
import paymentRoutes from "./routes/payments";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* ── Middleware ── */
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "10mb" }));

/* ── Routes ── */
app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

/* ── Health check ── */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ── 404 ── */
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

/* ── Start ── */
app.listen(PORT, () => {
  console.log(`🚀 DePeer API running on port ${PORT}`);
});

export default app;
