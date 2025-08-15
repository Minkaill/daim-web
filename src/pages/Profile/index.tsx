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
    </motion.div>
  );
};
