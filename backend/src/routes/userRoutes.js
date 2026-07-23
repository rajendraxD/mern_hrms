import express from "express";
import * as userController from "../controllers/userController.js";
import { isAuthenticate } from "../middlewares/auth.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { body } from "express-validator";

const router = express.Router();
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
router.post("/register", userController.register);
router.post("/login", loginValidate, authLimiter, userController.login);
router.post("/logout", isAuthenticate, userController.logout);
router.get("/refreshToken", userController.refreshToken);
router.get("/me", isAuthenticate, userController.profile);

export default router;
