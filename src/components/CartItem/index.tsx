import { type CartItem as ICart } from "../../models/cart";
import { useCartStore } from "../../stores/cart";
import { motion } from "motion/react";
import { AnimatedNumber } from "../AnimatedNumber";
import { Minus, Plus } from "lucide-react";

interface CartProps {
  product: ICart;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export const CartItem = ({ product }: CartProps) => {
  const { addItem, removeItem } = useCartStore();

  return (
    <motion.li
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
        <AnimatedNumber value={product.price * product.quantity} />
      </div>

      <div className="flex items-center gap-2.5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            removeItem(product.id);
          }}
          role="button"
          className="p-3 disabled:bg-gray-600/10 disabled:cursor-no-drop flex items-center justify-center bg-gray-600 cursor-pointer rounded-xl"
        >
          <Minus size={20} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          role="button"
          className="p-3 disabled:bg-gray-600/10 disabled:cursor-no-drop flex items-center justify-center bg-gray-600 cursor-pointer rounded-xl"
        >
          <Plus size={20} />
        </motion.button>
      </div>
    </motion.li>
  );
};
