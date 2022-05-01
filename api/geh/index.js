/**
 * - Global error handler
 * - Dev and Prod Error
 */

// Configs
const configs = require("../../configs");

// Send Dev Error
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

// Send Prod Error
const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps!! Unknown Error.",
    });
  }
};

// Global Error Handler
const geh = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ERROR";

  // For dev env
  if (configs.env === "development") {
    // Send Dev Error
    sendDevError(err, res);
  } else if (configs.env === "production") {
    sendProdError(err, res);
  }
};

// Export geh
module.exports = geh;
