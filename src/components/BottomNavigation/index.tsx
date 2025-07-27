import { ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../stores/cart";

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
  const { items } = useCartStore();

  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.nav
      className="fixed bottom-10 inset-x-4 bg-gray-900 rounded-xl overflow-hidden"
      aria-label="Основная навигация"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <ul className="flex h-16">
        {navItems.map(({ to, Icon, label }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                [
                  "flex h-full items-center justify-center transition-colors duration-200 ease-in-out",
                  isActive ? "bg-gray-950" : "bg-transparent",
                  "hover:bg-gray-800 focus:bg-gray-800",
                ].join(" ")
              }
              aria-label={label}
            >
              <div className="relative">
                <Icon size={28} />

                {to === "/profile" && (
                  <AnimatePresence>
                    {items.length > 0 && (
                      <motion.div
                        key={items.length}
                        className="
                          absolute bottom-3 left-4
                          w-5 h-5
                          flex items-center justify-center
                          text-xs text-black
                          bg-yellow-400 rounded-full
                        "
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                        aria-label={`В корзине ${items.length} ${
                          items.length === 1 ? "товар" : "товара"
                        }`}
                      >
                        {items.length}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};
