import { Badge } from '@/components/ui/badge'
import { CardCategory } from '@/components/ui/card-category'
import PageTitle from '@/components/ui/page-title'
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleArrowDown, CircleArrowUp, Mail, Plus, Search } from 'lucide-react'
import { transactions } from "@/data/mock/transactions";
import { categories } from "@/data/mock/categories";
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
        <Card className="w-full grid grid-cols-4 gap-4 p-6">
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500">
              Buscar
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Buscar por Descrição"
              icon={Search}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-gray-500">
              Tipo
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Type
                  </SelectLabel>
                  <SelectItem value="income">
                    Income
                  </SelectItem>
                  <SelectItem value="expense">
                    Expense
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-gray-500">
              Categoria
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Category
                  </SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-gray-500">
              Período
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Mês
                  </SelectLabel>
                  <SelectItem value="janeiro">Janeiro</SelectItem>
                  <SelectItem value="fevereiro">Fevereiro</SelectItem>
                  <SelectItem value="marco">Março</SelectItem>
                  <SelectItem value="abril">Abril</SelectItem>
                  <SelectItem value="maio">Maio</SelectItem>
                  <SelectItem value="junho">Junho</SelectItem>
                  <SelectItem value="julho">Julho</SelectItem>
                  <SelectItem value="agosto">Agosto</SelectItem>
                  <SelectItem value="setembro">Setembro</SelectItem>
                  <SelectItem value="outubro">Outubro</SelectItem>
                  <SelectItem value="novembro">Novembro</SelectItem>
                  <SelectItem value="dezembro">Dezembro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Card>

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
