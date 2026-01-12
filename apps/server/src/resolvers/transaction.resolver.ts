import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql"
import { CreateTransactionInput } from "@/dtos/input/transaction.input"
import { GqlUser } from "@/graphql/decorator/user.decorator"
import { IsAuth } from "@/middlewares/auth.middleware"
import { TransactionModel } from "@/models/transaction.model"
import type { UserModel } from "@/models/user.model"
import { TransactionService } from "@/services/transaction.service"

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id)
  }
}
