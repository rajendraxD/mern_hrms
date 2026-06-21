import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure uploads/avatars directory exists
const avatarsDir = path.join(__dirname, "..", "..", "uploads", "avatars");
fs.mkdirSync(avatarsDir, { recursive: true });

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `avatar-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.",
      ),
      false,
    );
  }
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});
