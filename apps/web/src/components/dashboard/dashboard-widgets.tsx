import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react"

import { CardWidget } from "../ui/card-widget"

export default function DashboardWidgets() {
  return (
    <>
      <CardWidget
        title="R$ 12.847,32"
        subtitle="Saldo Total"
        icon={Wallet}
        iconClass="text-purple-base"
      />

      <CardWidget
        title="R$ 4.250,00"
        subtitle="Receita do Mês"
        icon={CircleArrowUp}
        iconClass="text-green-base"
      />

      <CardWidget
        title="R$ 2.180,45"
        subtitle="Despesa do Mês"
        icon={CircleArrowDown}
        iconClass="text-red-base"
      />
    </>
  )
}
