import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 backdrop-blur p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <span aria-hidden>🧾</span>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold">Корзина пуста</h3>
          <p className="mt-1 text-xs text-zinc-500">
            Добавьте товары в корзину — они появятся здесь. Можно перейти в
            каталог и выбрать что-нибудь
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => navigate("/products")}
              className="px-3 py-1.5 cursor-pointer rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              Назад
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-3 cursor-pointer py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
