import { useEffect } from "react";
import { useTelegram } from "../../context/telegram";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const { tg } = useTelegram();

  useEffect(() => {
    if (!tg) return;
    const onBack = () => navigate(-1);

    tg.BackButton.show();
    tg.BackButton.onClick(onBack);

    return () => {
      tg.BackButton.offClick(onBack);
      tg.BackButton.hide();
    };
  }, [tg, navigate]);

  return <div>Cart</div>;
};
