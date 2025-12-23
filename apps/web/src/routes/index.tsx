import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/")({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="fon">
            Fazer login
          </CardTitle>
          <CardDescription>
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  icon={Mail}
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
                  icon={Lock}
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 my-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                      Lembrar-me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="ml-auto font-bold hover:underline text-brand-base inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Recuperar senha
                  </a>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Entrar
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
            Ainda não tem uma conta?
          </CardDescription>

          <Button variant="secondary" className="w-full" asChild>
            <Link to="/register">
              Criar conta
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
