import type { LucideIcon } from "lucide-react"
import type { BadgeColor } from "@/components/ui/badge"

export type TransactionType = "income" | "expense"

export type Transaction = {
  id: string
  icon: LucideIcon
  title: string
  date: string
  category: string
  categoryColor: BadgeColor
  amount: number
  type: TransactionType
}
