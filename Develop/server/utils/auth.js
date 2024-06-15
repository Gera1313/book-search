const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

// Apollo server authentication

module.exports = {
  authMiddleware: function ({ req }) {
    //allows token to be sent via req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization; 

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data

  }
}