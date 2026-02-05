import { Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import CreateCategoryDialog from "./create-category-dialog"

export default function CreateCategoryButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        size="sm"
        className="px-4 text-sm font-semibold"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-5" />
        Nova Categoria
      </Button>

      <CreateCategoryDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
