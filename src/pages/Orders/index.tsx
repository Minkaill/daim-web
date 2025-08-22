import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTelegram } from "../../context/telegram";
import { useOrderStore } from "../../lib/stores/order";
import { OrderSkeleton } from "../../components/OrderSkeleton";
import { OrderCard } from "../../components/OrderCard";
import { EmptyOrders } from "../../components/OrderEmpty";
import { useSearchStore } from "../../lib/stores/search";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const STATUS_OPTIONS = [
  { value: "", label: "Все статусы" },
  { value: "processing", label: "Оформляется" },
  { value: "in_transit", label: "Передан в доставку" },
  { value: "declined", label: "Отменён" },
  { value: "completed", label: "Доставлен" },
];

export const Orders: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  const { setValue, savedValue, value } = useSearchStore();
  const { user } = useTelegram();
  const { isLoading, error, orders, getMyOrders } = useOrderStore();

  useEffect(() => {
    if (user && user.id) {
      getMyOrders(user.id, { status: status, title: value });
    }
  }, [savedValue, status, user]);

  const hasFilters = status !== "" || savedValue.trim() !== "";
  const noOrders = !isLoading && !error && orders.length === 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 pb-2"
    >
      {(orders.length > 0 || hasFilters) && (
        <motion.div variants={itemVariants} className="flex gap-2">
          <input
            type="text"
            placeholder="Поиск по адресу или номеру заказа..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 min-h-10 border border-transparent bg-[#241f1fc7] rounded-xl text-white focus:outline-none placeholder:text-gray-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="min-w-36 cursor-pointer p-3 min-h-10 border border-transparent bg-[#241f1fc7] rounded-xl text-white focus:outline-none placeholder:text-gray-400"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {isLoading && <OrderSkeleton />}

      {!isLoading && error && (
        <p className="text-xs text-red-400 px-1">Ошибка: {error}</p>
      )}

      {!isLoading && !error && (
        <>
          {noOrders && !hasFilters && (
            <EmptyOrders onReload={() => user && getMyOrders(user.id)} />
          )}
          {noOrders && hasFilters && (
            <motion.div
              variants={itemVariants}
              className="bg-[#241f1fc7] rounded-xl p-4 text-white text-sm"
            >
              Ничего не найдено по фильтрам
            </motion.div>
          )}

          {orders.length > 0 && (
            <div className="flex flex-col gap-2">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};
