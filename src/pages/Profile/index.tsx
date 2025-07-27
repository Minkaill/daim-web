import { useCart } from "../../hooks/useCart";

const user = {
  id: 5605356109,
  first_name: "Minkail",
  last_name: "",
  username: "mklhdv",
  language_code: "ru",
  is_premium: true,
  photo_url:
    "https://t.me/i/userpic/320/twVtB1dsdPKDLWHaWTNOobb8WGeo-fI6nvIEG0rduwylNM6anhGBe0V7IPe382k7.svg",
};

export const Profile = () => {
  const { items, loading } = useCart();

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex bg-gray-900 rounded-lg flex-col items-center justify-center p-3">
        <div className="rounded-full overflow-hidden w-28">
          <img src={user.photo_url} alt={user.first_name} />
        </div>

        <div className="mt-3 flex items-center gap-1">
          <h4 className="text-lg">{user.first_name + user.last_name}</h4>
          <img className="w-4 h-4 mb-1" src="/premium.svg" alt="premium" />
        </div>

        <div className="w-full flex items-center justify-center">
          <div className=""></div>
        </div>
      </div>

      <div className="w-full flex bg-gray-900 rounded-lg gap-5 items-center justify-center p-3">
        <div className="bg-gray-800 w-1/2 p-2 rounded-lg flex flex-col items-center justify-center">
          <p className="mb-1.5">Кол-во покупок</p>
          <span className="text-yellow-600 font-bold">52</span>
        </div>

        <div className="bg-gray-800 w-1/2 p-2 rounded-lg flex flex-col items-center justify-center">
          <p className="mb-1.5">Скидка</p>
          <span className="text-yellow-600 font-bold">14%</span>
        </div>
      </div>

      <div className="w-full flex bg-gray-900 rounded-lg gap-5 items-center justify-center p-3">
        {loading ? (
          <p>Загрузка корзины...</p>
        ) : items.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <p>123</p>
        )}
      </div>
    </div>
  );
};
