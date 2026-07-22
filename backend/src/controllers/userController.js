import UserModel from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  clearTokenOnCookie,
  generateTokens,
  setTokenOnCookie,
  verifyRefreshToken,
} from "../utils/token.js";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw ApiError.badRequest("Missing fields.");

  const isExistingUser = await UserModel.findOne({ email });
  if (isExistingUser) throw ApiError.conflict("User already exists.");

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw ApiError.badRequest("Missing fields.");

  const user = await UserModel.findOne({ email });
  if (!user) throw ApiError.unauthorized("Invalid credentials.");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw ApiError.unauthorized("Invalid credentials.");

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);

  return res.status(200).json({
    success: true,
    message: "User logged in successfully.",
    user,
  });
});

export const logout = asyncHandler(async (req, res) => {
  clearTokenOnCookie(res);
  return res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    throw ApiError.unauthorized("Authentication required. Please log in.");

  const decoded = verifyRefreshToken(refreshToken);
  const user = await UserModel.findById(decoded.id);
  if (!user) throw ApiError.unauthorized("User not found.");

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully.",
  });
});

export const profile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully.",
    user: req.user,
  });
});
