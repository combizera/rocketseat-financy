import { ArrowUpDown, Tag, Utensils } from "lucide-react";
import { CardWidget } from "../ui/card-widget";

export default function CategoryWidgets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      <CardWidget
        title="8"
        subtitle="Total de Categorias"
        icon={Tag}
        variant="compact"
      />

      <CardWidget
        title="27"
        subtitle="Total de Transações"
        icon={ArrowUpDown}
        iconClass="text-purple-base"
        variant="compact"
      />

      <CardWidget
        title="Alimentação"
        subtitle="Categoria Mais Utilizada"
        iconClass="text-blue-base"
        icon={Utensils}
        variant="compact"
      />
    </ div>
  )
}