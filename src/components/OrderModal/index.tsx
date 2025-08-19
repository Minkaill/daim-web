import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useOrderStore } from "../../lib/stores/order";
import { formatPhone } from "../../hooks/product";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const OrderModal = ({ open, onClose }: Props) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState<{ address: boolean; phone: boolean }>({
    address: false,
    phone: false,
  });

  const { createOrder, isPending, isSuccess, error } = useOrderStore();

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
    if (isSuccess) {
      setAddress("");
      setPhone("");
      onClose();
    }
  }, [isSuccess, onClose]);

  const phoneIsValid = /^(\+?\d[\d\s().-]{7,})$/.test(phone.trim());
  const addressIsValid = address.trim().length > 5;
  const formIsValid = phoneIsValid && addressIsValid;

  const onSubmit = async () => {
    setTouched({ address: true, phone: true });
    if (!formIsValid || isPending) return;

    const data = {
      address: address.trim(),
      phone: phone.trim(),
      telegram_id: 0,
      total_price_cents: 0,
      items: [],
    };

    await createOrder(data);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isPending) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !isPending) onClose();
    if ((e.key === "Enter" || e.key === "NumpadEnter") && !isPending)
      onSubmit();
  };

  const onPhoneChange = (v: string) => {
    if (!v.startsWith("+7")) {
      v = "+7 " + v.replace(/[^0-9]/g, "");
    }
    setPhone(formatPhone(v));
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
            className="relative w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-xl outline-none"
            {...variants.panel}
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute p-1 cursor-pointer bg-gray-500/40 hover:bg-gray-500/60 transition rounded-full top-3 right-3 disabled:opacity-50"
              onClick={onClose}
              disabled={isPending}
            >
              <X size={22} className="text-white" />
            </button>

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
                  className="w-full p-3 min-h-12 border border-transparent focus:border-blue-500 bg-gray-800 rounded-xl text-white focus:outline-none placeholder:text-gray-400"
                  placeholder="Город, улица, дом, квартира"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                  autoComplete="street-address"
                />
                <AnimatePresence>
                  {touched.address && !addressIsValid && (
                    <motion.p
                      className="mt-1 text-sm text-red-400"
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
                  className="w-full p-3 min-h-12 border border-transparent focus:border-blue-500 bg-gray-800 rounded-xl text-white focus:outline-none placeholder:text-gray-400"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  autoComplete="tel"
                />
                <AnimatePresence>
                  {touched.phone && !phoneIsValid && (
                    <motion.p
                      className="mt-1 text-sm text-red-400"
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
                    className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-sm"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    {String(error)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full mt-5">
              <motion.button
                onClick={onSubmit}
                type="button"
                role="button"
                disabled={!formIsValid || isPending}
                className="w-full bg-blue-500 disabled:bg-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-3 rounded-xl text-white font-bold transition"
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
                  ) : (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      Отправить заказ
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
