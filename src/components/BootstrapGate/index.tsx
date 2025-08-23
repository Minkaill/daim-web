import { useEffect, useRef, useState } from "react";
import { LoaderOverlay } from "../Loader";

type BootstrapGateProps = {
  children: React.ReactNode;
  firstDurationMs?: number;
  nextDurationMs?: number;
  backgroundImage?: string;
};

export const BootstrapGate: React.FC<BootstrapGateProps> = ({
  children,
  firstDurationMs = 2000,
  nextDurationMs = 500,
  backgroundImage = "/preview.png",
}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const durationMs =
    sessionStorage.getItem("app_already_opened") === "true"
      ? nextDurationMs
      : firstDurationMs;

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [backgroundImage]);

  useEffect(() => {
    if (!imageLoaded) return;

    const step = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);

      if (elapsed < durationMs) {
        timerRef.current = requestAnimationFrame(step);
      } else {
        setTimeout(() => setVisible(false), 150);
        sessionStorage.setItem("app_already_opened", "true");
      }
    };

    timerRef.current = requestAnimationFrame(step);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [durationMs, imageLoaded]);

  return (
    <>
      {!imageLoaded && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
          }}
        />
      )}

      <LoaderOverlay
        visible={visible}
        progress={progress}
        backgroundImage={backgroundImage}
        title="Daim Coffee"
      />

      {children}
    </>
  );
};
