import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();

connectDB();

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/find", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
