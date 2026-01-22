import { useQuery } from "@apollo/client/react"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { getIconComponent } from "@/lib/icon-map"
import type { Category } from "@/types/category"
import type { BadgeColor } from "../ui/badge"
import CardCategoryItem from "../ui/card-category-item"
import DeleteCategoryDialog from "./delete-category-dialog"
import EditCategoryDialog from "./edit-category-dialog"

type ListCategoriesData = {
  listCategories: Category[]
}

type CategoryWithIconName = Category & {
  iconComponent: LucideIcon
}

export default function CategoryCards() {
  const [editingCategory, setEditingCategory] = useState<CategoryWithIconName | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<Pick<Category, "id" | "name"> | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
      ...category,
      iconComponent: IconComponent,
    }
  })

  const handleEdit = (id: string) => {
    const categoryToEdit = categories.find((cat) => cat.id === id)
    if (categoryToEdit) {
      setEditingCategory(categoryToEdit)
      setIsEditDialogOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    const categoryToDelete = categories.find((category) => category.id === id)
    if (categoryToDelete) {
      setDeletingCategory({
        id: categoryToDelete.id,
        name: categoryToDelete.name,
      })
      setIsDeleteDialogOpen(true)
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
            color={category.color as BadgeColor}
            itemsCount={category.transactionsCount || 0}
            icon={category.iconComponent}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </section>

      <EditCategoryDialog
        category={editingCategory}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteCategoryDialog
        category={deletingCategory}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  )
}