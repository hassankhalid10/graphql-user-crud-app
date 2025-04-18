import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { typeDefs, resolvers } from './graphql/schema.js';

dotenv.config(); // Load environment variables from a .env file

const app = express(); // Initialize an Express app
await connectDB(); // Connect to the database

const server = new ApolloServer({ typeDefs, resolvers }); // Create an ApolloServer instance with the schema
await server.start(); // Start the Apollo server

server.applyMiddleware({ app }); // Apply Apollo server as middleware to the Express app

const PORT = process.env.PORT || 5000; // Set the port from environment variable or default to 5000
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`) // Log server start message
);

// **Summary:**
// This code sets up an Express server integrated with Apollo Server to serve a GraphQL API. It connects to the database, applies middleware, and listens on a specified port. The server handles GraphQL queries and mutations using the provided typeDefs and resolvers.
