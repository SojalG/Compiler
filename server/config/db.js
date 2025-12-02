import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://2k23cs2311890_db_user:123456789123456789@compiler.wynz2yf.mongodb.net/?appName=Compiler`
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MONGO ERROR:", err.message);
  }
};

export default connectDB;
