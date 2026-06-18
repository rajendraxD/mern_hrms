import "dotenv/config";

export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
};

const env = envConfig;
export default env;
