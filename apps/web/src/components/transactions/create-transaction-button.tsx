import { Plus } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import CreateTransactionDialog from "./create-transaction-dialog"

export default function CreateTransactionButton() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        size="sm"
        className="px-4 text-sm font-semibold"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-5" />
        Nova Transação
      </Button>

      <CreateTransactionDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
