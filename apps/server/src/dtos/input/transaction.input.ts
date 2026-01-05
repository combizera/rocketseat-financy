import { Field, GraphQLISODateTime, InputType } from "type-graphql";

@InputType()
export class TransactionInput {
  @Field(() => String)
  type!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}