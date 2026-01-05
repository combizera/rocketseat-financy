import { Field, InputType } from "type-graphql";

@InputType()
export class LoginOutput {
  @Field(() => String)
  userId!: string;
  
  @Field(() => String)
  token!: string;
  
  @Field(() => String)
  refreshToken!: string;
}

@InputType()
export class RegisterOutput {
  @Field(() => String)
  userId!: string;

  @Field(() => String)
  token!: string;

  @Field(() => String)
  refreshToken!: string;
}