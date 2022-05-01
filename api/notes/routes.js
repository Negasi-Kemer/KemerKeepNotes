// Require express - will be used to call "Router" method
const express = require("express");

// Call router function
const route = express.Router();

// Require controller file
const controller = require("./controller");

// Create the routes
route.post("/", controller.createNote);

// Get all notes
route.get("/", controller.getAllNotes);

// Get note by id
route.get("/:id", controller.getNoteById);

// Update note
route.patch("/:id", controller.updateNote);

// Delete note
route.delete("/:id", controller.deleteNote);

// Export routes
module.exports = route;