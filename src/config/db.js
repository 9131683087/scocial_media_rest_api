import mongoose from "mongoose";

const baseUrl = process.env.MONGODB;

export const connectToDb = async () => {
  try {
    await mongoose.connect(baseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with a failure code
  }
};
