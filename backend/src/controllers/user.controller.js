import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: "Users fetched successfully",
    data: { name: "Rahul", age: 30 },
  });
});
