import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="fon">
            Criar conta
          </CardTitle>
          <CardDescription>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    Senha
                  </Label>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
                <CardDescription className="text-gray-500 text-xs">
                  A senha deve ter no mínimo 8 caracteres
                </CardDescription>

              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Cadastrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">

          <div className="flex items-center gap-2 w-full">
            <Separator className="flex-1" />
            <CardDescription className="text-gray-500">
              ou
            </CardDescription>
            <Separator className="flex-1" />
          </div>

          <CardDescription>
            Já tem uma conta?
          </CardDescription>

          <Button variant="secondary" className="w-full" asChild>
            <Link to="/">
              Fazer Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
