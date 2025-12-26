import { Wallet } from "lucide-react";
import { Card } from "./card";
import type { ElementType } from "react";

interface CardWidgetProps {
  icon: ElementType;
  iconClass?: string;
  title: string;
  subtitle: string;
}

export function CardWidget({ icon: Icon, iconClass, title, subtitle }: CardWidgetProps) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex gap-2 items-center">
        <Icon className={`size-[20px] ${iconClass}`} />
        <p className="text-gray-500 uppercase">
          {subtitle}
        </p>
      </div>
      <h2 className="text-gray-800 font-bold text-[28px]">
        {title}
      </h2>
    </Card>
  )
}