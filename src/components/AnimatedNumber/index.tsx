import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  color?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  color,
}) => {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest: number) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springVal]);

  return (
    <p className={`${color || "text-yellow-600"} font-bold`}>{displayValue}₽</p>
  );
};
