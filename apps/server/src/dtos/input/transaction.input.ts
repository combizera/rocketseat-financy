import { Field, GraphQLISODateTime, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {
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

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date;

  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}