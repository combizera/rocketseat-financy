import { Arg, Mutation, Resolver } from "type-graphql"
import { LoginInput, RegisterInput } from "@/dtos/input/auth.input"
import { LoginOutput, RegisterOutput } from "@/dtos/output/auth.output"
import { AuthService } from "@/services/auth.service"

@Resolver()
export class AuthResolver {
  private authService = new AuthService()

  @Mutation(() => RegisterOutput)
  async register(
    @Arg("data", () => RegisterInput) data: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.authService.register(data)
  }

  @Mutation(() => LoginOutput)
  async login(
    @Arg("data", () => LoginInput) data: LoginInput
  ): Promise<LoginOutput> {
    return this.authService.login(data)
  }
}
