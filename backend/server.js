import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import simRoutes from "./routes/simulations.js";
import enrollRoutes from "./routes/enrollments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

// Connect DB
connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/blixora");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/simulations", simRoutes);
app.use("/api/enrollments", enrollRoutes);

// API health check
app.get("/api", (req, res) => res.send("Blixora Labs API is running"));

// Serve frontend (after building React app)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
