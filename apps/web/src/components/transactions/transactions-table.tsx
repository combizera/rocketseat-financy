import {
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  SquarePen,
  Trash,
} from "lucide-react"

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
import { transactions } from "@/data/mock/transactions"

export default function TransactionsTable() {
  return (
    <CardCategory className="w-full rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left pl-4 max-w-[350px]">
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              {/* DESCRIÇÃO */}
              <TableCell className="flex items-center gap-2 pl-4">
                <div
                  className={`p-2 rounded bg-${transaction.categoryColor}-light`}
                >
                  <transaction.icon className="size-5" />
                </div>
                <p className="font-medium text-gray-800 text-[1rem]">
                  {transaction.title}
                </p>
              </TableCell>

              {/* DATA */}
              <TableCell>
                <p className="text-gray-600 text-sm">{transaction.date}</p>
              </TableCell>

              {/* CATEGORIA */}
              <TableCell className="text-center">
                <Badge color={transaction.categoryColor}>
                  {transaction.category}
                </Badge>
              </TableCell>

              {/* TIPO */}
              <TableCell>
                {transaction.type === "income" ? (
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
                    {transaction.type === "income" ? "+" : "-"} R${" "}
                    {transaction.amount.toFixed(2)}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right pr-4 flex items-center justify-end gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Submit"
                  className="py-3 px-3"
                >
                  <Trash className="text-[#EF4444]" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Submit"
                  className="py-3 px-3"
                >
                  <SquarePen />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md text-gray-700">
                    1 a 10 | 27 resultados
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

                  <Button
                    variant="outline"
                    size="icon"
                    className="py-3 px-3 text-md"
                  >
                    2
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="py-3 px-3 text-md"
                  >
                    3
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
  )
}
