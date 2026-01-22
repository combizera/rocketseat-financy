import { useQuery } from "@apollo/client/react"
import {
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  SquarePen,
  Trash,
} from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardCategory } from "@/components/ui/card-category"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LIST_TRANSACTION } from "@/lib/graphql/querys/Transaction"
import { getIconComponent } from "@/lib/icon-map"
import type { BadgeColor } from "@/types/badge"
import type { Transaction } from "@/types/transaction"
import DeleteTransactionDialog from "./delete-transaction-dialog"
import EditTransactionDialog from "./edit-transaction-dialog"

interface TransactionsData {
  listTransactions: Transaction[]
}

export default function TransactionsTable() {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletingTransaction, setDeletingTransaction] = useState<Pick<Transaction, "id" | "description"> | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { data, loading, error } = useQuery<TransactionsData>(LIST_TRANSACTION)

  const handleEdit = (id: string) => {
    const transactionToEdit = data?.listTransactions.find((t) => t.id === id)
    if (transactionToEdit) {
      setEditingTransaction(transactionToEdit)
      setIsEditDialogOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    const transactionToDelete = data?.listTransactions.find((t) => t.id === id)
    if (transactionToDelete) {
      setDeletingTransaction({
        id: transactionToDelete.id,
        description: transactionToDelete.description,
      })
      setIsDeleteDialogOpen(true)
    }
  }

  if (loading) {
    return (
      <CardCategory className="w-full rounded-md p-8">
        <p className="text-center text-gray-600">Carregando transações...</p>
      </CardCategory>
    )
  }

  if (error) {
    return (
      <CardCategory className="w-full rounded-md p-8">
        <p className="text-center text-red-600">
          Erro ao carregar transações: {error.message}
        </p>
      </CardCategory>
    )
  }

  const transactions = data?.listTransactions || []

  if (transactions.length === 0) {
    return (
      <CardCategory className="w-full rounded-md p-8">
        <p className="text-center text-gray-600">
          Nenhuma transação encontrada
        </p>
      </CardCategory>
    )
  }

  return (
    <>
      <CardCategory className="w-full rounded-md">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left pl-4 max-w-87">
              Descrição
            </TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="pr-4 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const Icon = getIconComponent(transaction.category.icon)
            const formattedDate = new Date(transaction.date).toLocaleDateString(
              "pt-BR",
            )

            return (
              <TableRow key={transaction.id}>
                {/* DESCRIÇÃO */}
                <TableCell className="flex items-center gap-2 pl-4">
                  <div
                    className={`p-2 rounded bg-${transaction.category.color}-light`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <p className="font-medium text-gray-800 text-[1rem]">
                    {transaction.description || "Sem descrição"}
                  </p>
                </TableCell>

                {/* DATA */}
                <TableCell>
                  <p className="text-gray-600 text-sm">{formattedDate}</p>
                </TableCell>

                {/* CATEGORIA */}
                <TableCell className="text-center">
                  <Badge color={transaction.category.color as BadgeColor}>
                    {transaction.category.name}
                  </Badge>
                </TableCell>

                {/* TIPO */}
                <TableCell>
                  {transaction.type === "INCOME" ? (
                    <div className="flex items-center justify-center gap-1">
                      <CircleArrowUp className="size-4 text-green-dark" />
                      <p className="text-green-dark text-sm">Entrada</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <CircleArrowDown className="size-4 text-red-dark" />
                      <p className="text-red-dark text-sm">Saída</p>
                    </div>
                  )}
                </TableCell>

                {/* VALOR */}
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-semibold text-gray-800 text-sm">
                      {transaction.type === "INCOME" ? "+" : "-"} R${" "}
                      {transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right pr-4 flex items-center justify-end gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Deletar transação"
                    className="py-3 px-3"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash className="text-[#EF4444]" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Editar transação"
                    className="py-3 px-3"
                    onClick={() => handleEdit(transaction.id)}
                  >
                    <SquarePen />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md text-gray-700">
                    1 a {transactions.length} | {transactions.length}{" "}
                    {transactions.length === 1 ? "resultado" : "resultados"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="py-3 px-3"
                    disabled
                  >
                    <ChevronLeft />
                  </Button>

                  <Button
                    variant="default"
                    size="icon"
                    className="py-3 px-3 text-md"
                  >
                    1
                  </Button>

                  <Button variant="outline" size="icon" className="py-3 px-3">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </CardCategory>

    <EditTransactionDialog
      transaction={editingTransaction}
      open={isEditDialogOpen}
      onOpenChange={setIsEditDialogOpen}
    />

    <DeleteTransactionDialog
      transaction={deletingTransaction}
      open={isDeleteDialogOpen}
      onOpenChange={setIsDeleteDialogOpen}
    />
  </>
  )
}
