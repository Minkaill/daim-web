import { useEffect, useRef, useState, type ReactNode } from "react";
import { BottomNavigation } from "../BottomNavigation";
import { useLocation } from "react-router-dom";
import { useTelegram } from "../../context/telegram";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [navHeight, setNavHeight] = useState(0);

  const { isMobile } = useTelegram();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const update = () => {
      setNavHeight(el.offsetHeight + 20);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [isMobile]);

  return (
    <div
      className={`px-4 pb-4 ${isMobile ? "pt-26" : "pt-4"} w-full`}
      style={{ paddingBottom: navHeight }}
    >
      {children}

      {location.pathname !== "/cart" && <BottomNavigation ref={navRef} />}
    </div>
  );
};
