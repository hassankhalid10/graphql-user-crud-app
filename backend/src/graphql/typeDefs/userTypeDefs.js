import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): String
  }
`;

// **Summary:**
// This code defines the GraphQL schema for a `User` model with fields like `id`, `name`, `email`, and `age`.
// It includes queries to fetch users and a specific user by ID, as well as mutations to create, update, and delete users.
