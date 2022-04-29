/**
 * This file is for creating the server
 */

// Require express
const express = require("express");

// Execute express and bind it value to variable 'app'
const app = express();

// Port - use environmental port or 3000
const port = process.env.port || 3000;

// Require "configs.js" to use the environmental variables to connect with Mongo
const configs = require("./configs");

// Require mongoose
const mongoose = require("mongoose");

// Connect with mongoose
mongoose
  .connect(configs.db.remote)
  .then(() => {
    console.log("Connected to Mongo DB successfully");
  })
  .catch((err) => {
    console.log(`Failed to connect due to ${err}`);
  });

// Get the mongoose connection
const dbConnection = mongoose.connection;

// Listen to disconnect event and handle error when disconnecting
dbConnection.on("disconnect", () => {
  console.log("Mongo DB disconnected");
});

// Listen to error event and log the error
dbConnection.on("error", (err) => {
  console.log("Error occurred in Mongo DB");
  console.log(err);
});

// User JSON parser
app.use(express.json());

// Require "routes"
const notesRoutes = require("./notes/routes");

// Use routes
app.use("/api/v1/kemernotes/", notesRoutes);

// Listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
