import { useQuery } from "@apollo/client/react"
import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react"

import { LIST_TRANSACTION } from "@/lib/graphql/querys/Transaction"
import { formatCurrency } from "@/lib/utils"
import type { Transaction } from "@/types/transaction"
import { CardWidget } from "../ui/card-widget"

interface TransactionsData {
  listTransactions: Transaction[]
}

export default function DashboardWidgets() {
  const { data, loading, error } = useQuery<TransactionsData>(LIST_TRANSACTION)

  const transactions = data?.listTransactions || []

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const widgets = [
    {
      title: loading ? "Carregando..." : error ? "Erro" : formatCurrency(balance),
      subtitle: "Saldo Total",
      icon: Wallet,
      iconClass: "text-purple-base",
    },
    {
      title: loading ? "Carregando..." : error ? "Erro" : formatCurrency(totalIncome),
      subtitle: "Receita do Mês",
      icon: CircleArrowUp,
      iconClass: "text-green-base",
    },
    {
      title: loading ? "Carregando..." : error ? "Erro" : formatCurrency(totalExpense),
      subtitle: "Despesa do Mês",
      icon: CircleArrowDown,
      iconClass: "text-red-base",
    },
  ]

  return (
    <>
      {widgets.map((widget, index) => (
        <CardWidget key={index} {...widget} />
      ))}
    </>
  )
}
