export type TransactionType = "income" | "expense"

export type Transaction = {
  id: string
  amount: number
  type: "INCOME" | "EXPENSE"
  date: string
  description: string
  category: {
    id: string
    name: string
    color: string
    icon: string
  }
}
