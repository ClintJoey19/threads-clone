import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) return console.log("MONGO URL is not found");
  if (isConnected) return console.log("DB is already connected");

  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error(error);
  }
};
