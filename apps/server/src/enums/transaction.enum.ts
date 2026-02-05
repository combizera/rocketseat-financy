import { registerEnumType } from "type-graphql"

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

registerEnumType(TransactionType, {
  name: "TransactionType",
  description: "Type of transaction",
  valuesConfig: {
    INCOME: {
      description: "Income transaction",
    },
    EXPENSE: {
      description: "Expense transaction",
    },
  },
})