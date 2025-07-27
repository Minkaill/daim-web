import { Card } from "../../components/Card";

export const Products = () => {
  const products = [
    {
      id: 1,
      title: "Смородина и слива",
      description:
        "Cостав: зерновой кофе средней обжарки, сок смородины и сливы, фруктоза",
      price: "350",
      volume: "250мл",
      image: "/daim.jpg",
    },
    {
      id: 2,
      title: "Граната",
      description:
        "Состав: зерновой кофе средней обжарки, сок граната, фруктоза",
      price: "280",
      volume: "250мл",
      image: "/daim.jpg",
    },
    {
      id: 3,
      title: "Брусника и малина",
      description:
        "Состав: зерновой кофе средней обжарки, сок брусники и малины, фруктоза",
      price: "240",
      volume: "250мл",
      image: "/daim.jpg",
    },
  ];

  return (
    <div>
      <div className="bg-gray-900 w-full rounded-lg p-3 mb-8 flex items-center justify-between active:bg-gray-800 transition-all 0.2 ease-in-out">
        <p>
          Daim Coffee{" "}
          <span className="text-xs text-yellow-600">
            (Правила использования)
          </span>
        </p>
        <img src="/question.svg" alt="question" />
      </div>

      <div className="w-full flex flex-col gap-4">
        {products.map((product) => (
          <Card product={product} />
        ))}
      </div>
    </div>
  );
};
