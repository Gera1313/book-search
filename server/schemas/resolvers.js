// const { AuthenticationError } = require("apollo-server-express");
// const { User, Book } = require("../models");
// const { signToken } = require("../utils/auth");

// const resolvers = {
//   Query: {
//     me: async (parent, args, context) => {
//       if (context.user) {
//         const userData = await User.findOne({ _id: context.user._id }).select(
//           "-__v -password"
//         );

//         return userData;
//       }

//       throw new AuthenticationError("Not logged in");
//     },
//   },

//   Mutation: {
//     addUser: async (parent, { username, email, password }) => {
//       const user = await User.create({ username, email, password });
//       const token = signToken(user);
//       return { token, user };
//     },
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError("Incorrect credentials");
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError("Incorrect credentials");
//       }

//       const token = signToken(user);
//       return { token, user };
//     },
//     saveBook: async (parent, { bookData }, context) => {
//       if (context.user) {
//         const addedBook = await User.findByIdAndUpdate(
//           { _id: context.user._id },
//           { $push: { savedBooks: bookData } },
//           { new: true }
//         );

//         return addedBook;
//       }

//       throw new AuthenticationError("You need to be logged in!");
//     },
//     removeBook: async (parent, { bookId }, context) => {
//       if (context.user) {
//         const updatedUser = await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { savedBook: { bookId } } },
//           { new: true, runValidators: true }
//         );

//         return updatedUser;
//       }

//       throw new AuthenticationError("You need to be logged in!");
//     },
//   },
// };

// module.exports = resolvers;

const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;