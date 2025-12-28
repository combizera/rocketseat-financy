import { SquarePen, Trash, Utensils } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card } from "./card"

export default function CardCategoryItem() {
  return (
    <Card className="p-4">
      {/* HEADER */}
      <div className="flex justify-between">
        <div className="bg-blue-light p-2 rounded">
          <Utensils className="size-4 text-blue-dark" />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Submit"
            className="py-3 px-3"
          >
            <Trash className="text-[#EF4444]" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Submit"
            className="py-3 px-3"
          >
            <SquarePen />
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-gray-800">Alimentação</h3>
        <p className="text-gray-600 font-sm">
          Restaurantes, delivery e refeições
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between">
        <Badge color="blue">
          Alimentação
        </Badge>

        <p className="text-sm text-gray-600">
          12 itens
        </p>
      </div>
    </Card>
  )
}
