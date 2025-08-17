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

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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
    prices: [
      { min: 20, max: 99, value: 250 },
      { min: 100, max: 499, value: 240 },
      { min: 500, max: 999, value: 220 },
      { min: 1000, max: 1999, value: 200 },
      { min: 2000, max: null, value: 180 },
    ],
  },
  {
    id: 2,
    title: "Граната",
    description: "Состав: кофе средней обжарки, сок гранаты, фруктоза",
    volume: "250мл",
    image: "/daim.jpg",
    prices: [
      { min: 1, max: 99, value: 250 },
      { min: 100, max: 499, value: 240 },
      { min: 500, max: 999, value: 220 },
      { min: 1000, max: 1999, value: 200 },
      { min: 2000, max: null, value: 180 },
    ],
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
        className="flex flex-col gap-3"
      >
        <motion.div
          variants={headerVariants}
          className="bg-gray-900 w-full rounded-xl p-3 mb-4 flex items-center justify-between active:bg-gray-800 transition-all ease-in-out"
        >
          <p>
            Daim Coffee{" "}
            <span className="text-xs text-yellow-600">
              (Правила использования)
            </span>
          </p>
          <img src="/question.svg" alt="question" />
        </motion.div>

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
