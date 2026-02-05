import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { buildSchema } from "type-graphql"
import { buildContext } from "./graphql/context"
import { AuthResolver } from "./resolvers/auth.resolver"
import { CategoryResolver } from "./resolvers/category.resolver"
import { TransactionResolver } from "./resolvers/transaction.resolver"
import { UserResolver } from "./resolvers/user.resolver"

import "./enums/transaction.enum"

async function startServer() {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      CategoryResolver,
      TransactionResolver,
    ],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  })

  const apollo = new ApolloServer({
    schema,
    introspection: true,
  })

  const { url } = await startStandaloneServer(apollo, {
    listen: { port: 3005 },
    context: async ({ req, res }) => {
      return buildContext({ req, res })
    },
  })

  console.log(`🚀 Server running at ${url}`)
}

startServer().catch((err) => {
  console.error(err)
  process.exit(1)
})
