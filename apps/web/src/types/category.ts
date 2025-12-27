import type { BadgeColor } from "@/components/ui/badge";

export type Category = {
  categoryName: string;
  itemsCount: number;
  totalAmount: number;
  color: BadgeColor;
}