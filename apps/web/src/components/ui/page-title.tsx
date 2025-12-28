import { Link, type LinkProps } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { Button } from "./button"

interface PageTitleProps {
  title: string
  description?: string
  buttonText: string
  buttonLink: LinkProps["to"]
}

export default function PageTitle({
  title,
  description,
  buttonText,
  buttonLink,
}: PageTitleProps) {
  return (
    <div className="flex gap-4 justify-between w-full items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>

      <Button asChild size="sm" className="px-4 text-sm font-semibold">
        <div className="flex">
          <Plus className="size-5" />
          <Link to={buttonLink}>{buttonText}</Link>
        </div>
      </Button>
    </div>
  )
}
