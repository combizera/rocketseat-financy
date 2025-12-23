import { Link, useLocation } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";

interface MenuProps {
  to: string;
  label: string;
}

export default function Header() {
  const location = useLocation({ select: (loc) => loc.pathname });
  const links: MenuProps[] = [
    {
      to: "/dashboard",
      label: "Dashboard",
    },
    {
      to: "/transactions",
      label: "Transactions",
    },
    {
      to: "/categories",
      label: "Categories",
    }
  ];

  return (
    <header className="px-4 py-2 border-b border-border bg-white">

      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          <img src="/images/logo.svg" alt="Logo" />
        </Link>

        {/* NAV */}
        <nav>
          <ul className="flex gap-2">
            {
              links.map((link, index) => (
                <li key={index}>
                  <Link className={cn("p-2 text-sm hover:text-brand hover:underline transition-300", location === link.to ? "font-semibold text-brand-base" : "text-gray-600")} to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>

        {/* PROFILE */}
        <Avatar>
          <AvatarFallback>
            YG
          </AvatarFallback>
        </Avatar>
      </div>

    </header>
  );
}
