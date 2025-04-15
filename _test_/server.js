require('dotenv').config({ path: '.env.test' });
const express = require("express");
const app = express();
const db = require("../models/sequelize");
const routes = require("../routes/url"); // Make sure this file exports your route handlers


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/", routes); // Prefix all routes with /

const PORT = process.env.PORT || 2000;

global.dbConnection = db.sequelize;

if (process.env.NODE_ENV === "test") {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}


module.exports = app;