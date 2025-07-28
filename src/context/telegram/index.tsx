import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import TelegramWebApp from "@twa-dev/sdk";
import type { WebAppUserType } from "../../models/telegram";

export interface TelegramContextType {
  tg: typeof TelegramWebApp | null;
  user: WebAppUserType | null;
  platform: string | null;
  isMobile: boolean;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [tg, setTg] = useState<typeof TelegramWebApp | null>(null);
  const [user, setUser] = useState<WebAppUserType | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const webApp = TelegramWebApp;

    webApp.ready();
    webApp.expand();

    const init = webApp.initDataUnsafe;
    if (init?.user) {
      setUser(init.user);
    }

    const p = webApp.platform ?? null;
    setPlatform(p);
    setIsMobile(p === "android" || p === "ios");

    setTg(webApp);
  }, []);

  return (
    <TelegramContext.Provider value={{ tg, user, platform, isMobile }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const ctx = useContext(TelegramContext);
  if (!ctx) {
    throw new Error("useTelegram must be used within TelegramProvider");
  }
  return ctx;
};
