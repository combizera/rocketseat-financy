import { useQuery } from "@apollo/client/react"
import { Link } from "@tanstack/react-router"
import { CircleArrowDown, CircleArrowUp, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { LIST_TRANSACTION } from "@/lib/graphql/querys/Transaction"
import { getIconComponent } from "@/lib/icon-map"
import { type BadgeColor } from "@/types/badge"
import { type Transaction } from "@/types/transaction"
import { CardCategory } from "../ui/card-category"

interface TransactionsData {
  listTransactions: Transaction[]
}

export default function DashboardTable() {
  const { data, loading } = useQuery<TransactionsData>(LIST_TRANSACTION)

  const recentTransactions = data?.listTransactions.slice(0, 5) || []

  return (
    <CardCategory
      title="Transações Recentes"
      buttonText="Ver todas"
      buttonLink="/transactions"
      className="col-span-2"
    >
      <Table>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8">
                <p className="text-gray-600">Carregando...</p>
              </TableCell>
            </TableRow>
          ) : recentTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8">
                <p className="text-gray-600">Nenhuma transação encontrada</p>
              </TableCell>
            </TableRow>
          ) : (
            recentTransactions.map((transaction) => {
              const Icon = getIconComponent(transaction.category.icon)
              const formattedDate = new Date(
                transaction.date,
              ).toLocaleDateString("pt-BR")

              return (
                <TableRow key={transaction.id}>
                  <TableCell className="flex items-center gap-2 pl-4">
                    <div
                      className={`p-2 rounded bg-${transaction.category.color}-light`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-800 text-[1rem]">
                        {transaction.description || "Sem descrição"}
                      </p>
                      <p className="text-xs text-gray-400">{formattedDate}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Badge color={transaction.category.color as BadgeColor}>
                      {transaction.category.name}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-gray-800 text-base">
                        {transaction.type === "INCOME" ? "+" : "-"} R${" "}
                        {transaction.amount.toFixed(2)}
                      </span>
                      {transaction.type === "INCOME" ? (
                        <CircleArrowUp className="size-4 text-green-base" />
                      ) : (
                        <CircleArrowDown className="size-4 text-red-base" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              <Link
                to="/transactions"
                className="p-4 w-full text-center flex items-center justify-center gap-1 text-sm text-green-base hover:underline"
              >
                <Plus className="size-5" />
                Nova Transação
              </Link>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </CardCategory>
  )
}
