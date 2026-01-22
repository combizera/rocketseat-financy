import type { LucideIcon } from "lucide-react"

export type Category = {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  transactionsCount?: number
  totalAmount?: number
}

export type CategoryWithIconComponent = Category & {
  iconComponent: LucideIcon
}
