import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { useAuthStore } from "@/stores/auth"

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_GQL_SERVER_URL}/graphql`,
})

const authLink = new SetContextLink((_, prevContext: Record<string, unknown>) => {
  const state = useAuthStore.getState()
  const token = state.token

  return {
    headers: {
      ...(prevContext && typeof prevContext.headers === "object" ? prevContext.headers as Record<string, string> : {}),
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
})
