import prisma from "@financy/db"
import type { RegisterInput } from "@/dtos/input/auth.input"

export class userService {
  async createUser(data: RegisterInput) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (findUser) throw new Error("User already exists")

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
  }
}
