import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../config/logger.config.js";

/**
 * Middleware: Require a valid JWT cookie.
 * - Verifies the token from `req.cookies.token`
 * - On success, attaches decoded payload to `req.user`
 * - On failure (missing/invalid/expired), clears the cookie and throws 401
 */
export function authenticate(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    throw ApiError.unauthorized("Authentication required. Please log in.");
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    // Clear invalid/expired cookie
    res.clearCookie("token", { path: "/" });

    if (err.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Session expired. Please log in again.");
    }
    throw ApiError.unauthorized("Invalid or malformed token.");
  }
}

/**
 * Middleware: Optional auth — attach user if a valid token exists, but don't
 * block the request if no token or an invalid one is present.
 */
export function optionalAuth(req, _res, next) {
  const token = req.cookies?.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
  } catch {
    // Token invalid/expired — silently ignore for optional endpoints
    req.user = null;
  }

  next();
}

/**
 * Middleware: Require the authenticated user to have an admin role.
 * MUST be used after `authenticate` or `optionalAuth`.
 */
export function requireAdmin(req, _res, next) {
  if (!req.user) {
    throw ApiError.unauthorized("Authentication required.");
  }
  if (req.user.role !== "admin") {
    throw ApiError.forbidden("Admin access required.");
  }
  next();
}
