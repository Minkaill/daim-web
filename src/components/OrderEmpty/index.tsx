import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export const EmptyOrders: React.FC<{ onReload: () => void }> = ({
  onReload,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/40 backdrop-blur p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <span aria-hidden>🧾</span>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold">Заказов нет</h3>
          <p className="mt-1 text-xs text-zinc-500">
            Оформите первый заказ — он появится здесь. Если уже оформляли,
            попробуйте обновить список
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={onReload}
              className="px-3 py-1.5  cursor-pointer rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              Обновить
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-3 py-1.5 cursor-pointer  rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
