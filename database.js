import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const port = process.env.MONGODB_URL || 3000
    console.log(port);
    console.log(port);
    await mongoose.connect(port, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
