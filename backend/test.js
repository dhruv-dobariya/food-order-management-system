import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("URI:", process.env.MONGODB_URI);

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB Connected Successfully");
  process.exit(0);
} catch (err) {
  console.error("❌ Error:");
  console.error(err);
  process.exit(1);
}