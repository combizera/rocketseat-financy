import "reflect-metadata";
import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `
#graphql
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
  },
}

async function startServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  })

  const { url } = await startStandaloneServer(apollo, {
    listen: { port: 3000 },
  })

  console.log(`🚀 Server running at ${url}`)
}

startServer().catch((err) => {
  console.error(err)
  process.exit(1)
})