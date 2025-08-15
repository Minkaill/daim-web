import { Card } from "../../components/Card";
import { motion } from "motion/react";

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
      "Cостав: зерновой кофе средней обжарки, сок смородины и сливы, фруктоза",
    price: 350,
    discountPrice: 250,
    volume: "250мл",
    image: "/daim-2.jpg",
  },
  {
    id: 2,
    title: "Граната",
    description: "Состав: зерновой кофе средней обжарки, сок граната, фруктоза",
    price: 350,
    discountPrice: 250,
    volume: "250мл",
    image: "/daim.jpg",
  },
];

export const Products = () => {
  return (
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
          <Card product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};
