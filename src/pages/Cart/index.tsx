import { useEffect } from "react";
import { useTelegram } from "../../context/telegram";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();

  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate(-1));
    }
  }, []);

  return <div>Cart</div>;
};
