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
import { validationResult } from "express-validator";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw ApiError.badRequest("Missing fields.");

  const isExistingUser = await UserModel.findOne({ email });
  if (isExistingUser) throw ApiError.conflict("User already exists.");

  let user = await UserModel.create({
    name,
    email,
    password,
  });

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);

  user.refreshToken = tokens.refreshToken;
  await user.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    // return next(new ErrorHandler(errorMessages, 400));
    throw ApiError.validation(errorMessages);
  }

  const { email, password } = req.body;

  if (!email || !password) throw ApiError.badRequest("Missing fields.");

  let user = await UserModel.findOne({ email });
  if (!user) throw ApiError.unauthorized("Invalid credentials.");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw ApiError.unauthorized("Invalid credentials.");

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);

  user.refreshToken = tokens.refreshToken;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "User logged in successfully.",
    user,
  });
});

export const logout = asyncHandler(async (req, res) => {
  clearTokenOnCookie(res);

  req.user.refreshToken = null;
  await req.user.save();

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
  const user = await UserModel.findOne({
    _id: decoded.id,
    refreshToken: refreshToken,
  }).select("_id role");

  if (!user) {
    throw ApiError.unauthorized("Invalid or expired refresh token.");
  }

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);

  user.refreshToken = tokens.refreshToken;
  await user.save();

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
