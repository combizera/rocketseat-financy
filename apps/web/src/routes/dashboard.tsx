import { CardCategory } from '@/components/ui/card-category'
import { CardWidget } from '@/components/ui/card-widget'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleArrowDown, CircleArrowUp, Wallet, Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { transactions } from "@/data/mock/transactions";
import { categories } from "@/data/mock/categories";

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-[100%]">
      <section className="grid grid-cols-3 gap-6 items-start mb-8">
        <CardWidget
          title="R$ 12.847,32"
          subtitle="Saldo Total"
          icon={Wallet}
          iconClass="text-purple-base"
        />


        <CardWidget
          title="R$ 4.250,00"
          subtitle="Receita do Mês"
          icon={CircleArrowUp}
          iconClass="text-green-base"
        />

        <CardWidget
          title="R$ 2.180,45"
          subtitle="Despesa do Mês"
          icon={CircleArrowDown}
          iconClass="text-red-base"
        />

        {/* TRANSAÇÕES */}
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

        {/* CATEGORIAS */}
        <CardCategory
          title="Categorias"
          buttonText="Gerenciar"
          buttonLink="/categories"
          className="pb-4"
        >
          <Table>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium pl-4">
                    <Badge color={category.color}>
                      {category.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {category.itemsCount} items
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-800 pr-4">
                    R$ {category.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardCategory>
      </section>
    </main>
  )
}
