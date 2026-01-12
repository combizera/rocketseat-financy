import { Field, GraphQLISODateTime, InputType } from "type-graphql"
import { TransactionType } from "@/enums/transaction.enum"

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  categoryId!: string

  @Field(() => Number)
  amount!: number

  @Field(() => TransactionType)
  type!: TransactionType

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

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field(() => String, { nullable: true })
  description?: string
}
