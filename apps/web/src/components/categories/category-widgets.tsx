import { useQuery } from "@apollo/client/react"
import { ArrowUpDown, Tag } from "lucide-react"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { LIST_TRANSACTION } from "@/lib/graphql/querys/Transaction"
import { getIconComponent } from "@/lib/icon-map"
import { type Category } from "@/types/category"
import { type Transaction } from "@/types/transaction"
import { CardWidget } from "../ui/card-widget"

type ListCategoriesData = {
  listCategories: Category[]
}

type ListTransactionsData = {
  listTransactions: Transaction[]
}

export default function CategoryWidgets() {
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } =
    useQuery<ListCategoriesData>(LIST_CATEGORIES)

  const { data: transactionsData } =
    useQuery<ListTransactionsData>(LIST_TRANSACTION)

  if (categoriesLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <p className="text-gray-600">Carregando categorias...</p>
      </section>
    )
  }

  if (categoriesError) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <p className="text-red-600">
          Erro ao carregar categorias: {categoriesError.message}
        </p>
      </section>
    )
  }

  const categories = categoriesData?.listCategories || []
  const transactions = transactionsData?.listTransactions || []

  // Encontrar a categoria mais usada
  const mostUsedCategory = categories.reduce((prev, current) => {
    const prevCount = prev.transactionsCount || 0
    const currentCount = current.transactionsCount || 0
    return currentCount > prevCount ? current : prev
  }, categories[0])

  const MostUsedIcon = mostUsedCategory
    ? getIconComponent(mostUsedCategory.icon)
    : Tag

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      <CardWidget
        title={categories.length.toString()}
        subtitle="Total de Categorias"
        icon={Tag}
        variant="compact"
      />

      <CardWidget
        title={transactions.length.toString()}
        subtitle="Total de Transações"
        icon={ArrowUpDown}
        iconClass="text-purple-base"
        variant="compact"
      />

      <CardWidget
        title={mostUsedCategory?.name || "N/A"}
        subtitle="Categoria Mais Utilizada"
        iconClass="text-blue-base"
        icon={MostUsedIcon}
        variant="compact"
      />
    </section>
  )
}
