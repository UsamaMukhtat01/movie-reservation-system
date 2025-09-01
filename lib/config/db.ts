import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
    // await mongoose.connect("mongodb://localhost:27017/", {
      // dbName: "moviedb",
    });
    isConnected = true;
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw err;
  }
};
