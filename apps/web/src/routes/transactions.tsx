import { Badge } from '@/components/ui/badge'
import { CardCategory } from '@/components/ui/card-category'
import PageTitle from '@/components/ui/page-title'
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleArrowDown, CircleArrowUp, Plus } from 'lucide-react'
import { transactions } from "@/data/mock/transactions";

export const Route = createFileRoute('/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-[100%]">
      <section className="flex flex-col gap-6 items-start mb-8">
        {/* TITLE */}
        <PageTitle
          title="Transações"
          description="Gerencie todas as suas transações financeiras"
          buttonText="Nova Transação"
          buttonLink="/transactions"
        />

        {/* FILTERS */}
        <div className='bg-gray-200 rounded-md w-full h-20'>

        </div>

        {/* TABLE */}
        <CardCategory
          title="Transações Recentes"
          buttonText="Ver todas"
          buttonLink="/transactions"
          className="w-full"
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
      </section>
    </main>
  )
}
