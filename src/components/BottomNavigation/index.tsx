import { ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useTelegram } from "../../context/telegram";

interface NavItem {
  to: string;
  label: string;
  Icon: React.FC<{ size?: number }>;
}

const navItems: NavItem[] = [
  { to: "/products", label: "Товары", Icon: ShoppingCart },
  { to: "/profile", label: "Профиль", Icon: User },
];

export const BottomNavigation = forwardRef<HTMLDivElement>((_, ref) => {
  const { isMobile } = useTelegram();
  const navVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.nav
      ref={ref}
      className="fixed bottom-0 left-0 w-full bg-gray-900 overflow-hidden"
      aria-label="Основная навигация"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <ul className={`flex ${!isMobile ? "h-24" : "h-20"}`}>
        {navItems.map(({ to, Icon, label }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                [
                  "flex border-t border-gray-800 pt-3 items-center justify-center transition-colors duration-200 ease-in-out",
                  isActive ? "text-white" : "text-gray-400",
                ].join(" ")
              }
              aria-label={label}
            >
              <div className="flex flex-col items-center gap-1">
                <Icon size={24} />
                <p className="text-xs">{label}</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
});
