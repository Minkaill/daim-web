import { motion } from "motion/react";

export const OrderSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-[#352c2cee] rounded-xl p-4 h-46 flex flex-col animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-gray-600/40 rounded" />
            <div className="h-4 w-16 bg-gray-600/40 rounded" />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="h-3 w-20 bg-gray-600/40 rounded" />
            <div className="h-3 w-12 bg-gray-600/40 rounded" />
          </div>

          <div className="mt-2 h-3 w-40 bg-gray-600/40 rounded" />

          <div className="mt-2 space-y-2">
            <div className="h-3 w-32 bg-gray-600/40 rounded" />
            <div className="h-3 w-28 bg-gray-600/40 rounded" />
          </div>

          <div className="mt-auto h-3 w-20 bg-gray-600/40 rounded" />
        </motion.div>
      ))}
    </motion.div>
  );
};
