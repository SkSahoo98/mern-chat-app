import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};


