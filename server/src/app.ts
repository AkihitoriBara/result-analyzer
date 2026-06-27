import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use("/api", uploadRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from Result Analyzer Backend!");
});

export default app;
