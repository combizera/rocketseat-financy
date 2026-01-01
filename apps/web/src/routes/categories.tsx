import { createFileRoute } from "@tanstack/react-router"
import CategoryCards from "@/components/categories/category-cards"
import CategoryWidgets from "@/components/categories/category-widgets"
import CreateCategoryButton from "@/components/categories/create-category-button"
import PageTitle from "@/components/ui/page-title"

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4 w-full">
      <section className="flex flex-col gap-8 items-start mb-8">
        {/* TITLE */}
        <PageTitle
          title="Categorias"
          description="Organize suas transações por categorias"
        >
          <CreateCategoryButton />
        </PageTitle>

        {/* WIDGETS */}
        <CategoryWidgets />

        {/* CARDS */}
        <CategoryCards />
      </section>
    </main>
  )
}
