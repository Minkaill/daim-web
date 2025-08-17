import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={blockVariants}
      className="bg-gray-900 w-full rounded-xl flex flex-col items-center justify-center"
    >
      <img
        src="/empty-cart.png"
        className="w-50 h-50 opacity-55"
        alt="empty_cart"
      />

      <h4 className="font-bold text-base">Корзина пуста</h4>

      <button
        className="bg-gray-800 w-full active:bg-gray-800/50 rounded-xl py-3 mt-5 cursor-pointer"
        onClick={() => navigate("/products")}
      >
        Вернуться
      </button>
    </motion.div>
  );
};
