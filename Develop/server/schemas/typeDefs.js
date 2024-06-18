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
    type Book {
    bookId: String
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }
    type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

`

// Created this file as well. 