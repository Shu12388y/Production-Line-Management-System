import mongoose from "mongoose";

export const DB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("database connected");
  } catch (error) {
    console.error("Failed to connect the database " + error);
  }
};
