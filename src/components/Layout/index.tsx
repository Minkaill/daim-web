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
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight + 20);
    }
  }, []);

  return (
    <div
      className={`px-5 pb-5 ${isMobile ? "pt-26" : "pt-5"} w-full`}
      style={{ paddingBottom: navHeight }}
    >
      {children}

      {location.pathname !== "/cart" && <BottomNavigation ref={navRef} />}
    </div>
  );
};
