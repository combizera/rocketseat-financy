import type { LucideIcon } from "lucide-react"
import type { BadgeColor } from "@/components/ui/badge"

export type CategoryAPI = {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  transactionsCount?: number
  totalAmount?: number
}

export type Category = {
  id: string
  name: string
  description?: string
  color: BadgeColor
  icon?: LucideIcon
  itemsCount: number
  totalAmount?: number
}
