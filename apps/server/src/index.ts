import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { buildSchema } from "type-graphql"
import { TestResolver } from "./resolvers/test.resolver"

async function startServer() {
  const schema = await buildSchema({
    resolvers: [TestResolver],
    validate: false,
  })

  const apollo = new ApolloServer({
    schema,
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
