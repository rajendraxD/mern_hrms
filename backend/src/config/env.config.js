import "dotenv/config";

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "mern-hrms-secret-key-change-in-prod",
  jwtExpiry: process.env.JWT_EXPIRY || "15m",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET ||
    "mern-hrms-refresh-secret-change-in-prod",
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
};

const env = envConfig;
export default env;
