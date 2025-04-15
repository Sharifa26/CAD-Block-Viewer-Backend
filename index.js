const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models/sequelize");
const routes = require("./routes/url"); // Make sure this file exports your route handlers
require("dotenv").config();

// CORS Options
const corsOptions = {
  origin: process.env.FRONT_URL, // Allow your frontend domain
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies or credentials to be sent
  optionsSuccessStatus: 200, // Success status for OPTIONS request
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/", routes); // Prefix all routes with /

const PORT = process.env.PORT || 4000;

global.dbConnection = db.sequelize;

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}


module.exports = app;