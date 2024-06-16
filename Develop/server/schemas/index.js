// import the typeDefs and resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// export the typeDefs and resolvers
module.exports = { typeDefs, resolvers };





// const { gql } = require('apollo-server-express');
// const typeDefs = require('./typeDefs');
// const resolvers = require('../schemas/resolvers');

// // Defining a base type for my schema
// const rootTypeDefs = gql`
//   type Query {
//     _empty: String
//   }

//   type Mutation {
//     _empty: String
//   }
// `;

// module.exports = [rootTypeDefs, typeDefs, resolvers];