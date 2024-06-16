const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = away User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          );

          return userData;
        }

        throw new AuthenticationError('You must be logged in to do this.');
      },
    },

    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },

      login: async (_, { email, password }) => { // Maybe put something in blank spaces later on? 
        // Implement user authentication logic here

        // Check the provided credentials, generate and return a token
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }
  
        const passwordIsValid = user.checkPassword(password);
  
        if (!passwordIsValid) {
          throw new AuthenticationError('Invalid credentials');
        }
  
        const token = user.signToken();
        return { token, user };
      },
      // Define other mutation resolvers here.
      addUser: async (_, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = user.signToken();
        return { token, user };
    },

    saveBook: async (_, { bookData }) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to do this.');
      }
// Implements logic to save a book to the user's account and return the updated user data
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { savedBooks: bookData } },
        { new: true }
      );
      return updatedUser;
    },

    removeBook: async (_, { bookId }) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to do this.');
      }

      // Implements logic to remove a book from the user's account and return the updated user data
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId }}},
        { new: true }
      );
      return updatedUser;
    },
  },
  };
  
  module.exports = resolvers;

  // Added more code for now but, come back to this one later. The context needs more work