import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { TransactionType } from "@/enums/transaction.enum"
import { CategoryModel } from "./category.model"
import { UserModel } from "./user.model"

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => String)
  categoryId!: string

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel

  @Field(() => Number)
  amount!: number

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
