import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/token.js";
import UserModel from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAuthenticate = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    return next(
      ApiError.unauthorized("Authentication required. Please log in."),
    );
  }

  const decoded = verifyAccessToken(token);
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(ApiError.unauthorized("User not found."));
  }

  req.user = user;
  next();
});

export const isAdmin = (req, _res, next) => {
  if (!req.user) {
    return next(ApiError.unauthorized("Authentication required. Please log in."));
  }
  if (req.user.role !== "admin") {
    return next(ApiError.forbidden("Admin access required."));
  }
  next();
};
