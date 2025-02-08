import express from "express"; // To create the server and define routes
import path from "node:path"; // To work with file and directory paths
import type { Request, Response } from "express"; // Type definitions for TypeScript
import db from "./config/connection.js"; // function to initialise the database connection
import { ApolloServer } from "@apollo/server"; // Main GraphQL server from Apollo
import { expressMiddleware } from "@apollo/server/express4"; // Middleware to integrate Apollo Server with Express
import { typeDefs, resolvers } from "./schemas/index.js"; // GraphQL schema and resolvers
import { authenticateToken } from "./utils/auth.js"; // Middleware for authentication

// This auth.ts file is setting up an Express server integrated with Apollo Server to serve a GraphQL API

// Creates an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start the Apollo Server
const startApolloServer = async () => {
  await server.start();

  // Create an Express app instance
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Set up the graphql endpoint with the Apollo Server middleware
  app.use(
    "/graphql",
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Starts the express server and listens on PORT
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Execute to start the apollo server
startApolloServer();
