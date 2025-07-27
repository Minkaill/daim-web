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
      className="fixed bottom-10 inset-x-4 bg-gray-900 rounded-xl overflow-hidden"
      aria-label="Основная навигация"
    >
      <ul className="flex h-16">
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
              <div className="relative">
                <Icon size={28} />
                {label === "Профиль" && (
                  <div className="absolute text-xs bottom-3 left-4 bg-yellow-600 rounded-full flex items-center justify-center w-[20px] h-[20px]">
                    12
                  </div>
                )}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
