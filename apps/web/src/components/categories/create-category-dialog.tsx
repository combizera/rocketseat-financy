import { useMutation } from "@apollo/client/react"
import { useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { colorMap, colors } from "@/lib/constants/colors"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { categoryIconNames, categoryIcons } from "@/lib/icon-map"
import { cn } from "@/lib/utils"
import type { BadgeColor } from "@/types/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateCategoryDialog({
  open,
  onOpenChange,
}: CreateCategoryDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedIcon, setSelectedIcon] = useState(0)
  const [selectedColor, setSelectedColor] = useState<BadgeColor>("green")

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createCategory({
        variables: {
          data: {
            name,
            description: description || undefined,
            icon: categoryIconNames[selectedIcon],
            color: selectedColor,
          },
        },
      })

      toast.success("Categoria criada com sucesso!")
      onOpenChange(false)

      // Reset form
      setName("")
      setDescription("")
      setSelectedIcon(0)
      setSelectedColor("green")
    } catch (error) {
      console.error("Erro ao criar categoria:", error)
      toast.error("Erro ao criar categoria")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
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
                      selectedIcon === index && "border-green-base bg-green-light",
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
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
