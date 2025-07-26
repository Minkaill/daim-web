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
    <div className="w-full flex flex-col gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gray-900 flex items-start opacity-85 w-full h-30 rounded-lg p-3 active:bg-gray-800 transition-all 0.2 ease-in-out"
        >
          <div className="w-20 flex-shrink-0 h-full rounded-lg overflow-hidden mr-4">
            <img
              className="w-full h-full object-cover object-[50%_70%]"
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="h-full flex flex-col justify-between">
            <h4 className="text-base text-white font-bold">{product.title}</h4>
            <p className="text-xs">{product.description}</p>
            <div className="flex items-center gap-4">
              <span>{product.price}₽</span>
              <span className="bg-yellow-600 p-1 text-xs rounded-lg">
                {product.volume}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
