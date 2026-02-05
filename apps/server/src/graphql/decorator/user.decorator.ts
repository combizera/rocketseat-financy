import prisma from "@financy/db"
import { createParameterDecorator, type ResolverData } from "type-graphql"
import type { UserModel } from "@/models/user.model"
import type { GraphQLContext } from "../context"

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphQLContext>): Promise<UserModel | null> => {
      if (!context || !context.user) return null

      try {
        const user = await prisma.user.findUnique({
          where: {
            id: context.user,
          },
        })

        if (!user) throw new Error("User not found")

        return user

      } catch (error) {
        console.error("Error fetching user:", error)

        return null
      }
    },
  )
}
