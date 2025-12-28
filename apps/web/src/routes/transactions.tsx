
import PageTitle from '@/components/ui/page-title'
import { createFileRoute } from '@tanstack/react-router'

import TransactionsFilters from '@/components/transactions/transactions-filters'
import TransactionsTable from '@/components/transactions/transactions-table'

export const Route = createFileRoute('/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-[100%]">
      <section className="flex flex-col gap-6 items-start mb-8">
        {/* TITLE */}
        <PageTitle
          title="Transações"
          description="Gerencie todas as suas transações financeiras"
          buttonText="Nova Transação"
          buttonLink="/transactions"
        />

        {/* FILTERS */}
        <TransactionsFilters />

        {/* TABLE */}
        <TransactionsTable />
      </section>
    </main>
  )
}
