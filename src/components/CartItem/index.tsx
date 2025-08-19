import { type CartItem as ICart } from "../../models/cart";
import { motion } from "motion/react";
import { AnimatedNumber } from "../AnimatedNumber";
import { PenLine, Trash } from "lucide-react";
import { InputAmountModal } from "../InputAmountModal";
import { useEffect, useState } from "react";
import { getPrice } from "../../hooks/product";
import { useCartStore } from "../../lib/stores/cart";

interface CartProps {
  product: ICart;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export const CartItem = ({ product }: CartProps) => {
  const [amount, setAmount] = useState<number>(20);
  const [amountModal, setAmountModal] = useState(false);

  const price = getPrice(amount);
  const total = price * amount;

  const { addItem, removeItem } = useCartStore();

  useEffect(() => {
    setAmount(product.quantity);
  }, [product.quantity]);

  const images = ["/daim.jpg", "/daim-2.jpg"];

  return (
    <>
      <motion.li
        key={product.id}
        className="bg-gray-800 p-3 rounded-xl flex items-center cursor-pointer"
        variants={itemVariants}
      >
        <div className="w-12 h-12 rounded mr-3 overflow-hidden">
          <img
            src={images[product.id % images.length]}
            alt={product.title}
            className={`w-full h-full object-cover ${
              product.id % 2 === 0 ? "object-[50%_65%]" : "object-[50%_70%]"
            }`}
          />
        </div>
        <div className="flex-1">
          <h6 className="text-white font-medium">{product.title}</h6>
          <p className="text-gray-400 text-xs">Кол-во: {product.quantity}</p>
          <AnimatedNumber quantity={product.quantity} value={total} />
        </div>

        <div className="flex items-center gap-2.5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setAmountModal(true);
            }}
            role="button"
            className="p-3 disabled:bg-gray-600/10 disabled:cursor-no-drop flex items-center justify-center bg-gray-600 cursor-pointer rounded-xl"
          >
            <PenLine size={16} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              removeItem(product.id);
            }}
            role="button"
            className="p-3 disabled:bg-gray-600/10 disabled:cursor-no-drop flex items-center justify-center bg-gray-600 cursor-pointer rounded-xl"
          >
            <Trash size={16} />
          </motion.button>
        </div>
      </motion.li>

      <InputAmountModal
        open={amountModal}
        amount={amount}
        onClose={() => setAmountModal(false)}
        onSubmit={(value) => {
          addItem({ ...product, quantity: value });
        }}
      />
    </>
  );
};
