import { useMutation, useQuery } from "@apollo/client/react"
import {
  ChevronDownIcon,
  CircleArrowDown,
  CircleArrowUp,
} from "lucide-react"
import React from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"
import { LIST_CATEGORIES } from "@/lib/graphql/querys/Category"
import { LIST_TRANSACTION } from "@/lib/graphql/querys/Transaction"
import { cn } from "@/lib/utils"
import type { Category } from "@/types/category"
import type { TransactionType } from "@/types/transaction"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface CategoriesData {
  listCategories: Category[]
}

interface CreateTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateTransactionDialog({
  open,
  onOpenChange,
}: CreateTransactionDialogProps) {
  const [tab, setTab] = React.useState<TransactionType>("expense")
  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [description, setDescription] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [categoryId, setCategoryId] = React.useState<string | undefined>(
    undefined,
  )

  const { data: categoriesData } = useQuery<CategoriesData>(LIST_CATEGORIES)
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: LIST_TRANSACTION }],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !categoryId || !amount) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const amountValue = parseFloat(amount)
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Valor inválido")
      return
    }

    try {
      await createTransaction({
        variables: {
          data: {
            description: description || undefined,
            amount: amountValue,
            date: date.toISOString(),
            categoryId: categoryId as string,
            type: tab.toUpperCase(),
          },
        },
      })

      toast.success("Transação criada com sucesso!")
      onOpenChange(false)

      // Reset form
      setDescription("")
      setAmount("")
      setCategoryId(undefined)
      setDate(undefined)
      setTab("expense")
    } catch (error) {
      console.error("Erro ao criar transação:", error)
      toast.error("Erro ao criar transação")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>
            Nova {tab === "expense" ? "Despesa" : "Receita"}
          </DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as TransactionType)}
          >
            <TabsList>
              <TabsTrigger value="expense">
                <CircleArrowDown
                  className={cn(
                    "transition-colors",
                    tab === "expense" ? "text-red-base" : "text-gray-500",
                  )}
                />
                Despesa
              </TabsTrigger>
              <TabsTrigger value="income">
                <CircleArrowUp
                  className={cn(
                    "transition-colors",
                    tab === "income" ? "text-green-base" : "text-gray-500",
                  )}
                />
                Receita
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label className="text-gray-700" htmlFor="description">
                Descrição
              </Label>
              <Input
                placeholder="Ex: Almoço no Restaurante"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-gray-700" htmlFor="date">
                  Data
                </Label>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between text-sm text-gray-600"
                      />
                    }
                  >
                    {date
                      ? date.toLocaleDateString("pt-BR")
                      : "Selecionar data"}
                    <ChevronDownIcon />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setPopoverOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  placeholder="0,00"
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-gray-700">Categoria</Label>
              <Select
                value={categoryId}
                onValueChange={(value) => setCategoryId(value || undefined)}
              >
                <SelectTrigger className="w-full h-11.5!">
                  <SelectValue placeholder="Selecione a Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categoria</SelectLabel>
                    {categoriesData?.listCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
