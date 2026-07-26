import jwt from "jsonwebtoken";
import env from "../config/env.js";

const secure = env.isProd;

/**
 * Generate a short-lived access token
 */
export const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiry,
  });
};

/**
 * Generate a long-lived refresh token
 */
export const generateRefreshToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiry,
  });
};

/**
 * Verify an access token
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwt.accessSecret);
};

/**
 * Verify a refresh token
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwt.refreshSecret);
};

/**
 * Generate both tokens and return them with cookie options
 */
export const generateTokens = (userId, role) => {
  const accessToken = generateAccessToken(userId, role);
  const refreshToken = generateRefreshToken(userId, role);

  return { accessToken, refreshToken };
};

const parseDurationToMs = (duration) => {
  if (typeof duration === "number") return duration;
  if (!duration || typeof duration !== "string") return 24 * 60 * 60 * 1000;

  const unit = duration.slice(-1);
  const value = parseInt(duration.slice(0, -1), 10);
  if (isNaN(value)) return 24 * 60 * 60 * 1000;

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return value;
  }
};

const cookieOptions = {
  secure: env.isProd,
  sameSite: env.isProd ? "none" : "lax",
  path: "/",
  httpOnly: true,
};

export const setTokenOnCookie = (res, token) => {
  const { accessToken, refreshToken } = token;
  // const accessMs = parseDurationToMs(env.jwt.accessExpiry);
  const refreshMs = parseDurationToMs(env.jwt.refreshExpiry);

  res
    // .cookie("accessToken", accessToken, {
    //   ...cookieOptions,
    //   maxAge: accessMs,
    // })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: refreshMs,
    });
};

export const clearTokenOnCookie = (res) => {
  res
    // .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions);
};
