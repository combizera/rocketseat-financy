import { useQuery } from "@apollo/client/react"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { getIconComponent } from "@/lib/icon-map"
import { type Category, type CategoryAPI } from "@/types/category"
import { type BadgeColor } from "../ui/badge"
import CardCategoryItem from "../ui/card-category-item"

type ListCategoriesData = {
  listCategories: CategoryAPI[]
}

export default function CategoryCards() {
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

  const categories: Category[] = (data?.listCategories || []).map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    color: category.color as BadgeColor,
    icon: getIconComponent(category.icon),
    itemsCount: category.transactionsCount || 0,
    totalAmount: category.totalAmount,
  }))

  if (categories.length === 0) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <p className="text-gray-600">
          Nenhuma categoria encontrada.
        </p>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      {categories.map((category) => (
        <CardCategoryItem
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description}
          color={category.color}
          itemsCount={category.itemsCount}
          icon={category.icon}
        />
      ))}
    </section>
  )
}