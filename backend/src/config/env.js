import "dotenv/config";

const getEnv = (key, defaultValue) => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue) return defaultValue;
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const envConfig = {
  port: getEnv("PORT", 5000),
  nodeEnv: getEnv("NODE_ENV", "development"),
  frontendUrl: getEnv("FRONTEND_URL", "http://localhost:5173"),
  isProd: getEnv("NODE_ENV", "development") === "production",
  mongoUri: getEnv("MONGO_URI", "mongodb://localhost:27017/hrms"),
  isVercel: getEnv("VERCEL", "false") === "true",
  jwt: {
    accessSecret: getEnv("JWT_ACCESS_SECRET", "access_secret"),
    accessExpiry: getEnv("JWT_ACCESS_EXPIRY", "1d"),
    refreshSecret: getEnv("JWT_REFRESH_SECRET", "refresh_secret"),
    refreshExpiry: getEnv("JWT_REFRESH_EXPIRY", "7d"),
  },
};

const env = envConfig;
export default env;
