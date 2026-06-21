import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

//   router.route("/").get(userController.getUsers);

router
  .post("/register", userController.register)
  .post("/login", userController.register)
  .get("/getUser", userController.getUsers);
//   .post("", userController.createUser)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

export default router;
