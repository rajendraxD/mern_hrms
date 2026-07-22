import express from "express";
import * as userController from "../controllers/userController.js";
import { isAuthenticate } from "../middlewares/auth.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login",authLimiter, userController.login);
router.post("/logout", isAuthenticate, userController.logout);
router.get("/refreshToken", userController.refreshToken);
router.get("/me", isAuthenticate, userController.profile);

export default router;
