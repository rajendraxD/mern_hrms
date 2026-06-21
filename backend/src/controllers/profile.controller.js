import UserModel from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * POST /api/profile/avatar
 * Upload a new avatar image for the current user.
 * Expects multipart/form-data with an "avatar" file field.
 * Requires authentication (handled by auth middleware).
 */
export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest("No file uploaded. Please select an image.");
  }

  // Build the URL path to the uploaded avatar
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;

  // Update the user's avatar in the database
  await UserModel.findByIdAndUpdate(req.user.id, { avatar: avatarUrl });

  return sendSuccess(res, {
    statusCode: 200,
    message: "Profile picture uploaded successfully.",
    data: { avatar: avatarUrl },
  });
});
