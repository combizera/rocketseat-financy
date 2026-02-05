import type { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone"
import { type JwtPayload, verifyJwt } from "@/utils/jwt"

export type GraphQLContext = {
  user: string | undefined  
  token: string | undefined
}

export const buildContext = async ({
  req,
}: StandaloneServerContextFunctionArgument): Promise<GraphQLContext> => {
  const authHeader = req.headers.authorization

  let user: string | undefined
  let token: string | undefined

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7)

    try {
      const payload = verifyJwt(token) as JwtPayload
      user = payload.id
    } catch(error) {
      console.error("Error verifying JWT:", error)
    }
  }

  return { user, token }
}