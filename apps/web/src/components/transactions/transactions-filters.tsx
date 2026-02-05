import { useQuery } from "@apollo/client/react"
import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import type { TransactionFilters } from "@/routes/_authenticated/transactions"
import type { Category } from "@/types/category"

interface CategoriesData {
  listCategories: Category[]
}

interface TransactionsFiltersProps {
  filters: TransactionFilters
  onFilterChange: (key: keyof TransactionFilters, value: string) => void
}

export default function TransactionsFilters({
  filters,
  onFilterChange
}: TransactionsFiltersProps) {
  const { data } = useQuery<CategoriesData>(LIST_CATEGORIES)
  const categories = data?.listCategories || []

  return (
    <Card className="w-full grid grid-cols-4 gap-4 p-6">
      <div className="flex flex-col gap-2">
        <Label className="text-gray-500">Buscar</Label>
        <Input
          id="search"
          type="text"
          placeholder="Buscar por Descrição"
          icon={Search}
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-500">Tipo</Label>
        <Select
          key={`type-${filters.type}`}
          value={filters.type || "all"}
          onValueChange={(value) => onFilterChange("type", value || "all")}
        >
          <SelectTrigger className="w-full h-11.5!">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="INCOME">Entrada</SelectItem>
              <SelectItem value="EXPENSE">Saída</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-500">Categoria</Label>
        <Select
          key={`category-${filters.category}`}
          value={filters.category || "all"}
          onValueChange={(value) => onFilterChange("category", value || "all")}
        >
          <SelectTrigger className="w-full h-11.5!">
            <SelectValue placeholder="Selecione a Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categoria</SelectLabel>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-500">Período</Label>
        <Select
          key={`period-${filters.period}`}
          value={filters.period || "all"}
          onValueChange={(value) => onFilterChange("period", value || "all")}
        >
          <SelectTrigger className="w-full h-11.5!">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mês</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="0">Janeiro</SelectItem>
              <SelectItem value="1">Fevereiro</SelectItem>
              <SelectItem value="2">Março</SelectItem>
              <SelectItem value="3">Abril</SelectItem>
              <SelectItem value="4">Maio</SelectItem>
              <SelectItem value="5">Junho</SelectItem>
              <SelectItem value="6">Julho</SelectItem>
              <SelectItem value="7">Agosto</SelectItem>
              <SelectItem value="8">Setembro</SelectItem>
              <SelectItem value="9">Outubro</SelectItem>
              <SelectItem value="10">Novembro</SelectItem>
              <SelectItem value="11">Dezembro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
