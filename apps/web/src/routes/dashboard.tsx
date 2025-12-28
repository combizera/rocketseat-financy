import { createFileRoute } from '@tanstack/react-router'

import TransactionsTable from '@/components/dashboard/dashboard-table'
import TransactionsWidgets from '@/components/dashboard/dashboard-widgets'
import TransactionsCategories from '@/components/dashboard/dashboard-categories'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-[100%]">
      <section className="grid grid-cols-3 gap-6 items-start mb-8">
        {/* WIDGETS */}
        <TransactionsWidgets />

        {/* TABELA */}
        <TransactionsTable />

        {/* CATEGORIAS */}
        <TransactionsCategories />
      </section>
    </main>
  )
}
