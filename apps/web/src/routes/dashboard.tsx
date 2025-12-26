import { Card } from '@/components/ui/card'
import { CardWidget } from '@/components/ui/card-widget'
import { createFileRoute } from '@tanstack/react-router'
import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-[100%]">
      <section className="grid grid-cols-3 gap-6">
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
      </section>
    </main>
  )
}
