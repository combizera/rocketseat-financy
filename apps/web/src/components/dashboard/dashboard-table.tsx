import { Link } from "@tanstack/react-router";
import { CircleArrowDown, CircleArrowUp, Plus } from "lucide-react";

import { CardCategory } from "../ui/card-category";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { transactions } from "@/data/mock/transactions";

export default function TransactionsTable() {
  return (
    <CardCategory
      title="Transações Recentes"
      buttonText="Ver todas"
      buttonLink="/transactions"
      className="col-span-2"
    >
      <Table>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="flex items-center gap-2 pl-4">
                <div className={`p-2 rounded bg-${transaction.categoryColor}-light`}>
                  <transaction.icon className="size-5" />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800 text-[1rem]">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {transaction.date}
                  </p>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <Badge color={transaction.categoryColor}>
                  {transaction.category}
                </Badge>
              </TableCell>

              <TableCell className="text-right pr-4">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-semibold text-gray-800 text-base">
                    {transaction.type === "income" ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
                  </span>
                  {transaction.type === "income" ? (
                    <CircleArrowUp className="size-4 text-green-base" />
                  ) : (
                    <CircleArrowDown className="size-4 text-red-base" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center p-4">
              <Link
                to="/transactions"
                className="inline-flex items-center gap-1 text-sm text-green-base hover:underline"
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