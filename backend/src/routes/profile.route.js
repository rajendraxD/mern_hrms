import express from "express";
import multer from "multer";
import * as profileController from "../controllers/profile.controller.js";
import { uploadAvatar } from "../config/multer.config.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// POST /api/profile/avatar — upload a new avatar image
router.post(
  "/avatar",
  authenticate,
  (req, res, next) => {
    uploadAvatar.single("avatar")(req, res, (err) => {
      if (err) {
        // Multer-specific errors (file too large, wrong type, etc.)
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              message: "File size must be under 5MB.",
            });
          }
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        // Custom ApiError from fileFilter
        return res.status(err.statusCode || 400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  },
  profileController.uploadAvatar,
);

export default router;
