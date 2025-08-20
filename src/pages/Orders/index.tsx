import { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, Truck, XCircle, Clock } from "lucide-react";
import type { JSX } from "react";
import type { IOrder, OrderStatus } from "../../models/order";
import { useTelegram } from "../../context/telegram";
import { useOrderStore } from "../../lib/stores/order";

export const fakeOrders: IOrder[] = [
  {
    telegram_id: 5605356109,
    id: 2,
    phone: "79899408700",
    is_paid: false,
    date: "2025-08-19T17:38:25.211632",
    address: "Улица Жуковского 169",
    total_price_cents: 5000,
    user_id: 2,
    status: "processing",
    user: {
      id: 2,
      phone: null,
      created_at: "2025-08-19T17:38:20.302029",
      name: "Minkail",
      telegram_id: 5605356109,
    },
    items: [
      {
        product_id: 2,
        quantity: 20,
        line_total_cents: 5000,
        order_id: 2,
        id: 2,
        unit_price_cents: 250,
        product: {
          name: "Гранат",
          price_cents: 25000,
          id: 2,
        },
      },
    ],
  },
  {
    telegram_id: 5605356110,
    id: 3,
    phone: "79995554433",
    is_paid: true,
    date: "2025-08-20T12:10:11.511632",
    address: "Проспект Ленина 42",
    total_price_cents: 12000,
    user_id: 3,
    status: "completed",
    user: {
      id: 3,
      phone: "79995554433",
      created_at: "2025-08-18T09:15:12.102029",
      name: "Aisha",
      telegram_id: 5605356110,
    },
    items: [
      {
        product_id: 3,
        quantity: 2,
        line_total_cents: 6000,
        order_id: 3,
        id: 3,
        unit_price_cents: 3000,
        product: {
          name: "Кофе Арабика",
          price_cents: 3000,
          id: 3,
        },
      },
      {
        product_id: 4,
        quantity: 3,
        line_total_cents: 6000,
        order_id: 3,
        id: 4,
        unit_price_cents: 2000,
        product: {
          name: "Чай зелёный",
          price_cents: 2000,
          id: 4,
        },
      },
    ],
  },
  {
    telegram_id: 5605356111,
    id: 4,
    phone: "79881234567",
    is_paid: false,
    date: "2025-08-21T09:05:45.411632",
    address: "Улица Гагарина 5",
    total_price_cents: 7500,
    user_id: 4,
    status: "declined",
    user: {
      id: 4,
      phone: "79881234567",
      created_at: "2025-08-17T15:40:00.302029",
      name: "Timur",
      telegram_id: 5605356111,
    },
    items: [
      {
        product_id: 5,
        quantity: 1,
        line_total_cents: 5000,
        order_id: 4,
        id: 5,
        unit_price_cents: 5000,
        product: {
          name: "Сок апельсиновый",
          price_cents: 5000,
          id: 5,
        },
      },
      {
        product_id: 6,
        quantity: 5,
        line_total_cents: 2500,
        order_id: 4,
        id: 6,
        unit_price_cents: 500,
        product: {
          name: "Печенье овсяное",
          price_cents: 500,
          id: 6,
        },
      },
    ],
  },
  {
    telegram_id: 5605356111,
    id: 4,
    phone: "79881234567",
    is_paid: false,
    date: "2025-08-21T09:05:45.411632",
    address: "Улица Гагарина 5",
    total_price_cents: 7500,
    user_id: 4,
    status: "in_transit",
    user: {
      id: 4,
      phone: "79881234567",
      created_at: "2025-08-17T15:40:00.302029",
      name: "Timur",
      telegram_id: 5605356111,
    },
    items: [
      {
        product_id: 5,
        quantity: 1,
        line_total_cents: 5000,
        order_id: 4,
        id: 5,
        unit_price_cents: 5000,
        product: {
          name: "Сок апельсиновый",
          price_cents: 5000,
          id: 5,
        },
      },
      {
        product_id: 6,
        quantity: 5,
        line_total_cents: 2500,
        order_id: 4,
        id: 6,
        unit_price_cents: 500,
        product: {
          name: "Печенье овсяное",
          price_cents: 500,
          id: 6,
        },
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};

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

export const Orders: React.FC = () => {
  const {} = useTelegram();
  const { isLoading, getMyOrders } = useOrderStore();

  useEffect(() => {
    if (true) {
      getMyOrders(5605356109);
    }
  }, [true, getMyOrders]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 pb-2"
    >
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#352c2cd7] rounded-xl p-4 h-46 flex flex-col animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-600/40 rounded" />
                <div className="h-4 w-16 bg-gray-600/40 rounded" />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="h-3 w-20 bg-gray-600/40 rounded" />
                <div className="h-3 w-12 bg-gray-600/40 rounded" />
              </div>

              <div className="mt-2 h-3 w-40 bg-gray-600/40 rounded" />

              <div className="mt-2 space-y-2">
                <div className="h-3 w-32 bg-gray-600/40 rounded" />
                <div className="h-3 w-28 bg-gray-600/40 rounded" />
              </div>

              <div className="mt-auto h-3 w-20 bg-gray-600/40 rounded" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* {error && <p className="text-xs text-red-400 px-1">Ошибка: {error}</p>} */}

      {/* {!isLoading && !error && orders.length === 0 && (
        <p className="text-xs text-gray-400 px-1">Заказов пока нет</p>
      )} */}

      {fakeOrders.map((order) => (
        <motion.div
          key={order.id}
          variants={itemVariants}
          className="bg-[#352c2cd7] rounded-xl p-4 h-46 flex flex-col"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">
              Заказ №{order.id}
            </h3>
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
            <p className="font-semibold text-white">
              {order.total_price_cents}₽
            </p>
          </div>

          <p className="mt-1 text-xs text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
            📍 {order.address}
          </p>

          <div className="mt-2 flex-1 overflow-hidden">
            <div className="space-y-1 h-full overflow-auto pr-1">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm text-gray-200"
                >
                  <span className="truncate">
                    {item.product.name}{" "}
                    <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                  <span className="text-gray-400">
                    {item.line_total_cents}₽
                  </span>
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
      ))}
    </motion.div>
  );
};
