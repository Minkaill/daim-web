import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  amount: number;
  onClose: () => void;
  onSubmit: (value: number) => void;
}

export const InputAmountModal = ({
  open,
  onClose,
  onSubmit,
  amount,
}: Props) => {
  const [localAmount, setLocalAmount] = useState(amount);

  useEffect(() => {
    if (open) setLocalAmount(amount);
  }, [open, amount]);

  const handleSubmit = () => {
    if (localAmount < 20) {
      onSubmit(20);
    } else {
      onSubmit(localAmount);
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-[#352c2cd7] relative w-full mx-5 rounded-xl p-6"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={handleModalClick}
          >
            <button
              className="absolute p-1 cursor-pointer bg-gray-500/50 rounded-full top-3 right-3 z-10"
              onClick={onClose}
            >
              <X size={24} className="text-white" />
            </button>

            <h2 className="text-base font-bold mb-2 mt-4">
              Введите количество
            </h2>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full p-2 min-h-12 border-none bg-[#241f1fc7] rounded-xl text-white focus:outline-none"
              min={1}
              max={2000}
              step={1}
              value={localAmount || ""}
              autoFocus
              onChange={(e) => setLocalAmount(Number(e.target.value))}
              placeholder="Введите количество"
            />

            <div className="w-full mt-5">
              <motion.button
                type="button"
                role="button"
                className="w-full bg-[#4B2E2A] cursor-pointer py-3 rounded-xl text-white font-bold"
                onClick={handleSubmit}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Сохранить
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
