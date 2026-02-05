import { useQuery } from "@apollo/client/react"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { formatCurrency } from "@/lib/utils"
import { type Category } from "@/types/category"
import { Badge, type BadgeColor } from "../ui/badge"
import { CardCategory } from "../ui/card-category"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

interface CategoriesData {
  listCategories: Category[]
}

export default function DashboardCategories() {
  const { data, loading } = useQuery<CategoriesData>(LIST_CATEGORIES)

  const categories = data?.listCategories.slice(0, 5) || []

  return (
    <CardCategory
      title="Categorias"
      buttonText="Gerenciar"
      buttonLink="/categories"
      className="pb-4"
    >
      <Table>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                <p className="text-gray-600">Carregando...</p>
              </TableCell>
            </TableRow>
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                <p className="text-gray-600">Nenhuma categoria encontrada</p>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium pl-4">
                  <Badge color={category.color as BadgeColor}>
                    {category.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {category.transactionsCount || 0} transações
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-800 pr-4">
                  {formatCurrency(category.totalAmount || 0)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </CardCategory>
  )
}
