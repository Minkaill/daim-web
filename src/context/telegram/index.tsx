import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import TelegramWebApp from "@twa-dev/sdk";

export interface WebAppInitData {
  query_id?: string;
  auth_date: number;
  hash: string;
  user?: WebAppUser & {
    added_to_attachment_menu?: boolean;
    allows_write_to_pm?: boolean;
  };
  receiver?: WebAppUser;
  start_param?: string;
  can_send_after?: number;
  chat?: WebAppChat;
  chat_type?: "sender" | "private" | "group" | "supergroup" | "channel";
  chat_instance?: string;
  signature: string;
}

export interface WebAppChat {
  id: number;
  type: "group" | "supergroup" | "channel";
  title: string;
  username?: string;
  photo_url?: string;
}

export interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramContextType {
  tg: typeof TelegramWebApp | null;
  user:
    | (WebAppUser & {
        added_to_attachment_menu?: boolean | undefined;
        allows_write_to_pm?: boolean | undefined;
      })
    | null;
}
const TelegramContext = createContext<TelegramContextType | null>(null);

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [tg, setTg] = useState<typeof TelegramWebApp | null>(null);
  const [user, setUser] = useState<
    | (WebAppUser & {
        added_to_attachment_menu?: boolean | undefined;
        allows_write_to_pm?: boolean | undefined;
      })
    | null
  >(null);
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
