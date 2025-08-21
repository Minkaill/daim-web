import { useEffect } from "react";
import { motion } from "motion/react";
import type { IOrder } from "../../models/order";
import { useTelegram } from "../../context/telegram";
import { useOrderStore } from "../../lib/stores/order";
import { OrderSkeleton } from "../../components/OrderSkeleton";
import { OrderCard } from "../../components/OrderCard";

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
      {isLoading && <OrderSkeleton />}

      {/* {error && <p className="text-xs text-red-400 px-1">Ошибка: {error}</p>} */}

      {/* {!isLoading && !error && orders.length === 0 && (
        <p className="text-xs text-gray-400 px-1">Заказов пока нет</p>
      )} */}

      {fakeOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </motion.div>
  );
};
