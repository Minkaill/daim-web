import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../../stores/cart";
import { CartItem } from "../../components/CartItem";
import { AnimatedNumber } from "../../components/AnimatedNumber";

const user = {
  id: 5605356109,
  first_name: "Minkail",
  last_name: "",
  username: "mklhdv",
  language_code: "ru",
  is_premium: true,
  photo_url:
    "https://t.me/i/userpic/320/twVtB1dsdPKDLWHaWTNOobb8WGeo-fI6nvIEG0rduwylNM6anhGBe0V7IPe382k7.svg",
};

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

export const Profile: React.FC = () => {
  const { items, getTotal, loading, clearAll } = useCartStore();

  const totalPrice = getTotal();

  return (
    <motion.div
      className="w-full flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-gray-900 rounded-lg flex flex-col items-center p-4"
        variants={blockVariants}
      >
        <img
          src={user.photo_url}
          alt={user.first_name}
          className="w-28 h-28 rounded-full mb-3"
        />
        <div className="flex items-center gap-2">
          <h4 className="text-lg text-white">
            {user.first_name} {user.last_name}
          </h4>
          {user.is_premium && (
            <img src="/premium.svg" alt="premium" className="w-5 h-5" />
          )}
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-900 rounded-lg flex space-x-4 p-4"
        variants={blockVariants}
      >
        <div className="flex-1 bg-gray-800 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-300">Кол-во покупок</p>
          <span className="text-yellow-600 font-bold">{items.length}</span>
        </div>
        <div className="flex-1 bg-gray-800 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-300">Скидка</p>
          <span className="text-yellow-600 font-bold">
            {Math.min(items.length, 50)}%
          </span>
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-900 rounded-lg p-3 flex flex-col"
        variants={blockVariants}
      >
        {items.length > 0 && (
          <div className="w-full h-full flex items-center justify-between mb-3">
            <h5 className="text-white text-lg">Ваша корзина</h5>

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
          <motion.p
            className="text-gray-300 w-full flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Корзина пуста
          </motion.p>
        ) : (
          <motion.ul
            className="space-y-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((product) => (
              <CartItem product={product} />
            ))}
          </motion.ul>
        )}
      </motion.div>

      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-gray-900 rounded-lg p-3"
        >
          <div className="w-full flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <h4 className="text-lg">Итого:</h4>

            <AnimatedNumber value={totalPrice} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
