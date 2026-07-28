import { OAuth2Client } from "google-auth-library";
import env from "../config/env.js";
import UserModel from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  generateTokens,
  setTokenOnCookie,
} from "../utils/token.js";

const client = new OAuth2Client(env.googleClientId);

export const googleAuth = asyncHandler(async (req, res) => {
  const { credential } = req.body;
  if (!credential) throw ApiError.badRequest("Google credential missing.");

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: env.googleClientId,
  });
  const payload = ticket.getPayload();
  if (!payload || !payload.email) throw ApiError.unauthorized("Invalid Google token.");

  const { email, name, picture, sub } = payload;

  // find existing user by googleId or email
  let user = await UserModel.findOne({
    $or: [{ googleId: sub }, { email }],
  });

  if (user) {
    // link googleId if existing user logged in via email/password
    if (!user.googleId) user.googleId = sub;
    if (!user.provider || user.provider === "local") user.provider = "google";
    if (picture) user.avatar = picture;
  } else {
    const isFirst = (await UserModel.countDocuments()) === 0;
    user = await UserModel.create({
      name: name || email.split("@")[0],
      email,
      avatar: picture || "",
      provider: "google",
      googleId: sub,
      password: "GOOGLE_OAUTH", // bcrypt hashes it in pre-save
      role: isFirst ? "admin" : "user",
    });
  }

  const tokens = generateTokens(user._id, user.role);
  setTokenOnCookie(res, tokens);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Google sign-in successful.",
    user,
    accessToken: tokens.accessToken,
  });
});