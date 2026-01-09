import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql"
import { CreateCategoryInput } from "@/dtos/input/category.input"
import { GqlUser } from "@/graphql/decorator/user.decorator"
import { IsAuth } from "@/middlewares/auth.middleware"
import { CategoryModel } from "@/models/category.model"
import { type UserModel } from "@/models/user.model"
import { CategoryService } from "@/services/category.service"

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id)
  }
}
