import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_guest")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()

    if (isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      })
    }
  },
  component: GuestLayout,
})

function GuestLayout() {
  return <Outlet />
}
