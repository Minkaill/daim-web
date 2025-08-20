import { useEffect, useState } from "react";
import { useTelegram } from "../../context/telegram";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CartItem } from "../../components/CartItem";
import { AnimatedNumber } from "../../components/AnimatedNumber";
import { CartEmpty } from "../../components/CartEmpty";
import { getPrice } from "../../hooks/product";
import { useCartStore } from "../../lib/stores/cart";
import { OrderModal } from "../../components/OrderModal";

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

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const Cart = () => {
  const [orderModal, setOrderModal] = useState(false);

  const navigate = useNavigate();
  const { items, loading, clearAll } = useCartStore();
  const { tg, isMobile } = useTelegram();

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const unitPrice = getPrice(totalQuantity);
  const defaultPrice = 350 * totalQuantity;
  const totalPrice = unitPrice * totalQuantity;
  const discount = defaultPrice - totalPrice;

  const discountPercent =
    defaultPrice > 0 ? Math.round((discount / defaultPrice) * 100) : 0;

  useEffect(() => {
    if (!tg) return;
    const onBack = () => navigate(-1);

    tg.BackButton.show();
    tg.BackButton.onClick(onBack);

    return () => {
      tg.BackButton.offClick(onBack);
      tg.BackButton.hide();
    };
  }, [tg, navigate]);

  return (
    <>
      <motion.div
        className="w-full flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-[#352c2cc7] rounded-xl p-3 flex flex-col"
          variants={blockVariants}
        >
          {items.length > 0 && (
            <div className="w-full h-full flex items-center justify-between mb-3">
              <h5 className="text-white text-base">Ваша корзина</h5>

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
            <CartEmpty />
          ) : (
            <motion.ul
              className="space-y-3"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {items.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </motion.ul>
          )}
        </motion.div>

        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-full bg-[#241f1fc7] ${
              isMobile ? "pb-12" : "pb-3"
            } p-3 fixed bottom-0 left-0`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center text-sm bg-[#352c2cc7] rounded-xl p-3 justify-between w-full mb-3"
            >
              <div className="flex flex-col w-full gap-1 text-gray-300">
                <div className="w-full flex items-center justify-between">
                  <p>Количество</p>

                  <AnimatedNumber
                    value={totalQuantity}
                    color="text-white font-normal"
                  />
                </div>
                <div className="w-full flex items-center justify-between">
                  <p>Цена за шт</p>

                  <AnimatedNumber
                    value={unitPrice}
                    currency
                    color="text-white font-normal"
                  />
                </div>
                <div className="w-full flex items-center justify-between">
                  <p>Сумма товаров</p>

                  <AnimatedNumber
                    value={defaultPrice}
                    currency
                    color="text-white font-normal"
                  />
                </div>
                <div className="w-full flex items-center justify-between">
                  <p>Скидка</p>

                  <AnimatedNumber
                    value={discountPercent}
                    discount
                    color="text-white font-normal"
                  />
                </div>

                <div className="w-full border-b border-gray-500/20 my-2"></div>

                <div className="w-full text-base font-bold flex items-center justify-between">
                  <p>Итого</p>

                  <AnimatedNumber
                    value={totalPrice}
                    currency
                    color="text-white font-normal"
                  />
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={() => setOrderModal(true)}
              disabled={items.length === 0}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full shimmer bg-[#4B2E2A] cursor-pointer disabled:opacity-60 disabled:cursor-no-drop disabled:pointer-events-none flex items-center justify-center gap-1 h-14 rounded-xl text-lg px-3"
            >
              Оплатить
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      <OrderModal
        totalPrice={totalPrice}
        open={orderModal}
        onClose={() => setOrderModal(false)}
      />
    </>
  );
};
