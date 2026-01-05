import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;
  
  @Field(() => String)
  icon!: string;

  @Field(() => String)
  color!: string;
}