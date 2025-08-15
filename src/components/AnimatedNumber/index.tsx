import {
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  quantity?: number;
  color?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  color,
}) => {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState<number>(value);

  useEffect(() => {
    springVal.set(Number(value));
  }, [value, springVal]);

  useEffect(() => {
    const unsub = springVal.on("change", (latest: number) => {
      if (Number.isFinite(latest)) {
        setDisplayValue(Math.round(latest));
      }
    });
    return () => unsub();
  }, [springVal]);

  return (
    <div className="flex items-center gap-2">
      <p className={`${color || "text-yellow-600"} font-bold`}>
        {displayValue}₽
      </p>

      {/* <AnimatePresence>
        {quantity && quantity >= 20 && (
          <motion.span
            className="text-green-600 font-bold"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            (-28%)
          </motion.span>
        )}
      </AnimatePresence> */}
    </div>
  );
};
