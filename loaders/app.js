// Express
const express = require("express");

// App
const app = express();

// Helmet
const helmet = require("helmet");

// Mnongo santize
const mongoSanitize = require("express-mongo-sanitize");

// Rate limiter
const rateLimiter = require("express-rate-limit");

// Cross site scripting
const xss = require("xss-clean");

// Compression
const compression = require("compression");

// Global error handler
const geh = require("../api/geh");

// App error
const appError = require("../utils/appError");

// Routers
// User router
const userRouter = require("../api/users/routes");
const AppError = require("../utils/appError");

// Third party middlewares
app.use(helmet());
app.use(compression());
app.use(xss());
app.use(mongoSanitize());
app.use(
  rateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 100,
  })
);

// Built in middlewares
// Limit size of request body to 16 MB
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: false }));

// User routers
app.use("/api/v1/user/", userRouter);

// Handle non existing urls
app.use("*", (req, res, next) => {
  return next(
    new AppError(
      `Unknown URL - ${req.protocol}://${req.get("host")}${req.originalUrl}`,
      400
    )
  );
});

// Use geh
app.use(geh);

// Export app
module.exports = app;
