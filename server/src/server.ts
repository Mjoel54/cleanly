// Import required dependencies
import express from "express"; // Import the express framework to build the server
import db from "./config/connection"; // Import the connection to the database
import routes from "./routes/api/index"; // Import defined routes for handling API requests

const cwd = process.cwd();

const PORT = 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes("01-Activities")
//   ? cwd.split("01-Activities")[1]
//   : cwd;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Attaches the imported routes to the Express application
app.use(routes);

// Once the database connection is established, the server starts listening on the specified PORT. The server will only start if the database connection is successful.
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
