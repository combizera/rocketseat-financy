import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { LogOut, Mail, UserRound } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: "/" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center flex flex-col items-center mb-4">
          <Avatar className="size-16 mb-2">
            <AvatarFallback className="text-lg">
              {user?.name ? getInitials(user.name) : "??"}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{user?.name || "Usuário"}</CardTitle>
          <CardDescription>{user?.email || ""}</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  icon={UserRound}
                  value={user?.name || ""}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  icon={Mail}
                  value={user?.email || ""}
                  disabled
                />
                <CardDescription className="text-gray-400">
                  E-mail não pode ser alterado.
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full mt-4">
                Salvar alterações
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleLogout}
                type="button"
              >
                <LogOut className="size-4.5 text-red-base" />
                Sair da conta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
