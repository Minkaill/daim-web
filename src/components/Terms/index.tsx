import { useState } from "react";

export default function TermsOfUseDaimCoffee() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-xl bg-yellow-600 text-white shadow hover:bg-yellow-500 transition"
      >
        Правила использования
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Правила использования — Daim Coffee
                </h2>
                <p className="text-sm text-gray-500">
                  Действует для розничных точек и онлайн-заказов холодных
                  напитков (включая cold brew).
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Кратко</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Оформляя заказ, вы соглашаетесь с этими правилами.</li>
                  <li>
                    Ассортимент и цены могут меняться; актуальное — на сайте/в
                    приложении/в точке.
                  </li>
                  <li>Оплата: наличные, карта, онлайн-сервисы.</li>
                  <li>
                    Самовывоз или доставка (если доступно в вашем регионе).
                  </li>
                  <li>Есть программа лояльности с накоплением бонусов.</li>
                  <li>По качеству и возвратам обращайтесь в день покупки.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">1. Общие положения</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Настоящие правила регулируют порядок покупки и потребления
                    напитков сети Daim Coffee.
                  </li>
                  <li>
                    Оформляя заказ, клиент подтверждает согласие с правилами.
                  </li>
                  <li>
                    Daim Coffee специализируется на холодных напитках (включая
                    cold brew) в розничных точках и онлайн.
                  </li>
                </ol>
              </div>
            </div>

            <div className="p-4 border-t text-xs text-gray-500">
              Последнее обновление: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
