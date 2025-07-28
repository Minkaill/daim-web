import { useEffect, useRef, useState, type ReactNode } from "react";
import { BottomNavigation } from "../BottomNavigation";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "../../stores/cart";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [navHeight, setNavHeight] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const { items } = useCartStore();

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight + 20);
    }
  }, []);

  return (
    <div className="p-5 w-full" style={{ paddingBottom: navHeight }}>
      {children}

      {location.pathname !== "/cart" && (
        <div
          onClick={() => navigate("/cart")}
          className="fixed bottom-24 right-5 bg-gray-800 w-13 h-13 flex items-center justify-center rounded-full cursor-pointer"
        >
          <ShoppingBag />

          <AnimatePresence>
            <motion.div
              key={items.length}
              className="
              absolute bottom-6 left-6
              w-5 h-5
              flex items-center justify-center
              font-bold
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
          </AnimatePresence>
        </div>
      )}

      {location.pathname !== "/cart" && <BottomNavigation ref={navRef} />}
    </div>
  );
};
