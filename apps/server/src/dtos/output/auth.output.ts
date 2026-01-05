import { Field } from "type-graphql";

export class LoginOutput {
  @Field(() => String)
  userId!: string;

  @Field(() => String)
  token!: string;

  @Field(() => String)
  refreshToken!: string;
}

export class RegisterOutput {
  @Field(() => String)
  userId!: string;

  @Field(() => String)
  token!: string;

  @Field(() => String)
  refreshToken!: string;
}