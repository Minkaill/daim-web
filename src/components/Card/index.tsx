import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IProduct } from "../../models/product";
import { Check, ShoppingBasket } from "lucide-react";
import { useCartStore } from "../../lib/stores/cart";

interface CardProps {
  product: IProduct;
  onSelectProduct: (product: IProduct) => void;
}

export const Card: React.FC<CardProps> = ({ product, onSelectProduct }) => {
  const { items, addItem, removeItem } = useCartStore();

  const isInCart = useMemo(
    () => (product ? items.some((item) => item.id === product.id) : false),
    [items, product]
  );

  const onToggleItemInCart = () => {
    if (!product) return;
    if (!isInCart) {
      addItem({ ...product, quantity: 20 });
    } else {
      removeItem(product.id);
    }
  };

  return (
    <motion.div
      onClick={() => onSelectProduct(product)}
      className="cursor-pointer flex relative items-start w-full h-30 rounded-xl p-3 active:bg-[#241f1fc7] bg-[#352c2cee] transition-all duration-300 ease-in-out"
      transition={{ duration: 0.1 }}
    >
      <div className="w-20 flex-shrink-0 h-full rounded-xl overflow-hidden mr-4">
        <img
          className="w-full h-full opacity-80 object-cover object-center scale-180"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="h-full flex flex-col justify-between">
        <h4 className="text-base text-white font-bold">{product.title}</h4>
        <p className="text-xs text-gray-300 w-[95%]">{product.description}</p>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0D0605] bg-[#C69C72] shadow-[0_2px_8px_rgba(215,175,139,.35)]">
            От 180₽
          </span>

          <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs text-white/90 bg-[#5E483C]">
            {product.volume}
          </span>
        </div>
      </div>

      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          onToggleItemInCart();
        }}
        className={`absolute flex items-center justify-center right-3 bottom-3
    p-1 rounded-full`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          backgroundColor: isInCart ? "rgba(65,228,87,0.43)" : "#C69C72",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isInCart ? (
            <motion.div
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.05 }}
            >
              <Check size={18} className="text-white/70" />
            </motion.div>
          ) : (
            <motion.div
              key="basket"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.05 }}
            >
              <ShoppingBasket size={18} className="text-[#0d0605]/70" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
