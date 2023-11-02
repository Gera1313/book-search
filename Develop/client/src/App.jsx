// import React from 'react'; // Added this
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'; // Added this
import Navbar from './components/Navbar';

function App() {
  // Added line 9-16
  const httpLink = createHttpLink({
    uri: '/graphql' // URI of appollo goes here
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;

// Also added line 19 and 22