import { useQuery } from "@apollo/client/react"
import { useState } from "react"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { getIconComponent } from "@/lib/icon-map"
import { type Category, type CategoryAPI } from "@/types/category"
import { type BadgeColor } from "../ui/badge"
import CardCategoryItem from "../ui/card-category-item"
import EditCategoryDialog from "./edit-category-dialog"

type ListCategoriesData = {
  listCategories: CategoryAPI[]
}

type CategoryWithIconName = Category & {
  iconName: string
}

export default function CategoryCards() {
  const [editingCategory, setEditingCategory] = useState<CategoryWithIconName | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

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

  const categories: CategoryWithIconName[] = (data?.listCategories || []).map((category) => {
    const IconComponent = getIconComponent(category.icon)
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color as BadgeColor,
      icon: IconComponent,
      iconName: category.icon,
      itemsCount: category.transactionsCount || 0,
      totalAmount: category.totalAmount,
    }
  })

  const handleEdit = (id: string) => {
    const categoryToEdit = categories.find((cat) => cat.id === id)
    if (categoryToEdit) {
      setEditingCategory(categoryToEdit)
      setIsEditDialogOpen(true)
    }
  }

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
    <>
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
            onEdit={handleEdit}
          />
        ))}
      </section>

      <EditCategoryDialog
        category={editingCategory}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  )
}