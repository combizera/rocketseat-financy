import {
  Book,
  Boxes,
  BriefcaseBusiness,
  Candy,
  Car,
  Gamepad,
  Gift,
  Heart,
  Home,
  Plus,
  Receipt,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Ticket,
  Users,
  Utensils,
} from "lucide-react"
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
import { cn } from "@/lib/utils"
import type { BadgeColor } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const icons = [
  BriefcaseBusiness,
  ShoppingCart,
  Car,
  Utensils,
  Home,
  Heart,
  Gift,
  Candy,
  Book,
  ShoppingBag,
  Receipt,
  Boxes,
  Users,
  Gamepad,
  Ticket,
  Shirt,
]

const colors: BadgeColor[] = [
  "green",
  "blue",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
]

const colorMap: Record<BadgeColor, string> = {
  green: "bg-green-base",
  blue: "bg-blue-base",
  purple: "bg-purple-base",
  pink: "bg-pink-base",
  red: "bg-red-base",
  orange: "bg-orange-base",
  yellow: "bg-yellow-base",
}

export default function CreateCategoryButton() {
  const [selectedIcon, setSelectedIcon] = useState(0)
  const [selectedColor, setSelectedColor] = useState<BadgeColor>("green")

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="px-4 text-sm font-semibold">
          <Plus className="size-5" />
          Nova Categoria
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Título</Label>
            <Input placeholder="Ex: Alimentação" id="name-1" name="name" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description-1">Descrição</Label>
            <Input
              placeholder="Descrição da categoria"
              id="description-1"
              name="description"
            />
          </div>

          <div className="grid">
            <Label>Ícone</Label>
            <div className="flex gap-2 flex-wrap justify-between mt-2">
              {icons.map((Icon, index) => (
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
            <Label>
              Cor
            </Label>
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

        <DialogFooter>
          <Button className="w-full text-[1rem]" size="xs" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
