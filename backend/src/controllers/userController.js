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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw ApiError.validation(errorMessages);
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw ApiError.badRequest("Missing fields.");

  const isExistingUser = await UserModel.findOne({ email });
  if (isExistingUser) throw ApiError.conflict("User already exists.");

  const isFirst = (await UserModel.countDocuments()) === 0;
  let user = await UserModel.create({
    name,
    email,
    password,
    role: isFirst ? "admin" : "user",
  });

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);

  user.refreshToken = tokens.refreshToken;
  await user.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user,
    accessToken: tokens.accessToken,
  });
});

export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
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
    accessToken: tokens.accessToken,
  });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    const user = await UserModel.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  clearTokenOnCookie(res);
  return res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(204).end();

  const decoded = verifyRefreshToken(refreshToken);
  const user = await UserModel.findOne({
    _id: decoded.id,
    refreshToken: refreshToken,
  });
  // .select("_id role");

  if (!user) {
    throw ApiError.unauthorized("Invalid or expired refresh token.");
  }

  const tokens = generateTokens(user._id, user.role);

  user.refreshToken = tokens.refreshToken;
  await user.save();

  setTokenOnCookie(res, tokens);
  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully.",
    user,
    accessToken: tokens.accessToken,
  });
});

export const profile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully.",
    user: req.user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw ApiError.validation(errorMessages);
  }

  const { name, department, jobTitle, phone, bio, avatar } = req.body;
  const user = req.user;

  if (name !== undefined) user.name = name;
  if (department !== undefined) user.department = department;
  if (jobTitle !== undefined) user.jobTitle = jobTitle;
  if (phone !== undefined) user.phone = phone;
  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw ApiError.validation(errorMessages);
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw ApiError.badRequest("Please provide both current and new password.");
  }

  const user = await UserModel.findById(req.user._id);
  if (!user) {
    throw ApiError.notFound("User not found.");
  }

  const isPasswordValid = await user.comparePassword(currentPassword);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Current password is incorrect.");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully.",
  });
});
