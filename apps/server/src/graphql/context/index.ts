import type { ExpressContextFunctionArgument } from "@as-integrations/express5"
import { type JwtPayload, verifyJwt } from "@/utils/jwt"

export type GraphQLContext = {
  user: string | undefined
  token: string | undefined
  req: ExpressContextFunctionArgument["req"]
  res: ExpressContextFunctionArgument["res"]
}

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphQLContext> => {
  const authHeader = req.headers.authorization

  let user: string | undefined
  let token: string | undefined

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length)

    try {
      const payload = verifyJwt(token) as JwtPayload
      user = payload.id
    } catch(error) {
      console.error("JWT verification failed:", error)
    }
  }

  return { user, token, req, res }
}
