import express from "express";
import * as userController from "../controllers/userController.js";
import { isAuthenticate } from "../middlewares/auth.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { body } from "express-validator";

const router = express.Router();
const registerValidate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters long"),
];

const loginValidate = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters long"),
];

const profileValidate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone number is too long"),
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Bio cannot exceed 300 characters"),
];

const changePasswordValidate = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6, max: 30 })
    .withMessage("New password must be between 6 and 30 characters long"),
];

router.post(
  "/register",
  registerValidate,
  authLimiter,
  userController.register,
);
router.post("/login", loginValidate, authLimiter, userController.login);
router.post("/logout", isAuthenticate, userController.logout);
router.get("/refreshToken", userController.refreshToken);
router.get("/me", isAuthenticate, userController.profile);
router.put(
  "/profile",
  isAuthenticate,
  profileValidate,
  userController.updateProfile,
);
router.put(
  "/change-password",
  isAuthenticate,
  changePasswordValidate,
  userController.changePassword,
);

export default router;
