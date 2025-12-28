import type { ElementType } from "react"
import { Card } from "./card"

interface CardWidgetProps {
  icon: ElementType
  iconClass?: string
  title: string
  subtitle: string
  variant?: "default" | "compact"
}

export function CardWidget({
  icon: Icon,
  iconClass,
  title,
  subtitle,
  variant = "default",
}: CardWidgetProps) {
  return (
    variant === "compact" ? (
      <Card className="flex flex-row gap-4 p-6 pb-4">
        <Icon className={`mt-1 size-[20px] ${iconClass}`} />
        <div className="flex flex-col gap-1">
          <h2 className="text-gray-800 leading-[100%] font-bold text-[28px]">{title}</h2>
          <p className="text-gray-500 uppercase">{subtitle}</p>
        </div>
      </Card>
    ) : (
      <Card className="flex flex-col gap-2 p-6 pb-4">
        <div className="flex gap-2 items-center">
          <Icon className={`size-[20px] ${iconClass}`} />
          <p className="text-gray-500 uppercase">{subtitle}</p>
        </div>
        <h2 className="text-gray-800 font-bold text-[28px]">{title}</h2>
      </Card>
    )
  )
}
