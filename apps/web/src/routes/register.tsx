import { createFileRoute, Link } from "@tanstack/react-router"

import { Lock, LogIn, Mail, UserRound } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/register")({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signup = useAuthStore((state) => state.signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const signupMutate = await signup({
        name,
        email,
        password,
      })

      if (signupMutate) {
        toast.success("Conta criada com sucesso!")

        console.log("Signup mutation result:", signupMutate)
      }
    } catch (error: unknown) {
      toast.error("Erro ao realizar o cadastro")
      console.error("Signup error:", error)
      if (error && typeof error === "object" && "message" in error) {
        console.error((error as { message: string }).message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <img alt="Logo" className="w-33.5" src="/images/logo.svg" />

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  icon={UserRound}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  icon={Mail}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  icon={Lock}
                  required
                />
                <CardDescription className="text-gray-500 text-xs">
                  A senha deve ter no mínimo 8 caracteres
                </CardDescription>
              </div>
            </div>
            <Button disabled={loading} type="submit" className="w-full mt-4 text-base">
              Cadastrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="flex items-center gap-2 w-full">
            <Separator className="flex-1" />
            <CardDescription className="text-gray-500">ou</CardDescription>
            <Separator className="flex-1" />
          </div>

          <CardDescription>Já tem uma conta?</CardDescription>

          <Button variant="secondary" className="w-full" asChild>
            <Link to="/">
              <LogIn className="size-4.5 text-gray-400" />
              Fazer Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
