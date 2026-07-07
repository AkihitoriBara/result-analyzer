import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.routes.js";
import studentRoutes from "./routes/student.routes.js";
import statisticsRoutes from "./routes/statistics.routes.js";
import resultRoutes from "./routes/result.routes.js";

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

// getting student
app.use("/api/students", studentRoutes);

// getting statistics
app.use("/api/statistics", statisticsRoutes);

// get topper
app.use("/api/results", resultRoutes);

export default app;
