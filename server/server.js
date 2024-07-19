// const express = require("express");
// const path = require("path");
// const db = require("./config/connection");
// const routes = require("./routes");

// // Apollo Server connection
// const { ApolloServer } = require("apollo-server-express");
// const { authMiddleware } = require("./utils/auth");

// // import typeDefs & resolvers
// const { typeDefs, resolvers } = require("./schemas");

// const app = express();
// const PORT = process.env.PORT || 3001;

// const startServer = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleware,
//   });

//   await server.start();

//   server.applyMiddleware({ app });

//   console.log(
//     `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
//   );
// };

// startServer();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// // app.use(routes);
// db.once("open", () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

const express = require('express');
const path = require('path');
// Import the ApolloServer class
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();