import { Link, type LinkProps } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

interface CardCategoryProps {
  title?: string
  buttonText?: string
  buttonLink?: LinkProps["to"]
  children?: React.ReactNode
  className?: string
}

export function CardCategory({
  title,
  buttonText,
  buttonLink,
  children,
  className,
}: CardCategoryProps) {
  return (
    <Card className={cn(`flex flex-col gap-4 p-0`, className)}>
      {(title || buttonText) && (
        <div className="flex justify-between border-b py-4 px-6">
          {title && <p className="text-gray-500 uppercase mt-1">{title}</p>}
          {buttonText && buttonLink && (
            <Link
              to={buttonLink}
              className="flex items-center text-sm text-green-base hover:underline"
            >
              {buttonText}
              <ChevronRight className="size-5" />
            </Link>
          )}
        </div>
      )}
      <div className="pt-2 pb-1">
        {children}
      </div>
    </Card>
  )
}
