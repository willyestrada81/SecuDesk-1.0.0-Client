import React from 'react'
import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

import App from './App'

// const server = 'https://pacific-bastion-23508.herokuapp.com'
const server = 'http://localhost:5000/'
const httpLink = createUploadLink({
  uri: server
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
