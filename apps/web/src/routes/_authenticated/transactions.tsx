import { createFileRoute } from "@tanstack/react-router"
import CreateTransactionButton from "@/components/transactions/create-transaction-button"
import TransactionsFilters from "@/components/transactions/transactions-filters"
import TransactionsTable from "@/components/transactions/transactions-table"
import PageTitle from "@/components/ui/page-title"

export const Route = createFileRoute("/_authenticated/transactions")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-full">
      <section className="flex flex-col gap-6 items-start mb-8">
        {/* TITLE */}
        <PageTitle
          title="Transações"
          description="Gerencie todas as suas transações financeiras"
        >
          <CreateTransactionButton />
        </PageTitle>

        {/* FILTERS */}
        <TransactionsFilters />

        {/* TABLE */}
        <TransactionsTable />
      </section>
    </main>
  )
}
