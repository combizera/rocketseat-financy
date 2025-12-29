import { CircleArrowDown, CircleArrowUp, Plus } from "lucide-react"
import { useState } from "react"
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
import { Input } from "../ui/input"
import { Label } from "../ui/label"
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
              <Label className="text-gray-700" htmlFor="description-1">
                Data
              </Label>
              {/* // TODO: colocar datepicker */}
              <Input
                placeholder="Descrição da categoria"
                id="description-1"
                name="description"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description-1">Valor</Label>
              {/* // TODO: colocar datepicker */}
              <Input
                placeholder="Descrição da categoria"
                id="description-1"
                name="description"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-700">Categoria</Label>
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
