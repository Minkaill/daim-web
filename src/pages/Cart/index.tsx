import { useEffect } from "react";
import { useTelegram } from "../../context/telegram";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/cart";
import { motion } from "motion/react";
import { CartItem } from "../../components/CartItem";
import { AnimatedNumber } from "../../components/AnimatedNumber";
import { CartEmpty } from "../../components/CartEmpty";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const Cart = () => {
  const navigate = useNavigate();
  const { items, loading, clearAll, getTotal } = useCartStore();
  const { tg, isMobile } = useTelegram();

  const totalPrice = getTotal();

  useEffect(() => {
    if (!tg) return;
    const onBack = () => navigate(-1);

    tg.BackButton.show();
    tg.BackButton.onClick(onBack);

    return () => {
      tg.BackButton.offClick(onBack);
      tg.BackButton.hide();
    };
  }, [tg, navigate]);

  return (
    <motion.div
      className="w-full flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-gray-900 rounded-xl p-3 flex flex-col"
        variants={blockVariants}
      >
        {items.length > 0 && (
          <div className="w-full h-full flex items-center justify-between mb-3">
            <h5 className="text-white text-lg">
              Ваша корзина ({items.length})
            </h5>

            <button
              onClick={clearAll}
              className="text-yellow-600 cursor-pointer"
            >
              Очистить корзину
            </button>
          </div>
        )}
        {loading ? (
          <motion.p
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Загрузка...
          </motion.p>
        ) : items.length === 0 ? (
          <CartEmpty />
        ) : (
          <motion.ul
            className="space-y-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </motion.ul>
        )}
      </motion.div>

      {items.length > 0 && (
        <motion.div
          className={`w-full bg-gray-800 ${
            isMobile ? "h-28" : "h-20"
          } p-3 fixed bottom-0 left-0`}
        >
          <motion.button
            disabled={items.length === 0}
            className="w-full shimmer bg-blue-500 disabled:opacity-60 disabled:cursor-no-drop disabled:pointer-events-none flex items-center justify-center gap-1 h-14 rounded-xl text-lg px-3"
          >
            К оплате{" "}
            <AnimatedNumber value={totalPrice} color="text-white font-normal" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
