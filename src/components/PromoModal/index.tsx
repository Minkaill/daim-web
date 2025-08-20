import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Portal from "../Portal";
import { useTelegram } from "../../context/telegram";

interface PromoModalProps {
  open: boolean;
  onClose: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ open, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { isMobile } = useTelegram();

  const onNavigate = () => {
    window.open("https://t.me/daim_code");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Portal>
          <motion.div
            className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }} // ждём загрузки картинки
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: isImageLoaded ? 0 : "100%" }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="w-full max-w-xl relative"
            >
              <button
                onClick={onClose}
                className="absolute p-1 cursor-pointer bg-gray-500/50 rounded-full top-3 right-3 z-10"
              >
                <X size={24} className="text-white" />
              </button>

              <div className="rounded-t-2xl overflow-hidden">
                <img
                  className="w-full h-full"
                  src="/promo.png"
                  alt="promo"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>

              <div
                className={`bg-[#352c2c] w-full px-4 pt-5 ${
                  isMobile ? "pb-14" : "pb-5"
                }`}
              >
                <div className="mb-5">
                  <h1 className="mb-0.5 text-[22px] font-bold">
                    Подпишитесь на наш канал
                  </h1>
                  <p className="text-gray-400 text-base leading-5">
                    Чтобы не пропустить важные обновления
                  </p>
                </div>

                <button
                  onClick={onNavigate}
                  className="w-full text-lg bg-[#4B2E2A] shimmer cursor-pointer py-3 rounded-xl text-white font-bold"
                >
                  Подписаться
                </button>
              </div>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};
