import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field(() => String)
  name!: string;
}