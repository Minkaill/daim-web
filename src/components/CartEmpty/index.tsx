import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const blockVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={blockVariants}
      className="w-full rounded-xl flex flex-col items-center justify-center"
    >
      <img
        src="/empty-cart.png"
        className="w-40 h-40 opacity-55"
        alt="empty_cart"
      />

      <h4 className="text-base opacity-55">Корзина пуста</h4>

      <button
        onClick={() => navigate("/products")}
        className="w-full mt-5 bg-[#4B2E2A] cursor-pointer py-3 rounded-xl text-white font-bold"
      >
        Вернуться
      </button>
    </motion.div>
  );
};
