import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel)
  user!: UserModel;

  @Field(() => String)
  name!: string;
  
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}