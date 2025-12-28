import { Badge } from '@/components/ui/badge'
import { CardCategory } from '@/components/ui/card-category'
import PageTitle from '@/components/ui/page-title'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpIcon, ChevronLeft, ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Search, SquarePen, Trash } from 'lucide-react'
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
import { Button } from '@/components/ui/button'

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
              <SelectTrigger className="w-full !h-[46px]">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Tipo
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
              <SelectTrigger className="w-full !h-[46px]">
                <SelectValue placeholder="Selecione a Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Categoria
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
              <SelectTrigger className="w-full !h-[46px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Mês
                  </SelectLabel>
                  <SelectItem value="jan">Janeiro</SelectItem>
                  <SelectItem value="fev">Fevereiro</SelectItem>
                  <SelectItem value="mar">Março</SelectItem>
                  <SelectItem value="abr">Abril</SelectItem>
                  <SelectItem value="mai">Maio</SelectItem>
                  <SelectItem value="jun">Junho</SelectItem>
                  <SelectItem value="jul">Julho</SelectItem>
                  <SelectItem value="ago">Agosto</SelectItem>
                  <SelectItem value="set">Setembro</SelectItem>
                  <SelectItem value="out">Outubro</SelectItem>
                  <SelectItem value="nov">Novembro</SelectItem>
                  <SelectItem value="dez">Dezembro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* TABLE */}
        <CardCategory
          className="w-full"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left pl-4 max-w-[350px]">
                  Descrição
                </TableHead>
                <TableHead>
                  Data
                </TableHead>
                <TableHead>
                  Categoria
                </TableHead>
                <TableHead>
                  Tipo
                </TableHead>
                <TableHead className="text-right">
                  Valor
                </TableHead>
                <TableHead className="pr-4 text-right">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  {/* DESCRIÇÃO */}
                  <TableCell className="flex items-center gap-2 pl-4">
                    <div className={`p-2 rounded bg-${transaction.categoryColor}-light`}>
                      <transaction.icon className="size-5" />
                    </div>
                    <p className="font-medium text-gray-800 text-[1rem]">
                      {transaction.title}
                    </p>
                  </TableCell>

                  {/* DATA */}
                  <TableCell>
                    <p className="text-gray-600 text-sm">
                      {transaction.date}
                    </p>
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
                        <p className="text-green-dark text-sm">
                          Entrada
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <CircleArrowDown className="size-4 text-red-dark" />
                        <p className="text-red-dark text-sm">
                          Saída
                        </p>
                      </div>
                    )}
                  </TableCell>

                  {/* VALOR */}
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-gray-800 text-sm">
                        {transaction.type === "income" ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
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
                        2
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="py-3 px-3"
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardCategory>
      </section>
    </main>
  )
}
