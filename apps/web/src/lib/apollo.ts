import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

const httpLink = new HttpLink({
  // TODO: move to env variable
  uri: "http://localhost:3005/graphql",
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
})
