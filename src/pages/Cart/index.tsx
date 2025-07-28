import { useEffect } from "react";
import { useTelegram } from "../../context/telegram";

export const Cart = () => {
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      tg.BackButton.show();
    }
  }, []);

  return <div>Cart</div>;
};
