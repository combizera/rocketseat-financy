import { CardCategory } from '@/components/ui/card-category'
import { CardWidget } from '@/components/ui/card-widget'
import { createFileRoute } from '@tanstack/react-router'
import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Badge, type BadgeColor } from '@/components/ui/badge'


const categories: {
  categoryName: string;
  itemsCount: number;
  totalAmount: number;
  color: BadgeColor;
}[] = [
    {
      categoryName: "Alimentação",
      itemsCount: 12,
      totalAmount: 1542.30,
      color: "blue",
    },
    {
      categoryName: "Transporte",
      itemsCount: 8,
      totalAmount: 385.50,
      color: "purple",
    },
    {
      categoryName: "Mercado",
      itemsCount: 3,
      totalAmount: 298.75,
      color: "orange",
    },
    {
      categoryName: "Entretenimento",
      itemsCount: 2,
      totalAmount: 186.20,
      color: "pink",
    },
    {
      categoryName: "Utilidades",
      itemsCount: 7,
      totalAmount: 245.80,
      color: "yellow",
    },
  ]


export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-[100%]">
      <section className="grid grid-cols-3 gap-6">
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

        <div className="bg-gray-300 col-span-2 rounded-lg">

        </div>

        <CardCategory
          title="Categorias"
          buttonText="Ver todas"
          buttonLink="/categories"
        >
          <Table>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.categoryName}>
                  <TableCell className="font-medium">
                    <Badge color={category.color}>
                      {category.categoryName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {category.itemsCount} items
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-800">
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
