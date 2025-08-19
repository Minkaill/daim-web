import React from "react";
import { motion } from "framer-motion";
import type { IProduct } from "../../models/product";

interface CardProps {
  product: IProduct;
  onSelectProduct: (product: IProduct) => void;
}

export const Card: React.FC<CardProps> = ({ product, onSelectProduct }) => {
  return (
    <motion.div
      onClick={() => onSelectProduct(product)}
      className="cursor-pointer flex items-start w-full h-30 rounded-xl p-3 active:bg-[#241f1fc7] bg-[#352c2cc7] transition-all duration-300 ease-in-out"
      transition={{ duration: 0.1 }}
    >
      <div className="w-20 flex-shrink-0 h-full rounded-xl overflow-hidden mr-4">
        <img
          className="w-full h-full object-cover object-[50%_70%]"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="h-full flex flex-col justify-between">
        <h4 className="text-base text-white font-bold">{product.title}</h4>
        <p className="text-xs text-gray-300 w-[95%]">{product.description}</p>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0D0605] bg-[#D7AF8B] shadow-[0_2px_8px_rgba(215,175,139,.35)]">
            От 180₽
          </span>

          <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs text-white/90 bg-[#5E483C]">
            {product.volume}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
