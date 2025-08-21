import type { JSX } from "react";
import type { IOrder, OrderStatus } from "../../models/order";
import { CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import { motion } from "motion/react";

interface OrderProps {
  order: IOrder;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const STATUS_META: Record<
  OrderStatus,
  { label: string; classes: string; icon: JSX.Element }
> = {
  processing: {
    label: "Оформляется",
    classes: "bg-yellow-600/50 text-white",
    icon: <Clock size={14} />,
  },
  in_transit: {
    label: "В пути",
    classes: "bg-blue-600/60 text-white",
    icon: <Truck size={14} />,
  },
  declined: {
    label: "Отменён",
    classes: "bg-red-600/60 text-white",
    icon: <XCircle size={14} />,
  },
  completed: {
    label: "Доставлен",
    classes: "bg-green-600/60 text-white",
    icon: <CheckCircle size={14} />,
  },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) +
  " " +
  new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const OrderCard = ({ order }: OrderProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-[#352c2cee] rounded-xl p-4 h-46 flex flex-col"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-base">Заказ №{order.id}</h3>
        <span
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${
            STATUS_META[order.status].classes
          }`}
        >
          {STATUS_META[order.status].icon}
          {STATUS_META[order.status].label}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm text-gray-300">
        <p>{formatDate(order.date)}</p>
        <p className="font-semibold text-white">{order.total_price_cents}₽</p>
      </div>

      <p className="mt-1 text-xs text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
        📍 {order.address}
      </p>

      <div className="mt-2 flex-1 overflow-hidden">
        <div className="space-y-1 h-full overflow-auto">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm text-gray-200"
            >
              <span className="truncate">
                {item.product.name}{" "}
                <span className="text-gray-400">x{item.quantity}</span>
              </span>
              <span className="text-gray-400">{item.line_total_cents}₽</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Оплата:{" "}
        {order.is_paid ? (
          <span className="text-green-500">оплачен</span>
        ) : (
          <span className="text-red-500">не оплачен</span>
        )}
      </div>
    </motion.div>
  );
};
