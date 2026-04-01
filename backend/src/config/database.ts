import mongoose from "mongoose";
import config from "./index";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`  MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error: any) {
    console.error(`  MongoDB Connection Error: ${error.message}`);
    throw error;
  }

  mongoose.connection.on("error", (err) => {
    console.error("  MongoDB Error after initial connection:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("  MongoDB disconnected. Attempting reconnect...");
  });
};

export default connectDB;
