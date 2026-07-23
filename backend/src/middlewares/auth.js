import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/token.js";
import UserModel from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { logger } from "../config/logger.js";

export const isAuthenticate = asyncHandler(async (req, _res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    logger.info("auth-middleware:Access token missing.");
    return next(
      ApiError.unauthorized("Authentication required. Please log in."),
    );
  }

  const decoded = verifyAccessToken(accessToken);
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    logger.info("auth-middleware:User not found in database.");
    return next(ApiError.unauthorized("User not found."));
  }

  if (refreshToken !== user.refreshToken) {
    logger.info("auth-middleware:Refresh token mismatch.");
    return next(ApiError.unauthorized("Invalid or expired refresh token."));
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
