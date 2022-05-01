/**
 * Igniter file to start the server
 */

// http
const http = require("http");

// App
const App = require("./app");

// Start db
const dbConn = require("./startDB");

// Port
const port = process.env.port || 3000;

// Create server
const server = http.createServer(App);

// Igniter
module.exports = () => {
  // Listen on the server
  server.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
};

// Majestic close
process.on("SIGINT", () => {
  // Server closing
  server.close(() => {
    console.log("Server closing");
  });

  // Close DB
  dbConn.close(() => {
    console.log("DB is closing");
  });
});
