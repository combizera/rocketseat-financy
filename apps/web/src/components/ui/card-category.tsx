import { Link } from "@tanstack/react-router";
import { Card } from "./card";
import { ChevronRight } from "lucide-react";

interface CardCategoryProps {
  title: string;
  buttonText: string;
  buttonLink: string;
  children?: React.ReactNode;
}

export function CardCategory({ title, buttonText, buttonLink, children }: CardCategoryProps) {
  return (
    <Card className="flex flex-col gap-4 p-0">
      <div className="flex justify-between border-b pb-2 pt-6 px-6">
        <p className="text-gray-500 uppercase mt-[.5px]">
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