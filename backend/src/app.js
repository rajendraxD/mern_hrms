import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import env from "./config/env.config.js";
import { morganStream } from "./config/logger.config.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { requestContext } from "./middlewares/requestContext.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./config/logger.config.js";
import { sendSuccess } from "./utils/ApiResponse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  app.use(
    cors({
      origin: "*",
      credentials: true,
    }),
  );
  app.use(
    express.json({ limit: "1mb" }),
    express.urlencoded({ extended: true }),
  );
  app.use(cookieParser());
  app.use(compression());
  app.use(morgan(env.isProd ? "combined" : "dev", { stream: morganStream }));
  app.use(requestContext);

  // Static avatars (local disk fallback)
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

  app.get("/", (req, res) => {
    return sendSuccess(res, { message: "Server is running..." });
  });

  // app.use("/api", apiLimiter, routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
