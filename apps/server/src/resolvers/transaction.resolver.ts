import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql"
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "@/dtos/input/transaction.input"
import { GqlUser } from "@/graphql/decorator/user.decorator"
import { IsAuth } from "@/middlewares/auth.middleware"
import { CategoryModel } from "@/models/category.model"
import { TransactionModel } from "@/models/transaction.model"
import { type UserModel } from "@/models/user.model"
import { CategoryService } from "@/services/category.service"
import { TransactionService } from "@/services/transaction.service"

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()
  private categoryService = new CategoryService()

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id)
  }

  @Query(() => [TransactionModel])
  async listTransactions(
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id)

    return true
  }

  @FieldResolver(() => CategoryModel, { nullable: true })
  async category(
    @Root() transaction: TransactionModel,
  ): Promise<CategoryModel | null> {
    return this.categoryService.getCategoryById(transaction.categoryId)
  }
}
