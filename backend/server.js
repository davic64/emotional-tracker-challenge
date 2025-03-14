const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const emotionRoutes = require("./routes/emotionRoutes");
const configDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
configDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/emotions", emotionRoutes);

// Unprotected test route
app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
