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
      className="cursor-pointer flex items-start w-full h-30 rounded-xl p-3 active:bg-gray-800 bg-gray-900 transition-all duration-300 ease-in-out"
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
        <p className="text-xs text-gray-300">{product.description}</p>

        <div className="flex items-center gap-4">
          <span className=" bg-green-600 shimmer py-1 px-1.5 text-xs rounded-xl text-white">
            От 20шт
          </span>
          <span className=" bg-yellow-600 py-1 px-1.5 text-xs rounded-xl text-white">
            {product.volume}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
