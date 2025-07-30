// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import configuration and route files
import connectDB from "./config/db.js";
import tmdbRoutes from "./routes/tmdbRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Optional root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/tmdb", tmdbRoutes);                   // TMDB Search Routes
app.use("/api/auth", authRoutes);                   // Auth Routes
app.use("/api/recommendations", recommendationRoutes); // Movie Recommendations
app.use("/api/users", userRoutes);                  // User Favorites, Watchlist, Profile

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
