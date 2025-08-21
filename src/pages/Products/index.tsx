import { useState } from "react";
import { Card } from "../../components/Card";
import { motion } from "motion/react";
import { ProductModal } from "../../components/ProductModal";
import type { IProduct } from "../../models/product";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const products = [
  {
    id: 1,
    title: "Смородина и слива",
    description:
      "Cостав: кофе средней обжарки, сок смородины и сливы, фруктоза",
    volume: "250мл",
    image: "/daim-2.jpg",
  },
  {
    id: 2,
    title: "Граната",
    description: "Состав: кофе средней обжарки, сок гранаты, фруктоза",
    volume: "250мл",
    image: "/daim.jpg",
  },
];

export const Products = () => {
  const [product, setProduct] = useState<IProduct | null>(null);

  const onSelectProduct = (product: IProduct) => {
    setProduct(product);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2"
      >
        <div className="bg-[#352c2cee] cursor-pointer w-full rounded-xl px-3 py-2 mb-1 flex items-center justify-between active:bg-[#241f1fc7] transition-all ease-in-out">
          <p className="text-xs">
            Daim Coffee{" "}
            <span className="text-yellow-600">(Правила использования)</span>
          </p>
          <img
            className="opacity-50 w-5 h-5"
            src="/question.svg"
            alt="question"
          />
        </div>

        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <Card
              key={product.id}
              onSelectProduct={onSelectProduct}
              product={product}
            />
          </motion.div>
        ))}
      </motion.div>

      <ProductModal
        open={!!product}
        product={product}
        onClose={() => setProduct(null)}
      />
    </>
  );
};
