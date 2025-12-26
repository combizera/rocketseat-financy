import { Link, type LinkProps } from "@tanstack/react-router";
import { Card } from "./card";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardCategoryProps {
  title: string;
  buttonText: string;
  buttonLink: LinkProps["to"];
  children?: React.ReactNode;
  className?: string;
}

export function CardCategory({ title, buttonText, buttonLink, children, className }: CardCategoryProps) {
  return (
    <Card className={cn(`flex flex-col gap-4 p-0`, className)}>
      <div className="flex justify-between border-b pb-4 pt-6 px-6">
        <p className="text-gray-500 uppercase mt-1">
          {title}
        </p>
        <Link
          to={buttonLink}
          className="flex items-center text-sm text-green-base hover:underline"
        >
          {buttonText}
          <ChevronRight className="size-5" />
        </Link>
      </div>
      <div className="px-4 pb-6">
        {children}
      </div>
    </Card>
  )
}