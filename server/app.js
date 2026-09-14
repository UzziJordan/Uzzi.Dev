const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const stackRoutes = require("./routes/stackRoutes");
const contactRoutes = require("./routes/contactRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allows same-origin/server requests without an Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stack", stackRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/messages", messageRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "API is running",
  });
});

module.exports = app;   
