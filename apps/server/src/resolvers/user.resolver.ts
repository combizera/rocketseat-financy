import { Arg, Mutation, Resolver } from "type-graphql"
import { RegisterInput } from "@/dtos/input/auth.input"
import { UserModel } from "@/models/user.model"
import { userService } from "@/services/user.service"

@Resolver(() => UserModel)
export class UserResolver {
  private userService = new userService()

  @Mutation(() => UserModel)
  async createUser(
    @Arg('data', () => RegisterInput) data: RegisterInput
  ): Promise<UserModel>  {
    return this.userService.createUser(data)
  }
}
