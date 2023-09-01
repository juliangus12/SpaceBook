import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const CONNECTION = process.env.MONGODB_CONNECTION;

export const connectToDatabase = () => {
  return mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
};
