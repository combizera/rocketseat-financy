import type { BadgeColor } from "@/types/badge"

export const colors: BadgeColor[] = [
  "green",
  "blue",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
]

export const colorMap: Record<BadgeColor, string> = {
  green: "bg-green-base",
  blue: "bg-blue-base",
  purple: "bg-purple-base",
  pink: "bg-pink-base",
  red: "bg-red-base",
  orange: "bg-orange-base",
  yellow: "bg-yellow-base",
}
