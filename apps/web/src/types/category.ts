import type { BadgeColor } from "@/components/ui/badge"

export type Category = {
  id: string
  name: string
  itemsCount: number
  totalAmount: number
  color: BadgeColor
}
