import type { IProduct } from "../../models/product";

interface CardProps {
  product: IProduct;
}

export const Card = ({ product }: CardProps) => {
  return (
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
  );
};
