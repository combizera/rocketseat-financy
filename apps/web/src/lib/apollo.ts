import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_GQL_SERVER_URL}/graphql`,
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
})
