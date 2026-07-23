import env from "./config/env.js";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { morganStream } from "./config/logger.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { requestContext } from "./middlewares/requestContext.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./config/logger.js";
import { sendSuccess } from "./utils/ApiResponse.js";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Connect to database
connectDB();

// Set security HTTP headers
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(
  cors({
    origin: [env.frontendUrl, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "1mb" }), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(morgan(env.isProd ? "combined" : "dev", { stream: morganStream }));
app.use(requestContext);

// Static avatars (local disk fallback)
//   app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes

app.get("/", (req, res) => {
  return sendSuccess(res, { message: "Server is running..." });
});

app.use("/api", routes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
