const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models/sequelize");
const routes = require("./routes/url"); // Make sure this file exports your route handlers
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/", routes); // Prefix all routes with /

const PORT = process.env.PORT || 4000;

global.dbConnection = db.sequelize;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
