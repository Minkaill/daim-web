import { useEffect, useRef, useState } from "react";
import { LoaderOverlay } from "../Loader";

type BootstrapGateProps = {
  children: (notifyReady: () => void) => React.ReactNode;
};

export const BootstrapGate: React.FC<BootstrapGateProps> = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const resolvedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      if (!resolvedRef.current) {
        p += Math.max(0.2, (85 - p) * 0.03);
        setProgress(Math.min(85, p));
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const notifyReady = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    setProgress(100);
    setTimeout(() => setVisible(false), 450);
  };

  return (
    <>
      <LoaderOverlay visible={visible} progress={progress} />
      {children(notifyReady)}
    </>
  );
};
