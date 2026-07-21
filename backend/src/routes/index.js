import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
// router.use('/auth', require('./auth'));
// router.use('/post', require('./post'));
// router.use('/comment', require('./comment'));

export default router;
