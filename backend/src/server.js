import env from "./config/env.js";
import app from "./app.js";
import { logger } from "./config/logger.js";

const startServer = () => {
  try {
    const server = app.listen(env.port, () => {
      logger.info(
        `Server running on http://localhost:${env.port} [${env.nodeEnv}]`,
      );
    });

    const shutdown = (signal) => {
      logger.info(`${signal} received, shutting down...`);
      server.close(() => process.exit(0));
    };
    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

if (!env.isVercel) startServer();

export default startServer;
