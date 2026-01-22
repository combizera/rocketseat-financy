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
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"
import { LIST_TRANSACTION } from "@/lib/graphql/querys/Transaction"
import type { Transaction } from "@/types/transaction"

type DeleteTransactionDialogProps = {
  transaction: Pick<Transaction, "id" | "description"> | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteTransactionDialog({
  transaction,
  open,
  onOpenChange,
}: DeleteTransactionDialogProps) {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{ query: LIST_TRANSACTION }],
  })

  const handleDelete = async () => {
    if (!transaction) return

    try {
      await deleteTransaction({
        variables: {
          transactionId: transaction.id,
        },
      })

      toast.success("Transação deletada com sucesso!")
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao deletar transação:", error)
      toast.error("Erro ao deletar transação")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deletar transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar a transação{" "}
            <strong>{transaction?.description || "sem descrição"}</strong>? Esta ação não pode ser desfeita.
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
