import { createFileRoute } from '@tanstack/react-router'
import TransactionsCategories from '@/components/dashboard/dashboard-categories'
import TransactionsTable from '@/components/dashboard/dashboard-table'
import TransactionsWidgets from '@/components/dashboard/dashboard-widgets'

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
})

function Dashboard() {
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
