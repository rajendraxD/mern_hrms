import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { authenticate, optionalAuth, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/register", authLimiter, userController.register);
router.post("/login", authLimiter, userController.login);
router.post("/logout", userController.logout);
router.post("/refresh-token", userController.refreshToken);

// Protected routes
router.get("/getUser", optionalAuth, userController.getUsers);
router.get("/stats", authenticate, userController.getStats);
router.get("/all", authenticate, requireAdmin, userController.getAllUsers);

export default router;
