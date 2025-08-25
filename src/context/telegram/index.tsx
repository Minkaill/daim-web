import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
    click: () => void;
    strong: () => void;
    success: () => void;
    error: () => void;
    selection: () => void;
  };
}

const TelegramContext = createContext<TelegramContextType | null>(null);

const isMobilePlatform = (p?: string | null) => p === "ios" || p === "android";

type FullscreenChangeEvent = { is_fullscreen?: boolean };
type ViewportChangeEvent = { height?: number; is_state_stable?: boolean };

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<WebAppUserType | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const vibrate = (ms: number) => {
    try {
      (navigator as any)?.vibrate?.(ms);
    } catch {}
  };

  const haptics = useMemo(
    () => ({
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
    }),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      setLoading(false);
      return;
    }

    try {
      WebApp.ready();
      WebApp.expand();
    } catch {}

    const p = WebApp.platform ?? null;
    setPlatform(p);
    const mobile = isMobilePlatform(p);
    setIsMobile(mobile);

    try {
      if (mobile && (WebApp as any).requestFullscreen) {
        (WebApp as any).requestFullscreen();
        (WebApp as any).disableVerticalSwipes?.();
      }
    } catch {}

    const applyVH = () => {
      try {
        const vh = WebApp.viewportHeight;
        const vhs =
          (WebApp as any).viewportStableHeight ?? WebApp.viewportHeight;
        document.documentElement.style.setProperty("--tg-vh", `${vh}px`);
        document.documentElement.style.setProperty(
          "--tg-vh-stable",
          `${vhs}px`
        );
      } catch {}
    };

    applyVH();

    const onFsChange = (params: FullscreenChangeEvent) => {
      setIsFullscreen(Boolean(params?.is_fullscreen));
    };

    const onVpChange = (_: ViewportChangeEvent) => {
      applyVH();
    };

    try {
      WebApp.onEvent("fullscreenChanged", onFsChange as any);
      WebApp.onEvent("viewportChanged", onVpChange as any);
    } catch {}

    const initUser = WebApp.initDataUnsafe?.user ?? null;
    if (!initUser) {
      console.warn("No Telegram user data found in initDataUnsafe");
    }
    setUser(initUser);
    setLoading(false);

    return () => {
      try {
        WebApp.offEvent("fullscreenChanged", onFsChange as any);
        WebApp.offEvent("viewportChanged", onVpChange as any);
      } catch {}
    };
  }, []);

  if (!user && !loading) return <p>Запуск приложения только через Telegram</p>;

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
