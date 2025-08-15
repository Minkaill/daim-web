import { useEffect, useMemo, useRef, useState } from "react";
import type { IProduct } from "../../models/product";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useCartStore } from "../../stores/cart";
import { useTelegram } from "../../context/telegram";

interface Props {
  open: boolean;
  product: IProduct | null;
  onClose: () => void;
}

export const ProductModal = ({ open, product, onClose }: Props) => {
  const [lastProduct, setLastProduct] = useState<IProduct | null>(null);
  const [amount, setAmount] = useState(20);
  const [imgReady, setImgReady] = useState(false);

  const { isMobile } = useTelegram();
  const { addItem, removeItem, items } = useCartStore();

  const backdropRef = useRef<HTMLDivElement | null>(null);

  const currentProduct = product ?? lastProduct;

  useEffect(() => {
    if (open && product) setLastProduct(product);
  }, [open, product]);

  useEffect(() => {
    setImgReady(false);
  }, [currentProduct?.image]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleRequestClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isInCart = useMemo(
    () => (product ? items.some((item) => item.id === product.id) : false),
    [items, product]
  );

  const onToggleItemInCart = () => {
    if (isInCart && product) {
      removeItem(product.id);
    } else if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: amount,
      });
    }
  };

  const handleBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.target === backdropRef.current) handleRequestClose();
  };

  const handleRequestClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {open && currentProduct && (
        <motion.div
          ref={backdropRef}
          onMouseDown={handleBackdropMouseDown}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`px-3 pt-5 ${
              isMobile ? "pb-12" : "pb-3"
            } bg-gray-900 rounded-t-3xl w-full`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: imgReady ? 0 : 100, opacity: imgReady ? 1 : 0 }}
            exit={{ y: 500, opacity: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
          >
            <div className="rounded-xl relative overflow-hidden w-full h-96">
              <button
                className="absolute p-1 cursor-pointer bg-gray-500/50 rounded-full top-3 right-3 z-10"
                onClick={onClose}
              >
                <X size={24} className="text-white" />
              </button>

              {!imgReady && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse" />
              )}

              <img
                src={currentProduct.image}
                alt={currentProduct.title}
                className="w-full h-full object-cover object-[100%_70%]"
                onLoad={() => setImgReady(true)}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: imgReady ? 1 : 0 }}
                className="absolute inset-0"
              />
            </div>

            <div className="mt-3 rounded-xl p-3 bg-gray-800">
              <h4 className="text-white text-base font-bold">
                {currentProduct.title}
              </h4>
              <p className="text-gray-400 text-xs mt-1">
                {currentProduct.description}
              </p>

              <div className="flex items-center gap-4 mt-3">
                <span className="bg-green-600 py-1 px-1.5 text-xs rounded-xl text-white">
                  {currentProduct.price}₽
                </span>
                <span className="bg-yellow-600 py-1 px-1.5 text-xs rounded-xl text-white">
                  {currentProduct.volume}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <motion.button
                onClick={() => setAmount(20)}
                className="px-3 w-full py-2 rounded-xl cursor-pointer"
                animate={{
                  backgroundColor:
                    amount === 20 ? "#3b82f6" : "rgba(107, 114, 128, 0.5)",
                }}
              >
                20
              </motion.button>
              <motion.button
                onClick={() => setAmount(100)}
                className="px-3 w-full py-2 rounded-xl cursor-pointer"
                animate={{
                  backgroundColor:
                    amount === 100 ? "#3b82f6" : "rgba(107, 114, 128, 0.5)",
                }}
              >
                100
              </motion.button>
              <motion.button
                onClick={() => setAmount(500)}
                className="px-3 w-full py-2 rounded-xl cursor-pointer"
                animate={{
                  backgroundColor:
                    amount === 500 ? "#3b82f6" : "rgba(107, 114, 128, 0.5)",
                }}
              >
                500
              </motion.button>
              <motion.button
                onClick={() => setAmount(1000)}
                className="px-3 w-full py-2 rounded-xl cursor-pointer"
                animate={{
                  backgroundColor:
                    amount === 1000 ? "#3b82f6" : "rgba(107, 114, 128, 0.5)",
                }}
              >
                1000
              </motion.button>
              <motion.button
                onClick={() => setAmount(2000)}
                className="px-3 w-full py-2 rounded-xl cursor-pointer"
                animate={{
                  backgroundColor:
                    amount === 2000 ? "#3b82f6" : "rgba(107, 114, 128, 0.5)",
                }}
              >
                2000
              </motion.button>
            </div>

            <div className="w-full mt-5">
              <motion.button
                onClick={onToggleItemInCart}
                disabled={!currentProduct}
                animate={{
                  backgroundColor: isInCart ? "#dc2626" : "#3b82f6",
                }}
                type="button"
                role="button"
                className="w-full shimmer cursor-pointer py-3 rounded-xl text-white font-bold"
              >
                <motion.span
                  key={isInCart ? "remove" : "add"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isInCart ? "Удалить" : "В корзину"}
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
