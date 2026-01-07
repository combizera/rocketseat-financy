import { Query, Resolver } from "type-graphql"

@Resolver()
export class TestResolver {
  @Query(() => String)
  hello(): string {
    return "Hello from TypeGraphQL!"
  }
}