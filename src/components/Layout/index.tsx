import type { ReactNode } from "react";
import { BottomNavigation } from "../BottomNavigation";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="p-5 w-full">
      {children}

      <BottomNavigation />
    </div>
  );
};
