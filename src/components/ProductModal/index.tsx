import { useEffect, useMemo, useRef, useState } from "react";
import type { IProduct } from "../../models/product";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart } from "lucide-react";
import { useTelegram } from "../../context/telegram";
import { PenLine } from "lucide-react";
import { InputAmountModal } from "../InputAmountModal";
import { useCartStore } from "../../lib/stores/cart";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  product: IProduct | null;
  onClose: () => void;
}

const AMOUNT_OPTIONS = [20, 100, 500, 1000] as const;

export const ProductModal = ({ open, product, onClose }: Props) => {
  const [lastProduct, setLastProduct] = useState<IProduct | null>(null);
  const [amount, setAmount] = useState(20);
  const [imgReady, setImgReady] = useState(false);
  const [amountModal, setAmountModal] = useState(false);

  const { isMobile } = useTelegram();
  const { addItem, items } = useCartStore();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (product) {
      const itemInCart = items.find((x) => x.id === product.id);
      if (itemInCart) {
        setAmount(itemInCart.quantity);
      } else {
        setAmount(20);
      }
    }
  }, [product, items]);

  const isInCart = useMemo(
    () => (product ? items.some((item) => item.id === product.id) : false),
    [items, product]
  );

  const onToggleItemInCart = () => {
    if (!product) return;
    if (!isInCart) {
      addItem({ ...product, quantity: amount });
    } else {
      navigate("/cart");
    }
  };

  const handleBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.target === backdropRef.current) handleRequestClose();
  };

  const handleRequestClose = () => {
    onClose();
    setAmount(20);
  };

  return (
    <>
      <AnimatePresence>
        {open && currentProduct && (
          <motion.div
            ref={backdropRef}
            onMouseDown={handleBackdropMouseDown}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-end justify-center"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`px-3 pt-5 ${
                isMobile ? "pb-12" : "pb-3"
              } bg-[#352c2cee] rounded-t-3xl w-full`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: imgReady ? 0 : 100, opacity: imgReady ? 1 : 0 }}
              exit={{ y: 500, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
            >
              <div className="relative flex justify-center items-center overflow-hidden w-full h-80">
                <button
                  className="absolute p-1 cursor-pointer bg-gray-500/50 rounded-full top-3 right-3 z-10"
                  onClick={handleRequestClose}
                >
                  <X size={24} className="text-white" />
                </button>

                {!imgReady && (
                  <div className="absolute inset-0 bg-gray-700 animate-pulse" />
                )}

                <div className="w-full max-w-[500px] h-full rounded-xl overflow-hidden">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    className="w-full h-full object-cover object-center opacity-80 scale-120 min-[420px]:scale-100"
                    onLoad={() => setImgReady(true)}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imgReady ? 1 : 0 }}
                  className="absolute inset-0"
                />
              </div>

              <div className="mt-3 rounded-xl p-3 bg-[#241f1fc7]">
                <h4 className="text-white text-base font-bold">
                  {currentProduct.title}
                </h4>
                <p className="text-gray-400 text-xs mt-1">
                  {currentProduct.description}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0D0605] bg-[#C69C72] shadow-[0_2px_8px_rgba(215,175,139,.35)]">
                    От 180₽
                  </span>

                  <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs text-white/90 bg-[#5E483C]">
                    {currentProduct.volume}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {!isInCart && (
                  <motion.div
                    key="amount-options"
                    className="mt-3 overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    layout
                  >
                    <div className="flex items-center gap-2">
                      {AMOUNT_OPTIONS.map((opt) => (
                        <motion.button
                          key={opt}
                          onClick={() => setAmount(opt)}
                          className="px-3 w-full py-2 rounded-xl cursor-pointer"
                          animate={{
                            backgroundColor:
                              amount === opt
                                ? "#4B2E2A"
                                : "rgba(107, 114, 128, 0.5)",
                          }}
                        >
                          {opt}
                        </motion.button>
                      ))}

                      <motion.button
                        key="custom-amount"
                        onClick={() => setAmountModal(true)}
                        animate={{
                          backgroundColor: !AMOUNT_OPTIONS.includes(
                            amount as (typeof AMOUNT_OPTIONS)[number]
                          )
                            ? "#4B2E2A"
                            : "rgba(107, 114, 128, 0.5)",
                        }}
                        className="w-full flex items-center justify-center py-2 rounded-xl cursor-pointer"
                      >
                        <PenLine color="#fff" size={21.5} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-full mt-3">
                <motion.button
                  onClick={onToggleItemInCart}
                  disabled={!currentProduct}
                  type="button"
                  role="button"
                  className="w-full bg-[#4B2E2A] shimmer cursor-pointer py-3 rounded-xl text-white font-bold"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isInCart ? "В корзину" : <ShoppingCart size={20} />}
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <InputAmountModal
        open={amountModal}
        amount={amount}
        onClose={() => setAmountModal(false)}
        onSubmit={(value) => setAmount(value)}
      />
    </>
  );
};
