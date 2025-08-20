import React from "react";
import { motion } from "framer-motion";
import { useTelegram } from "../../context/telegram";
import { UserSkeleton } from "../../components/UserSkeleton";

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
  const { user: usr } = useTelegram();

  if (!usr) return <UserSkeleton />;

  return (
    <motion.div
      className="w-full flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-[#352c2cd7] rounded-xl relative flex flex-col items-center p-4"
        variants={blockVariants}
      >
        <div className="absolute top-3 right-3 max-w-28 flex flex-wrap">
          <span className="text-gray-500/50">
            {usr && usr.username && usr.username.length > 50
              ? `@${usr.username.slice(0, 50)}` + "..."
              : `@${usr?.username}`}
          </span>
        </div>

        <img
          src={usr.photo_url}
          alt={usr.first_name}
          className="w-28 h-28 rounded-full mb-3 z-10"
        />
        <div className="font-bold">
          <h4 className="text-lg text-white">
            {usr.first_name || "User"} {usr.last_name}
          </h4>
        </div>

        <div className="w-full flex items-center justify-center gap-4 mt-3 bg-[#241f1fc7] p-3 rounded-xl">
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
