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

const cookieOptions = {
  httpOnly: true,
  secure,
  sameSite: secure ? "none" : "lax",
  path: "/",
};

export const setTokenOnCookie = (res, token) => {
  const { accessToken, refreshToken } = token;
  res
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: env.jwt.accessExpiry,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: env.jwt.refreshExpiry,
    });
};

export const clearTokenOnCookie = (res) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions);
};
