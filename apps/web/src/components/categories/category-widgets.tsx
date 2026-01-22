import { useQuery } from "@apollo/client/react"
import { ArrowUpDown, Tag, Utensils } from "lucide-react"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { type CategoryAPI } from "@/types/category"
import { CardWidget } from "../ui/card-widget"

type ListCategoriesData = {
  listCategories: CategoryAPI[]
}

export default function CategoryWidgets() {
  const { data, loading, error } = useQuery<ListCategoriesData>(LIST_CATEGORIES)

  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <p className="text-gray-600">Carregando categorias...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <p className="text-red-600">
          Erro ao carregar categorias: {error.message}
        </p>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      <CardWidget
        title={data?.listCategories.length.toString() || "0"}
        subtitle="Total de Categorias"
        icon={Tag}
        variant="compact"
      />

      {/* TODO: implementar total de transações */}
      <CardWidget
        title="27"
        subtitle="Total de Transações"
        icon={ArrowUpDown}
        iconClass="text-purple-base"
        variant="compact"
      />

      {/* TODO: implementar categoria + usada */}
      <CardWidget
        title="Alimentação"
        subtitle="Categoria Mais Utilizada"
        iconClass="text-blue-base"
        icon={Utensils}
        variant="compact"
      />
    </section>
  )
}
