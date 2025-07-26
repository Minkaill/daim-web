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
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [tg, setTg] = useState<typeof TelegramWebApp | null>(null);
  const [user, setUser] = useState<WebAppUserType | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const webApp = TelegramWebApp;

    if (webApp.ready) {
      webApp.ready();
    }

    webApp.expand();

    const initData = webApp.initDataUnsafe;
    if (initData && initData.user) {
      setUser(initData.user);
    }

    setTg(webApp);
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Authorization required</div>;
  }

  return (
    <TelegramContext.Provider value={{ tg, user }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error("useTelegram must be used within TelegramProvider");
  }
  return context;
};
