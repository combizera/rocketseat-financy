import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { NavigationMenu } from "@/components/ui/navigation-menu"

export default function Header() {
  const links = [{ to: "/", label: "Home" }] as const;

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-white">
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold">
        <img src="/images/logo.svg" alt="Logo" />
      </Link>

      {/* NAV */}
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link className="p-2 text-sm text-gray-600 hover:text-brand-base hover:font-semibold transition-300" to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="p-2 text-sm text-gray-600 hover:text-brand hover:font-semibold transition-300" to="/">
              Transações
            </Link>
          </li>
          <li>
            <Link className="p-2 text-sm text-gray-600 hover:text-brand hover:font-semibold transition-300" to="/">
              Categorias
            </Link>
          </li>
        </ul>
      </nav>

      {/* PROFILE */}
      <Avatar>
        <AvatarFallback>
          YG
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
