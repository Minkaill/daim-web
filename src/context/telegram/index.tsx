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
  haptics: {
    click: () => void; // лёгкий отклик на клик
    strong: () => void; // сильнее, для важных действий
    success: () => void; // уведомление “успех”
    error: () => void; // уведомление “ошибка”
    selection: () => void; // смена выбора/таба
  };
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

  const vibrate = (ms: number) => {
    try {
      (navigator as any)?.vibrate?.(ms);
    } catch {}
  };

  const haptics = {
    click: () => {
      WebApp.HapticFeedback?.impactOccurred?.("light");
      vibrate(10);
    },
    strong: () => {
      WebApp.HapticFeedback?.impactOccurred?.("heavy");
      vibrate(25);
    },
    success: () => {
      WebApp.HapticFeedback?.notificationOccurred?.("success");
      vibrate(20);
    },
    error: () => {
      WebApp.HapticFeedback?.notificationOccurred?.("error");
      vibrate(30);
    },
    selection: () => {
      WebApp.HapticFeedback?.selectionChanged?.();
      vibrate(8);
    },
  };

  return (
    <TelegramContext.Provider
      value={{ tg: WebApp, user, platform, isMobile, isFullscreen, haptics }}
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
