import { useMutation } from "@apollo/client/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { UPDATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { cn } from "@/lib/utils"
import type { Category } from "@/types/category"
import type { BadgeColor } from "@/types/badge"
import { colors, colorMap } from "@/lib/constants/colors"
import {
  categoryIcons,
  categoryIconNames,
} from "@/lib/icon-map"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type CategoryWithIconName = Category & {
  iconName: string
}

type EditCategoryDialogProps = {
  category: CategoryWithIconName | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditCategoryDialog({
  category,
  open,
  onOpenChange,
}: EditCategoryDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedIcon, setSelectedIcon] = useState(0)
  const [selectedColor, setSelectedColor] = useState<BadgeColor>("green")

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
  })

  useEffect(() => {
    if (category) {
      setName(category.name)
      setDescription(category.description || "")
      setSelectedColor(category.color)

      // Encontrar o índice do ícone baseado no nome armazenado
      const iconIndex = categoryIconNames.findIndex(
        (iconName) => iconName === category.iconName,
      )
      setSelectedIcon(iconIndex !== -1 ? iconIndex : 0)
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!category) return

    try {
      await updateCategory({
        variables: {
          categoryId: category.id,
          data: {
            name,
            description: description || undefined,
            icon: categoryIconNames[selectedIcon],
            color: selectedColor,
          },
        },
      })

      toast.success("Categoria atualizada com sucesso!")
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      toast.error("Erro ao atualizar categoria")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>
            Atualize as informações da categoria
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Título</Label>
              <Input
                placeholder="Ex: Alimentação"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Input
                placeholder="Descrição da categoria"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid">
              <Label>Ícone</Label>
              <div className="flex gap-2 flex-wrap justify-between mt-2">
                {categoryIcons.map((Icon, index) => (
                  <label
                    key={index}
                    className={cn(
                      "p-2 rounded border border-gray-300 cursor-pointer hover:border-green-base",
                      selectedIcon === index &&
                      "border-green-base bg-green-light",
                    )}
                  >
                    <input
                      type="radio"
                      name="icon"
                      value={index}
                      checked={selectedIcon === index}
                      onChange={() => setSelectedIcon(index)}
                      className="sr-only"
                    />
                    <Icon className="size-5 text-gray-500" />
                  </label>
                ))}
              </div>
            </div>

            <div className="grid">
              <Label>Cor</Label>
              <div className="flex gap-2 mt-2">
                {colors.map((color) => (
                  <label
                    key={color}
                    className={cn(
                      "w-12 h-6 p-1 rounded border-2 cursor-pointer",
                      selectedColor === color
                        ? "border-gray-500"
                        : "border-gray-300",
                    )}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="sr-only"
                    />
                    <div
                      className={cn("w-full h-full rounded", colorMap[color])}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              className="w-full text-[1rem]"
              size="xs"
              type="submit"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
