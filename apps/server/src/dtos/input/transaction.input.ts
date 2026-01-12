import { Field, GraphQLISODateTime, InputType } from "type-graphql"

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  categoryId!: string

  @Field(() => Number)
  amount!: number

  @Field(() => String)
  type!: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String, { nullable: true })
  description?: string
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => Number, { nullable: true })
  amount?: number

  @Field(() => String, { nullable: true })
  type?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field(() => String, { nullable: true })
  description?: string
}
