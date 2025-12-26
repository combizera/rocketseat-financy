import { CardCategory } from '@/components/ui/card-category'
import { CardWidget } from '@/components/ui/card-widget'
import { createFileRoute } from '@tanstack/react-router'
import {
  CircleArrowDown,
  CircleArrowUp,
  Wallet,
  Utensils,
  Car,
  ShoppingCart,
  TrendingUp,
  Home,
  Gamepad,
  Heart,
  GraduationCap,
  type LucideIcon,
  Circle
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Badge, type BadgeColor } from '@/components/ui/badge'

type TransactionType = "income" | "expense";

interface Transaction {
  id: string;
  icon: LucideIcon;
  title: string;
  date: string;
  category: string;
  categoryColor: BadgeColor;
  amount: number;
  type: TransactionType;
}

const transactions: Transaction[] = [
  {
    id: "1",
    icon: Wallet,
    title: "Pagamento de Salário",
    date: "01/12/25",
    category: "Receita",
    categoryColor: "green",
    amount: 4250.00,
    type: "income",
  },
  {
    id: "2",
    icon: Utensils,
    title: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentação",
    categoryColor: "blue",
    amount: 89.50,
    type: "expense",
  },
  {
    id: "3",
    icon: Car,
    title: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    categoryColor: "purple",
    amount: 100.00,
    type: "expense",
  },
  {
    id: "4",
    icon: ShoppingCart,
    title: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    categoryColor: "orange",
    amount: 156.80,
    type: "expense",
  },
  {
    id: "5",
    icon: TrendingUp,
    title: "Retorno de Investimento",
    date: "26/11/25",
    category: "Investimento",
    categoryColor: "green",
    amount: 340.25,
    type: "income",
  },
  {
    id: "6",
    icon: Gamepad,
    title: "Assinatura Netflix",
    date: "25/11/25",
    category: "Entretenimento",
    categoryColor: "pink",
    amount: 55.90,
    type: "expense",
  },
  {
    id: "7",
    icon: Home,
    title: "Conta de Luz",
    date: "24/11/25",
    category: "Utilidades",
    categoryColor: "yellow",
    amount: 145.30,
    type: "expense",
  },
  {
    id: "8",
    icon: Heart,
    title: "Consulta Médica",
    date: "23/11/25",
    category: "Saúde",
    categoryColor: "green",
    amount: 280.00,
    type: "expense",
  },
  {
    id: "9",
    icon: Utensils,
    title: "Almoço Delivery",
    date: "22/11/25",
    category: "Alimentação",
    categoryColor: "blue",
    amount: 45.00,
    type: "expense",
  },
  {
    id: "10",
    icon: GraduationCap,
    title: "Curso Online",
    date: "21/11/25",
    category: "Educação",
    categoryColor: "blue",
    amount: 197.00,
    type: "expense",
  },
  {
    id: "11",
    icon: TrendingUp,
    title: "Freelance - Cliente X",
    date: "20/11/25",
    category: "Receita",
    categoryColor: "green",
    amount: 1500.00,
    type: "income",
  },
  {
    id: "12",
    icon: Car,
    title: "Uber para Reunião",
    date: "19/11/25",
    category: "Transporte",
    categoryColor: "purple",
    amount: 28.50,
    type: "expense",
  },
];


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

        <CardCategory
          title="Transações Recentes"
          buttonText="Ver todas"
          buttonLink="/transactions"
          className="col-span-2"
        >
          <Table>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="">
                  <TableCell className="flex items-center gap-2">
                    <transaction.icon
                      className="size-8 text-gray-500 p-2 rounded"
                    />
                    <div className="flex flex-col gap-1">
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

                  <TableCell className="text-right font-semibold flex items-center justify-end gap-1 text-gray-800 text-base">
                    {transaction.type === "income" ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
                    {transaction.type === "income" ? (
                      <CircleArrowUp
                        className="size-4 text-green-base ml-1"
                      />
                    ) : (
                      <CircleArrowDown
                        className="size-4 text-red-base ml-1"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardCategory>

        <CardCategory
          title="Categorias"
          buttonText="Gerenciar"
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
