/**
 * - Connects with Mongo DB
 */

// Require "configs.js" to use the environmental variables to connect with Mongo
const configs = require("../configs");

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

// Export
module.exports = dbConnection;
