import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useOrderStore } from "../../lib/stores/order";
import { formatPhone } from "../../hooks/product";
import { useTelegram } from "../../context/telegram";
import { useCartStore } from "../../lib/stores/cart";
import type { OrderBody } from "../../lib/services/order/index.types";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  totalPrice: number;
  onClose: () => void;
}

export const OrderModal = ({ open, totalPrice, onClose }: Props) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState<{ address: boolean; phone: boolean }>({
    address: false,
    phone: false,
  });

  const { createOrder, setIsSuccess, isPending, isSuccess, error } =
    useOrderStore();
  const { items, clearAll } = useCartStore();
  const { user, haptics } = useTelegram();

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) setIsSuccess(false);
  }, [open]);

  useEffect(() => {
    return () => setIsSuccess(false);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      haptics.success();
    }
  }, [isSuccess]);

  const phoneIsValid = /^(\+?\d[\d\s().-]{7,})$/.test(phone.trim());
  const addressIsValid = address.trim().length > 5;
  const formIsValid = phoneIsValid && addressIsValid;

  const normalizePhone = (raw: string) => raw.replace(/\D/g, "");

  const cartItems = items.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  const onCloseModal = () => {
    setAddress("");
    setPhone("");
    setTouched({ address: false, phone: false });
    if (isSuccess) {
      clearAll();
    }
    setIsSuccess(false);
    onClose();
  };

  const onSubmit = async () => {
    if (isSuccess) {
      clearAll();
      onCloseModal();
      return;
    }
    if (isPending) return;
    setTouched({ address: true, phone: true });

    const phoneDigits = normalizePhone(phone);
    const addressOk = address.trim().length >= 6;
    const phoneOk = phoneDigits.length >= 10;
    const itemsOk = cartItems.length > 0;
    const totalOk = totalPrice > 0;
    const userOk = !!user?.id && !!user;

    if (!addressOk || !phoneOk || !itemsOk || !totalOk) {
      toast.error("Проверьте данные формы");
      return;
    }

    if (!userOk) {
      toast.error("Не удалось определить пользователя");
      return;
    }

    const data: OrderBody = {
      address: address.trim(),
      phone: phoneDigits,
      telegram_id: user.id,
      total_price_cents: totalPrice,
      items: cartItems,
    };

    try {
      await createOrder(data);
    } catch (e: any) {
      toast.error("Ошибка при создании заказа");
      console.error(e);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isPending) onCloseModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !isPending) onCloseModal();
    if ((e.key === "Enter" || e.key === "NumpadEnter") && !isPending)
      onSubmit();
  };

  const onPhoneChange = (v: string) => {
    const digits = v.replace(/\D/g, "");
    const normalized = digits.startsWith("7") ? digits : "7" + digits;
    setPhone(formatPhone("+ " + normalized)); // или твоя логика
  };

  const variants = {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    panel: {
      initial: { y: -40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 40, opacity: 0 },
    },
  } as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          {...variants.backdrop}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            ref={dialogRef}
            className="relative w-full max-w-md bg-[#352c2cee] rounded-2xl p-6 shadow-xl outline-none"
            {...variants.panel}
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute p-1 cursor-pointer bg-gray-500/40 hover:bg-gray-500/60 transition rounded-full top-3 right-3 disabled:opacity-50"
              onClick={onCloseModal}
              disabled={isPending}
            >
              <X size={22} className="text-white" />
            </button>

            {!isSuccess ? (
              <div className="flex flex-col gap-4">
                <header className="mb-1">
                  <h2 id={titleId} className="text-lg font-bold">
                    Оформление заказа
                  </h2>
                  <p id={descId} className="text-sm text-gray-300">
                    Введите адрес и номер телефона для связи.
                  </p>
                </header>

                <div>
                  <label
                    htmlFor="order-address"
                    className="text-base font-semibold mb-2 inline-block"
                  >
                    Адрес доставки
                  </label>
                  <input
                    id="order-address"
                    type="text"
                    className="w-full p-3 min-h-12 border border-transparent bg-[#241f1fc7] rounded-xl text-white focus:outline-none placeholder:text-gray-400"
                    placeholder="Город, улица, дом, квартира"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                    autoComplete="street-address"
                  />
                  <AnimatePresence>
                    {touched.address && !addressIsValid && (
                      <motion.p
                        className="mt-1 text-xs text-red-400"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        Пожалуйста, укажите более точный адрес (не короче 6
                        символов).
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label
                    htmlFor="order-phone"
                    className="text-base font-semibold mb-2 inline-block"
                  >
                    Номер телефона
                  </label>
                  <input
                    id="order-phone"
                    type="tel"
                    inputMode="tel"
                    className="w-full p-3 min-h-12 border border-transparent bg-[#241f1fc7] rounded-xl text-white focus:outline-none placeholder:text-gray-400"
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    autoComplete="tel"
                  />
                  <AnimatePresence>
                    {touched.phone && !phoneIsValid && (
                      <motion.p
                        className="mt-1 text-xs text-red-400"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        Введите корректный номер телефона (разрешены +, пробелы,
                        скобки, тире).
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="rounded-xl text-xs bg-red-500/10 border border-red-500/30 p-3 text-red-300"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      Ошибка при отправке заказа. Попробуйте снова или
                      обратитесь в поддержку
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex mt-5 flex-col items-center justify-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 shadow-md">
                <motion.p
                  className="text-green-400 font-semibold text-center text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Заказ успешно оформлен 🎉
                </motion.p>
              </div>
            )}

            <div className="w-full mt-5">
              <motion.button
                onClick={onSubmit}
                type="button"
                role="button"
                disabled={!isSuccess && (!formIsValid || isPending)}
                className="w-full bg-[#4B2E2A] disabled:bg-[#C69C72]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-3 rounded-xl text-white font-bold transition"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isPending ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex items-center gap-2"
                    >
                      <span
                        className="h-5 w-5 inline-block animate-spin rounded-full border-2 border-white/70 border-t-transparent"
                        aria-hidden
                      />
                      Отправка...
                    </motion.span>
                  ) : !isSuccess ? (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      Отправить заказ
                    </motion.span>
                  ) : (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      Вернуться
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
