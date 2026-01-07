import prisma from "@financy/db"
import type { User } from "node_modules/@financy/db/prisma/generated/client"
import type { LoginInput, RegisterInput } from "@/dtos/input/auth.input"
import { comparePassword, hashPassword } from "@/utils/hash"
import { signJwt } from "@/utils/jwt"

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (existingUser) throw new Error("User already exists")

    const hash = await hashPassword(data.password)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    })

    return this.generateTokens(user)
  }

  async login(data: LoginInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      }
    })

    if (!existingUser) throw new Error("Invalid credentials")

    const compare = await comparePassword(data.password, existingUser.password)
    if (!compare) throw new Error("Invalid credentials")

    return this.generateTokens(existingUser)
  }

  generateTokens(user: User) {
    const token = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "30m",
    )

    const refreshToken = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "30d",
    )

    return {
      token,
      refreshToken,
      user
    }
  }
}
