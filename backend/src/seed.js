import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.config.js";
import UserModel from "./models/user.model.js";
import { logger } from "./config/logger.config.js";

const ADMIN_USER = {
  name: "Rajendra kumar",
  email: "rajendraxd1@gmail.com",
  password: "admin123",
  role: "admin",
};

async function seed() {
  try {
    await connectDB();

    const force = process.argv.includes("--force");

    // Force mode: remove existing admin first
    if (force) {
      logger.info("Force mode enabled — dropping existing admin and re-creating...");
      await UserModel.deleteOne({ email: ADMIN_USER.email });
    }

    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ email: ADMIN_USER.email });
    if (existingAdmin) {
      logger.info(`Admin user already exists: ${existingAdmin.email}`);
      logger.info("Use the --force flag to overwrite: node src/seed.js --force");
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_USER.password, 12);

    // Create admin user
    const admin = await UserModel.create({
      name: ADMIN_USER.name,
      email: ADMIN_USER.email,
      password: hashedPassword,
      role: ADMIN_USER.role,
    });

    logger.info("✅ Admin user seeded successfully!");
    logger.info(`   Name:  ${admin.name}`);
    logger.info(`   Email: ${admin.email}`);
    logger.info(`   Role:  ${admin.role}`);
    logger.info("");
    logger.info("⚠️  IMPORTANT: Change the password after first login!");
    logger.info("   Default password: admin123");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error(`Seed failed: ${error.message}`);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
