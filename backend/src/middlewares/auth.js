import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/token.js";
import UserModel from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { logger } from "../config/logger.js";

/**
 * Extract the access token from either:
 * 1. The `Authorization: Bearer <token>` header (set by the axios interceptor)
 * 2. The `accessToken` cookie (legacy / future support)
 */
const extractAccessToken = (req) => {
  // Check Authorization header first (primary method)
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  // Fall back to cookie
  return req.cookies?.accessToken;
};

export const isAuthenticate = asyncHandler(async (req, _res, next) => {
  const token = extractAccessToken(req);

  if (!token) {
    logger.info("auth-middleware:Access token missing.");
    return next(
      ApiError.unauthorized("Authentication required. Please log in."),
    );
  }

  const decoded = verifyAccessToken(token);
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    logger.info("auth-middleware:User not found in database.");
    return next(ApiError.unauthorized("User not found."));
  }

  req.user = user;
  next();
});

export const isAdmin = (req, _res, next) => {
  if (!req.user) {
    return next(
      ApiError.unauthorized("Authentication required. Please log in."),
    );
  }
  if (req.user.role !== "admin") {
    return next(ApiError.forbidden("Admin access required."));
  }
  next();
};
