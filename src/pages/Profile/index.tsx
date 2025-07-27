import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../../stores/cart";

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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const Profile: React.FC = () => {
  const { items, loading } = useCartStore();

  return (
    <motion.div
      className="w-full flex flex-col gap-4 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="w-full flex bg-gray-900 rounded-lg flex-col items-center justify-center p-3"
        variants={blockVariants}
      >
        <div className="rounded-full overflow-hidden w-28">
          <img src={user.photo_url} alt={user.first_name} />
        </div>

        <div className="mt-3 flex items-center gap-1">
          <h4 className="text-lg text-white">
            {user.first_name}
            {user.last_name}
          </h4>
          {user.is_premium && (
            <img className="w-4 h-4 mb-1" src="/premium.svg" alt="premium" />
          )}
        </div>
      </motion.div>

      <motion.div
        className="w-full flex bg-gray-900 rounded-lg gap-5 items-center justify-center p-3"
        variants={blockVariants}
      >
        <div className="bg-gray-800 w-1/2 p-2 rounded-lg flex flex-col items-center justify-center">
          <p className="mb-1.5 text-white">Кол-во покупок</p>
          <span className="text-yellow-600 font-bold">52</span>
        </div>

        <div className="bg-gray-800 w-1/2 p-2 rounded-lg flex flex-col items-center justify-center">
          <p className="mb-1.5 text-white">Скидка</p>
          <span className="text-yellow-600 font-bold">14%</span>
        </div>
      </motion.div>

      <motion.div
        className="w-full flex bg-gray-900 rounded-lg gap-5 items-center justify-center p-3"
        variants={blockVariants}
      >
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Загрузка корзины...
          </motion.p>
        ) : items.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Корзина пуста
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {items.length} товара
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};
