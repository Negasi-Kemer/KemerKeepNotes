/**
 * - User router
 */

// Express
const express = require("express");

// Router
const router = express.Router();

// User Controller
const userController = require("./controller");

router.route("/").post(userController.createUser);

// router.post("/login", userController.login);

// router.route("/:id").get(userController.getUser);

// Export router
module.exports = router;
