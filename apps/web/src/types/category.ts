import type { LucideIcon } from "lucide-react"
import type { BadgeColor } from "@/components/ui/badge"

export type Category = {
  id: string
  name: string
  description?: string
  color: BadgeColor
  icon?: LucideIcon
  itemsCount: number
  totalAmount?: number
}
