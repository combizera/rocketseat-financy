import { useQuery } from "@apollo/client/react"
import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react"

import { LIST_TRANSACTION } from "@/lib/graphql/querys/Transaction"
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

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  if (loading) {
    return (
      <>
        <CardWidget
          title="Carregando..."
          subtitle="Saldo Total"
          icon={Wallet}
          iconClass="text-purple-base"
        />
        <CardWidget
          title="Carregando..."
          subtitle="Receita do Mês"
          icon={CircleArrowUp}
          iconClass="text-green-base"
        />
        <CardWidget
          title="Carregando..."
          subtitle="Despesa do Mês"
          icon={CircleArrowDown}
          iconClass="text-red-base"
        />
      </>
    )
  }

  if (error) {
    return (
      <>
        <CardWidget
          title="Erro"
          subtitle="Saldo Total"
          icon={Wallet}
          iconClass="text-purple-base"
        />
        <CardWidget
          title="Erro"
          subtitle="Receita do Mês"
          icon={CircleArrowUp}
          iconClass="text-green-base"
        />
        <CardWidget
          title="Erro"
          subtitle="Despesa do Mês"
          icon={CircleArrowDown}
          iconClass="text-red-base"
        />
      </>
    )
  }

  return (
    <>
      <CardWidget
        title={formatCurrency(balance)}
        subtitle="Saldo Total"
        icon={Wallet}
        iconClass="text-purple-base"
      />

      <CardWidget
        title={formatCurrency(totalIncome)}
        subtitle="Receita do Mês"
        icon={CircleArrowUp}
        iconClass="text-green-base"
      />

      <CardWidget
        title={formatCurrency(totalExpense)}
        subtitle="Despesa do Mês"
        icon={CircleArrowDown}
        iconClass="text-red-base"
      />
    </>
  )
}
