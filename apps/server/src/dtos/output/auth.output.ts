import { Field, ObjectType } from "type-graphql"
import { UserModel } from "@/models/user.model"

@ObjectType()
export class LoginOutput {
  @Field(() => UserModel)
  user!: UserModel

  @Field(() => String)
  token!: string

  @Field(() => String)
  refreshToken!: string
}

@ObjectType()
export class RegisterOutput {
  @Field(() => UserModel)
  user!: UserModel

  @Field(() => String)
  token!: string

  @Field(() => String)
  refreshToken!: string
}
