import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../config/database";
import { AppRole } from "../types";

export interface AuthRequest extends Request {
  userId?: string;
  userRoles?: AppRole[];
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization header" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const roles = await db("user_roles").where({ user_id: decoded.userId }).select("role");
    req.userId = decoded.userId;
    req.userRoles = roles.map((r: { role: AppRole }) => r.role);

    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const requireRole = (...allowed: AppRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRoles || !req.userRoles.some((r) => allowed.includes(r))) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
};
