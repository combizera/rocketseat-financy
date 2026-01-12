import prisma from "@financy/db"
import type { CreateTransactionInput, UpdateTransactionInput } from "@/dtos/input/transaction.input"

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

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    const transaction = await prisma.transaction.findUnique({
      where: { id }
    })

    if (!transaction) throw new Error("Transaction not found")

    // TODO: ver se o prisma não lida melhor com os undefined
    return prisma.transaction.update({
      where: { id }, 
      data: {
        ...(data.categoryId && {
          category: {
            connect: { id: data.categoryId }
          }
        }),
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.type && { type: data.type }),
        ...(data.date && { date: data.date }),
        ...(data.description !== undefined && { description: data.description }),
      }
    })
  }

  async deleteTransaction(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      }
    })

    if (!transaction) throw new Error("Transaction not found")

    return prisma.transaction.delete({
      where: {
        id,
      }
    })
  }
}
