import React from "react";
import App from "./App";

import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: "https://salty-dawn-17927.herokuapp.com/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return{
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
