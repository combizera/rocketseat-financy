import {
  Book,
  Car,
  Coffee,
  Gift,
  HeartPulse,
  Home,
  type LucideIcon,
  PenTool,
  PiggyBank,
  Plane,
  ShoppingBag,
  Smartphone,
  Ticket,
  Utensils,
} from "lucide-react"

export const iconMap: Record<string, LucideIcon> = {
  Utensils,
  PenTool,
  Ticket,
  PiggyBank,
  HeartPulse,
  Home,
  Car,
  ShoppingBag,
  Smartphone,
  Plane,
  Book,
  Coffee,
  Gift,
}

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || PiggyBank
}
