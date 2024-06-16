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

      login: async (parent, { email, password }) => {
        // Implement user authentication logic here. Check the provided credentials, generate and return a token
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Invalid credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },

    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const addedBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return addedBook;
      }

      throw new AuthenticationError("You need to be logged in");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBook: { bookId } } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;