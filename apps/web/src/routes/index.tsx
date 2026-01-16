import { createFileRoute, Link } from "@tanstack/react-router"
import { Lock, Mail, UserRoundPlus } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/")({
  component: LoginComponent,
})

function LoginComponent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const loginMutate = await login({
        email,
        password,
      })

      if (!loginMutate) {
        alert("Invalid email or password.")
      }
    } catch (error: unknown) {
      toast.error("Error logging in")
      console.error("Login error:", error)
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
          <CardTitle>Fazer login</CardTitle>
          <CardDescription>Entre na sua conta para continuar</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 my-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Lembrar-me</Label>
                  </div>
                  <a
                    href="#"
                    className="ml-auto font-bold text-brand-base inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Recuperar senha
                  </a>
                </div>
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full mt-4 text-base"
            >
              Entrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="flex items-center gap-2 w-full">
            <Separator className="flex-1" />
            <CardDescription className="text-gray-500">ou</CardDescription>
            <Separator className="flex-1" />
          </div>

          <CardDescription>Ainda não tem uma conta?</CardDescription>

          <Button variant="secondary" className="w-full" asChild>
            <Link to="/register" className="text-gray-500">
              <UserRoundPlus className="size-4.5 text-gray-400" />
              Criar conta
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
