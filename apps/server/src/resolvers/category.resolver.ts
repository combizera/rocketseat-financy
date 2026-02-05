import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql"
import { CreateCategoryInput, UpdateCategoryInput } from "@/dtos/input/category.input"
import { GqlUser } from "@/graphql/decorator/user.decorator"
import { IsAuth } from "@/middlewares/auth.middleware"
import { CategoryModel } from "@/models/category.model"
import { type UserModel } from "@/models/user.model"
import { CategoryService } from "@/services/category.service"
import { TransactionService } from "@/services/transaction.service"

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService()
  private transactionService = new TransactionService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id)
  }

  @Query(() => [CategoryModel])
  async listCategories(
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel[]> {
    return this.categoryService.listCategories(user.id)
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('id', () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id)
    
    return true
  }

  @FieldResolver(() => Number)
  async transactionsCount(
    @Root() category: CategoryModel
  ): Promise<number> {
    const transactions = await this.transactionService.countTransactionsByCategory(category.id)
    return transactions
  }

  @FieldResolver(() => Number)
  async totalAmount(
    @Root() category: CategoryModel
  ): Promise<number> {
    const total = await this.transactionService.sumTransactionAmountByCategory(category.id)
    return total
  }
}
