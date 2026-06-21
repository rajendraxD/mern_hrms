import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;
  return sendSuccess(res, {
    message: "User registered successfully",
    data: { name, email, password, avatar,role:'admin' },
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: "Users fetched successfully",
    data: { name: "Rahul", age: 30 },
  });
});
