import { categories } from "@/data/mock/categories"
import { Badge } from "../ui/badge"
import { CardCategory } from "../ui/card-category"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

export default function DashboardCategories() {
  return (
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
                <Badge color={category.color}>{category.name}</Badge>
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
  )
}
