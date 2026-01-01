import {
  ChevronDownIcon,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
} from "lucide-react"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories } from "@/data/mock/categories"
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

export default function CreateTransactionButton() {
  // TODO: fazer lógica com useState p/ os tabs

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="px-4 text-sm font-semibold">
          <Plus className="size-5" />
          Nova Transação
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Despesa</DialogTitle>
          <DialogDescription>Receita</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="expense">
          <TabsList>
            <TabsTrigger value="expense">
              <CircleArrowDown className="text-red-base" />
              Despesa
            </TabsTrigger>
            <TabsTrigger value="income">
              <CircleArrowUp className="text-green-base" />
              Receita
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label className="text-gray-700" htmlFor="name-1">
              Descrição
            </Label>
            <Input
              placeholder="Ex: Almoço no Restaurante"
              id="name-1"
              name="name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="date">
                Data
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between text-sm text-gray-600"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
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
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">
                Valor
              </Label>
              <Input
                placeholder="Descrição da categoria"
                id="value"
                name="value"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-700">
              Categoria
            </Label>
            <Select>
              <SelectTrigger className="w-full h-11.5!">
                <SelectValue placeholder="Selecione a Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full text-[1rem]" size="xs" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
