import { type CartItem as ICart } from "../../models/cart";
import { useCartStore } from "../../stores/cart";
import { motion } from "motion/react";
import { AnimatedNumber } from "../AnimatedNumber";

interface CartProps {
  product: ICart;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export const CartItem = ({ product }: CartProps) => {
  const { addItem } = useCartStore();

  return (
    <motion.li
      onClick={() => addItem(product)}
      whileTap={{ scale: 0.95 }}
      key={product.id}
      className="bg-gray-800 p-3 rounded-xl flex items-center cursor-pointer"
      variants={itemVariants}
    >
      <div className="w-12 h-12 rounded mr-3 overflow-hidden">
        <img
          src="/daim.jpg"
          alt={product.title}
          className="w-full h-full object-cover object-[50%_65%]"
        />
      </div>
      <div className="flex-1">
        <h6 className="text-white font-medium">{product.title}</h6>
        <p className="text-gray-400 text-xs">Кол-во: {product.quantity}</p>
      </div>

      <AnimatedNumber value={product.price * product.quantity} />
    </motion.li>
  );
};
