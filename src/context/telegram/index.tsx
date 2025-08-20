import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import WebApp from "@twa-dev/sdk";
import type { WebAppUserType } from "../../models/telegram";

export interface TelegramContextType {
  tg: typeof WebApp | null;
  user: WebAppUserType | null;
  platform: string | null;
  isMobile: boolean;
  isFullscreen: boolean;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

const isMobilePlatform = (p?: string | null) => p === "ios" || p === "android";

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<WebAppUserType | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand(); // на десктопе просто развернется, на мобиле — тянет шторку

    // платформа из SDK
    const p = WebApp.platform ?? null;
    setPlatform(p);
    const mobile = isMobilePlatform(p);
    setIsMobile(mobile);

    if (mobile && WebApp.requestFullscreen) {
      WebApp.requestFullscreen();
      WebApp.disableVerticalSwipes?.();
    }

    // следим за изменением fullscreen (типизируем params как any из-за сигнатур SDK)
    const onFsChange = (params: any) => {
      setIsFullscreen(!!params?.is_fullscreen);
    };
    WebApp.onEvent("fullscreenChanged", onFsChange);

    // держим актуальную высоту (и на мобиле, и на десктопе)
    const applyVH = () => {
      document.documentElement.style.setProperty(
        "--tg-vh",
        `${WebApp.viewportHeight}px`
      );
      document.documentElement.style.setProperty(
        "--tg-vh-stable",
        `${WebApp.viewportStableHeight}px`
      );
    };
    applyVH();
    const onVpChange = () => applyVH();
    WebApp.onEvent("viewportChanged", onVpChange);

    // юзер
    if (WebApp.initDataUnsafe?.user) setUser(WebApp.initDataUnsafe.user);

    return () => {
      WebApp.offEvent("fullscreenChanged", onFsChange as any);
      WebApp.offEvent("viewportChanged", onVpChange as any);
    };
  }, []);

  return (
    <TelegramContext.Provider
      value={{ tg: WebApp, user, platform, isMobile, isFullscreen }}
    >
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const ctx = useContext(TelegramContext);
  if (!ctx) throw new Error("useTelegram must be used within TelegramProvider");
  return ctx;
};
