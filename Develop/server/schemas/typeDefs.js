const { gql } = require('apollo-server-express');

// I define my GraphQL schema. Define the necessary Query and Mutation types.

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

`

// Created this file as well. 