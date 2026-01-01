import { Link, useLocation } from "@tanstack/react-router"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface MenuProps {
  to: string
  label: string
}

export default function Header() {
  const location = useLocation({ select: (loc) => loc.pathname })
  const links: MenuProps[] = [
    {
      to: "/dashboard",
      label: "Dashboard",
    },
    {
      to: "/transactions",
      label: "Transações",
    },
    {
      to: "/categories",
      label: "Categorias",
    },
  ]

  return (
    <header className="px-4 py-3 border-b border-border bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          <img src="/images/logo.svg" alt="Logo" />
        </Link>

        {/* NAV */}
        <nav>
          <ul className="flex gap-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className={cn(
                    "p-2 text-sm hover:text-brand hover:underline transition-300",
                    location === link.to
                      ? "font-semibold text-brand-base"
                      : "text-gray-600",
                  )}
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* PROFILE */}
        <Link to="/profile" className="transition hover:opacity-70">
          <Avatar>
            <AvatarFallback>YG</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
