const { AuthenticationError } = require('apollo-server-express');
const { User } = require('./models');
// Other imports??

const resolvers = {
    Query: {
      me: async (_, __, context) => { // Maybe put something in blank spaces later on? 
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to do this.');
        }
        return User.findById(context.user._id);
      },
      // Maybe define other query resolvers here?
    },

    Mutation: {
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
      
    },
  };
  
  module.exports = resolvers;

  // Come back to this one later. 