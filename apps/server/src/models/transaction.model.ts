import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { CategoryModel } from "./category.model"
import { UserModel } from "./user.model"

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  userId!: string

  @Field(() => UserModel)
  user!: UserModel

  @Field(() => String)
  categoryId!: string

  @Field(() => CategoryModel)
  category!: CategoryModel

  @Field(() => Number)
  amount!: number

  @Field(() => String)
  type!: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
