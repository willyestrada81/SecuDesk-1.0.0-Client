import React from 'react'
import {
  ApolloClient,
  NormalizedCacheObject,
  gql,
  InMemoryCache
} from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
// import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

import App from './App'

const httpLink = createUploadLink({
  uri: 'https://pacific-bastion-23508.herokuapp.com'
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  typeDefs
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
