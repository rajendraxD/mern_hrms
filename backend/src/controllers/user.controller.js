import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import env from "../config/env.config.js";

const BASIC_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Max age for the access-token cookie in ms (15 minutes). */
const ACCESS_MAX_AGE = 15 * 60 * 1000;
/** Max age for the refresh-token cookie in ms (7 days). */
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

/** Common cookie options for both tokens. */
function cookieOptions(maxAge) {
  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: "lax",
    path: "/",
    maxAge,
  };
}

/** Generate a short-lived access token. */
function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiry },
  );
}

/** Generate a long-lived refresh token. */
function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    env.refreshTokenSecret,
    { expiresIn: env.refreshTokenExpiry },
  );
}

/** Format user data for API responses (strip sensitive fields) */
function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
}

/** Set both access-token and refresh-token cookies on the response. */
function setAuthCookies(res, user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("token", accessToken, cookieOptions(ACCESS_MAX_AGE));
  res.cookie("refreshToken", refreshToken, cookieOptions(REFRESH_MAX_AGE));

  return { accessToken, refreshToken };
}

/** Clear both auth cookies. */
function clearAuthCookies(res) {
  const opts = { httpOnly: true, secure: env.isProd, sameSite: "lax", path: "/" };
  res.clearCookie("token", opts);
  res.clearCookie("refreshToken", opts);
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    throw ApiError.badRequest("Name, email, and password are required");
  }
  if (!BASIC_EMAIL_REGEX.test(email)) {
    throw ApiError.badRequest("Invalid email format");
  }
  if (password.length < 6) {
    throw ApiError.badRequest("Password must be at least 6 characters");
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    avatar,
    role: "user",
  });

  const { accessToken } = setAuthCookies(res, user);

  return sendSuccess(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: {
      ...sanitizeUser(user),
      token: accessToken,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest("Email and password are required");
  }
  if (!BASIC_EMAIL_REGEX.test(email)) {
    throw ApiError.badRequest("Invalid email format");
  }

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const { accessToken } = setAuthCookies(res, user);

  return sendSuccess(res, {
    message: "Login successful",
    data: {
      ...sanitizeUser(user),
      token: accessToken,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);
  return sendSuccess(res, {
    message: "Logged out successfully",
  });
});

/**
 * POST /api/users/refresh-token
 * Exchange a valid refresh-token cookie for a new access-token cookie.
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const rt = req.cookies?.refreshToken;

  if (!rt) {
    throw ApiError.unauthorized("No refresh token provided. Please log in.");
  }

  let decoded;
  try {
    decoded = jwt.verify(rt, env.refreshTokenSecret);
  } catch (err) {
    clearAuthCookies(res);
    if (err.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Session expired. Please log in again.");
    }
    throw ApiError.unauthorized("Invalid refresh token.");
  }

  // Fetch fresh user data from DB to ensure the user still exists
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    clearAuthCookies(res);
    throw ApiError.unauthorized("User not found. Please log in again.");
  }

  // Issue a new access-token cookie (keep the refresh token, it's still valid)
  const { accessToken } = setAuthCookies(res, user);

  return sendSuccess(res, {
    message: "Token refreshed successfully",
    data: {
      ...sanitizeUser(user),
      token: accessToken,
    },
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  // If no authenticated user (from optionalAuth), return null so the
  // frontend stays on the login page instead of getting fake mock data.
  if (!req.user) {
    return sendSuccess(res, {
      message: "No authenticated user",
      data: null,
    });
  }

  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.clearCookie("token", { path: "/" });
    throw ApiError.unauthorized("User not found. Please log in again.");
  }

  return sendSuccess(res, {
    message: "User fetched successfully",
    data: sanitizeUser(user),
  });
});

/**
 * GET /api/users/stats
 * Returns counts of users grouped by role.
 */
export const getStats = asyncHandler(async (req, res) => {
  const totalUsers = await UserModel.countDocuments();
  const adminCount = await UserModel.countDocuments({ role: "admin" });
  const userCount = await UserModel.countDocuments({ role: "user" });

  // Get most recent 5 users for the dashboard
  const recentUsers = await UserModel.find()
    .sort({ _id: -1 })
    .limit(5)
    .select("name email role avatar createdAt");

  return sendSuccess(res, {
    message: "Stats fetched successfully",
    data: {
      totalUsers,
      adminCount,
      userCount,
      recentUsers,
    },
  });
});

/**
 * GET /api/users/all
 * Returns all users (admin only).
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find().select("name email role avatar createdAt");

  return sendSuccess(res, {
    message: "Users fetched successfully",
    data: users,
  });
});
