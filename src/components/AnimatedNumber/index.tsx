import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
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

  return <p className="text-yellow-600 font-bold">{displayValue}₽</p>;
};
