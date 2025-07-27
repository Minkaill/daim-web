import React, { useMemo } from "react";
import { motion } from "framer-motion";
import type { IProduct } from "../../models/product";
import { useCartStore } from "../../stores/cart";

interface CardProps {
  product: IProduct;
}

const gray900 = "#111827";
const green900 = "#064E3B";

export const Card: React.FC<CardProps> = ({ product }) => {
  const { addItem, removeItem, items } = useCartStore();

  const isInCart = useMemo(
    () => items.some((item) => item.id === product.id),
    [items, product.id]
  );

  const onToggleItemInCart = () => {
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }
  };

  return (
    <motion.div
      onClick={onToggleItemInCart}
      className="cursor-pointer flex items-start w-full h-30 rounded-lg p-3 transition-all duration-300 ease-in-out"
      animate={{ backgroundColor: isInCart ? green900 : gray900 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-20 flex-shrink-0 h-full rounded-lg overflow-hidden mr-4">
        <img
          className="w-full h-full object-cover object-[50%_70%]"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="h-full flex flex-col justify-between">
        <h4 className="text-base text-white font-bold">{product.title}</h4>
        <p className="text-xs text-gray-300">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-white">{product.price}₽</span>
          <span className="bg-yellow-600 p-1 text-xs rounded-lg text-white">
            {product.volume}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
