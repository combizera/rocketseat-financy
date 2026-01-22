import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import type { Category } from "@/types/category"

type DeleteCategoryDialogProps = {
  category: Pick<Category, "id" | "name"> | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteCategoryDialog({
  category,
  open,
  onOpenChange,
}: DeleteCategoryDialogProps) {
  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
  })

  const handleDelete = async () => {
    if (!category) return

    try {
      await deleteCategory({
        variables: {
          categoryId: category.id,
        },
      })

      toast.success("Categoria deletada com sucesso!")
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao deletar categoria:", error)
      toast.error("Erro ao deletar categoria")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deletar categoria</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar a categoria{" "}
            <strong>{category?.name}</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deletando..." : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
