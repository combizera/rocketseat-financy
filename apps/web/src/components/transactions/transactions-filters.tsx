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
import type { Category } from "@/types/category"

interface CategoriesData {
  listCategories: Category[]
}

interface TransactionsFiltersProps {
  searchFilter: string
  onSearchChange: (value: string) => void
}

export default function TransactionsFilters({
  searchFilter,
  onSearchChange
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
          value={searchFilter}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-500">Tipo</Label>
        <Select>
          <SelectTrigger className="w-full h-11.5!">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-500">Categoria</Label>
        <Select>
          <SelectTrigger className="w-full h-11.5!">
            <SelectValue placeholder="Selecione a Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categoria</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-500">Período</Label>
        <Select>
          <SelectTrigger className="w-full h-11.5!">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mês</SelectLabel>
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
  )
}
