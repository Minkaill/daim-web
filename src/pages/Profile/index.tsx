import React from "react";
import { motion } from "framer-motion";

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

export const Profile: React.FC = () => {
  return (
    <motion.div
      className="w-full flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-gray-900 rounded-xl flex flex-col items-center p-4"
        variants={blockVariants}
      >
        <img
          src={user.photo_url}
          alt={user.first_name}
          className="w-28 h-28 rounded-full mb-3"
        />
        <div className="font-bold">
          <h4 className="text-lg text-white">
            {user.first_name} {user.last_name}
          </h4>
        </div>

        <div className="w-full flex items-center justify-center gap-4 mt-3 bg-gray-800 p-3 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-yellow-600">0</span>
            <p className="text-gray-500 mt-[-5px]">Куплено</p>
          </div>

          <div className="h-4 border border-r text-gray-700" />

          <div className="flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-yellow-600">0%</span>
            <p className="text-gray-500 mt-[-5px]">Скидка</p>
          </div>
        </div>
      </motion.div>

      {/* <motion.div
        className="bg-gray-900 rounded-xl p-3 flex flex-col"
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
          className="bg-gray-900 rounded-xl p-3"
        >
          <div className="w-full flex items-center justify-between bg-gray-800 p-3 rounded-xl">
            <h4 className="text-lg">Итого:</h4>

            <AnimatedNumber value={totalPrice} />
          </div>
        </motion.div>
      )}

      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.0 }}
          className="bg-gray-900 w-full rounded-xl p-3 text-lg"
        >
          <motion.button
            role="button"
            className="p-3 bg-yellow-600 rounded-xl w-full cursor-pointer"
          >
            Сделать заказ
          </motion.button>
        </motion.div>
      )} */}
    </motion.div>
  );
};
