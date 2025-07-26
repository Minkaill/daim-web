import { ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  Icon: React.FC<{ size?: number }>;
}

const navItems: NavItem[] = [
  { to: "/products", label: "Корзина", Icon: ShoppingCart },
  { to: "/profile", label: "Профиль", Icon: User },
];

export const BottomNavigation: React.FC = () => {
  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-gray-900"
      aria-label="Основная навигация"
    >
      <ul className="flex h-20">
        {navItems.map(({ to, Icon, label }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                [
                  "flex h-full items-center justify-center",
                  "transition-colors duration-200 ease-in-out",
                  isActive ? "bg-gray-950" : "bg-transparent",
                  "hover:bg-gray-800 focus:bg-gray-800",
                ].join(" ")
              }
              aria-label={label}
            >
              <Icon size={32} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
