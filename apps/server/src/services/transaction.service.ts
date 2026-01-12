import prisma from "@financy/db"
import type { CreateTransactionInput } from "@/dtos/input/transaction.input"

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    return prisma.transaction.create({
      data: {
        userId: userId,
        categoryId: data.categoryId,
        amount: data.amount,
        type: data.type,
        date: data.date,
        description: data?.description,
      }
    })
  }

  async listTransactions(userId: string) {
    return prisma.transaction.findMany({
      where: {
        userId: userId,
      }
    })
  }
}
