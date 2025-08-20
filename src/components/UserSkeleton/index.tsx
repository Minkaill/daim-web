import { motion } from "motion/react";

export const UserSkeleton: React.FC = () => {
  return (
    <motion.div
      key="skeleton"
      className="w-full flex flex-col gap-3"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
    >
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.07),
            transparent
          );
          animation: shimmer 1.6s infinite;
        }
      `}</style>

      <div className="bg-[#352c2cd7] rounded-xl relative flex flex-col items-center p-4 overflow-hidden">
        <div className="w-28 h-28 rounded-full mb-3 bg-gray-600/50 shimmer" />

        <div className="w-32 h-5 rounded-md mb-2 bg-gray-600/50 shimmer" />

        <div className="w-full flex items-center justify-center gap-4 mt-3 bg-[#241f1fc7] p-3 rounded-xl">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-4 rounded-md bg-gray-600/40 shimmer" />
            <div className="w-14 h-3 rounded-md bg-gray-600/30 shimmer" />
          </div>

          <div className="h-4 border-r border-gray-700" />

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="w-10 h-4 rounded-md bg-gray-600/40 shimmer" />
            <div className="w-14 h-3 rounded-md bg-gray-600/30 shimmer" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
