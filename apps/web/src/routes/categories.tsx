import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/categories"!</div>
}
