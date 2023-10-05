import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const port = process.env.MONGODB_URL || 3000
    console.log(port);
    await mongoose.connect(port);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
