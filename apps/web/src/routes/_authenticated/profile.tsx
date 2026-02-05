import { useMutation } from "@apollo/client/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { LogOut, Mail, UserRound } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
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
import { UPDATE_USER } from "@/lib/graphql/mutations/User"
import { getInitials } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import type { User } from "@/types/user"

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
})

interface UpdateUserData {
  updateUser: User
}

function RouteComponent() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const updateUserStore = useAuthStore((state) => state.updateUser)
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || "")

  const [updateUser, { loading }] = useMutation<UpdateUserData>(UPDATE_USER)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Nome não pode estar vazio")
      return
    }

    try {
      const { data } = await updateUser({
        variables: {
          data: { name },
        },
      })

      if (data?.updateUser) {
        updateUserStore(data.updateUser)
        toast.success("Nome atualizado com sucesso!")
      }
    } catch (error) {
      console.error("Erro ao atualizar nome:", error)
      toast.error("Erro ao atualizar nome")
    }
  }

  const handleLogout = () => {
    logout()
    navigate({ to: "/" })
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center flex flex-col items-center mb-4">
          <Avatar className="size-16 mb-2">
            <AvatarFallback className="text-lg">
              {name ? getInitials(name) : "??"}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{name || "Usuário"}</CardTitle>
          <CardDescription>{user?.email || ""}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  icon={UserRound}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? "Salvando..." : "Salvar alterações"}
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
