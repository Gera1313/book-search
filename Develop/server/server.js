const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Import Apollo server
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require("./utils/auth");

// import typeDefs & resolvers
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

// ADDED 22-30. Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs, // Use imported type definitions
  resolvers, // Use imported resolvers
  context: ({ req }) => ({ req }), // Pass the req object to the context for authentication
});

// Apply Apollo Server as middleware
server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});


// Modified this file. 