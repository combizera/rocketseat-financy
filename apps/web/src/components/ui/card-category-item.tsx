import { SquarePen, Trash } from "lucide-react"
import type { Category } from "@/types/category"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card } from "./card"

type CardCategoryItemProps = Category & {
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function CardCategoryItem({
  id,
  name,
  description,
  color,
  icon: Icon,
  itemsCount,
  onEdit,
  onDelete,
}: CardCategoryItemProps) {
  return (
    <Card className="p-4 flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex justify-between">
        {Icon && (
          <div className={`p-2 rounded bg-${color}-light`}>
            <Icon className={`size-4 text-${color}-dark`} />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete?.(id)}
            className="py-3 px-3"
          >
            <Trash className="text-red-base" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit?.(id)}
            className="py-3 px-3"
          >

            <SquarePen />
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-800">
          {name}
        </h3>
        {description && <p className="text-sm text-gray-600">
          {description}
        </p>}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        <Badge color={color}>
          {name}
        </Badge>
        <p className="text-sm text-gray-600">
          {itemsCount} {itemsCount === 1 ? "item" : "itens"}
        </p>
      </div>
    </Card>
  )
}
