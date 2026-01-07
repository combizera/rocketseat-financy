import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { RegisterInput } from "@/dtos/input/auth.input"
import { UserModel } from "@/models/user.model"
import { UserService } from "@/services/user.service"

@Resolver(() => UserModel)
export class UserResolver {
  private userService = new UserService()
  
  @Query(() => UserModel)
  async getUser(
    @Arg('id', () => String) id: string
  ): Promise<UserModel> {
    return this.userService.findUser(id)
  }

  @Mutation(() => UserModel)
  async createUser(
    @Arg('data', () => RegisterInput) data: RegisterInput
  ): Promise<UserModel>  {
    return this.userService.createUser(data)
  }
}