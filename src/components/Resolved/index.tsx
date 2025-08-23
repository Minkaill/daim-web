import { useEffect } from "react";

export const OnResolved = ({ onReady }: { onReady: () => void }) => {
  useEffect(() => {
    onReady();
  }, []);
  
  return null;
};
