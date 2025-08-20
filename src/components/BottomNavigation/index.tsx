import { ShoppingCart, User, ShoppingBag, CreditCard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef } from "react";
import { useTelegram } from "../../context/telegram";
import { useCartStore } from "../../lib/stores/cart";

interface NavItem {
  to: string;
  label: string;
  Icon: React.FC<{ size?: number }>;
}

const navItems: NavItem[] = [
  { to: "/products", label: "Товары", Icon: ShoppingBag },
  { to: "/cart", label: "Корзина", Icon: ShoppingCart },
  { to: "/orders", label: "Мои заказы", Icon: CreditCard },
  { to: "/profile", label: "Профиль", Icon: User },
];

export const BottomNavigation = forwardRef<HTMLDivElement>((_, ref) => {
  const { items } = useCartStore();
  const { isMobile } = useTelegram();

  const navVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.nav
      ref={ref}
      className={`fixed ${
        isMobile ? "bottom-10" : "bottom-4"
      } left-0 right-0 w-[90%] mx-auto bg-[#352c2cd7] overflow-hidden rounded-4xl`}
      aria-label="Основная навигация"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <ul className={`flex `}>
        {navItems.map(({ to, Icon, label }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                [
                  "flex py-3 items-center justify-center transition-colors duration-200 ease-in-out",
                  isActive ? "text-white" : "text-gray-400",
                ].join(" ")
              }
              aria-label={label}
            >
              <div className="flex flex-col relative items-center gap-1">
                <Icon size={20} />
                <p className="text-xs">{label}</p>

                {to === "/cart" && (
                  <AnimatePresence>
                    {items.length > 0 && (
                      <motion.div
                        key={items.length}
                        className="
                         absolute bottom-7 left-7
                         w-5 h-5
                         flex items-center justify-center
                         font-bold
                         text-xs text-white
                         bg-[#C69C72] rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }} // 👈 плавное исчезновение
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                          opacity: { duration: 0.3 }, // 👈 отдельно управляем прозрачностью
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
});
