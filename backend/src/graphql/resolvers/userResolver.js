import { User } from '../../models/User.js';

export const userResolver = {
  Query: {
    // Fetch all users from the database
    users: async () => {
      try {
        return await User.find(); // Retrieve all users asynchronously
      } catch (error) {
        throw new Error("Failed to fetch users: " + error.message); // Error handling for DB issues
      }
    },

    // Fetch a single user by ID
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id); // Retrieve user by ID
        if (!user) throw new Error("User not found"); // If no user found, throw an error
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user: " + error.message); // Error handling for DB issues
      }
    },
  },

  Mutation: {
    // Create a new user in the database
    createUser: async (_, args) => {
      try {
        const newUser = await User.create(args); // Create a new user with provided arguments
        return newUser;
      } catch (error) {
        throw new Error("Failed to create user: " + error.message); // Error handling for DB issues
      }
    },

    // Update an existing user by ID
    updateUser: async (_, { id, ...updates }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }); // Update user details
        if (!updatedUser) throw new Error("User not found to update"); // Error if no user found
        return updatedUser;
      } catch (error) {
        throw new Error("Failed to update user: " + error.message); // Error handling for DB issues
      }
    },

    // Delete a user by ID
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id); // Delete user by ID
        if (!deletedUser) throw new Error("User not found to delete"); // Error if no user found
        return "User deleted"; // Return a success message
      } catch (error) {
        throw new Error("Failed to delete user: " + error.message); // Error handling for DB issues
      }
    },
  },
};

// **Summary:**
// This code defines a GraphQL resolver for performing CRUD operations (Create, Read, Update, Delete) on a `User` model using Mongoose. 
// Each query or mutation is wrapped in try-catch blocks to handle any database errors and return appropriate messages.
