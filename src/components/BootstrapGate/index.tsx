import { useEffect, useRef, useState } from "react";
import { LoaderOverlay } from "../Loader";

type BootstrapGateProps = {
  children: (notifyReady: () => void) => React.ReactNode;
  /** автоматически ждать загрузки изображений внутри контейнера */
  autoWaitForImages?: boolean;
  /** селектор корневого контейнера, внутри которого ищем изображения */
  rootSelector?: string; // напр. "#root" или "main"
  /** дополнительные промисы (данные и т.п.), которые тоже нужно дождаться */
  extraPromises?: Promise<unknown>[];
};

async function waitForImagesInRoot(root: ParentNode): Promise<void> {
  const imgs = Array.from(root.querySelectorAll("img")) as HTMLImageElement[];

  // собрать background-image:url(...) у всех элементов
  const allEls = Array.from(root.querySelectorAll<HTMLElement>("*"));
  const bgUrls = new Set<string>();
  for (const el of allEls) {
    const bg = getComputedStyle(el).backgroundImage;
    // может быть что-то вроде: url("..."), url(a), linear-gradient(...)
    const urls = [...bg.matchAll(/url\((['"]?)(.*?)\1\)/g)]
      .map((m) => m[2])
      .filter(Boolean);
    urls.forEach((u) => bgUrls.add(u));
  }

  // промисы по <img>
  const imgPromises = imgs.map((img) => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    // img.decode предпочтительнее (не триггерит перерисовки)
    if ("decode" in img) {
      // @ts-ignore
      return img.decode().catch(() => {});
    }
    return new Promise<void>((res) => {
      const done = () => res();
      // @ts-ignore
      img.addEventListener("load", done, { once: true });
      // @ts-ignore
      img.addEventListener("error", done, { once: true });
    });
  });

  // промисы по background-image
  const bgPromises = Array.from(bgUrls).map((src) => {
    return new Promise<void>((res) => {
      const im = new Image();
      im.onload = () => res();
      im.onerror = () => res();
      im.src = src;
    });
  });

  await Promise.all([...imgPromises, ...bgPromises]);
}

export const BootstrapGate: React.FC<BootstrapGateProps> = ({
  children,
  autoWaitForImages = true,
  rootSelector = "body",
  extraPromises = [],
}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const resolvedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      if (!resolvedRef.current) {
        // медленно тянем до 95%, остальное — когда реально готовы
        p += Math.max(0.2, (95 - p) * 0.03);
        setProgress(Math.min(95, p));
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const finish = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    setProgress(100);
    // небольшая пауза для приятного «дотягивания»
    setTimeout(() => setVisible(false), 450);
  };

  const notifyReady = () => {
    // позволяем дочерним компонентам вручную сигналить «данные готовы»,
    // но скрывать лоадер будем только после загрузки картинок (если autoWaitForImages=true)
    if (!autoWaitForImages) return finish();

    const root = document.querySelector(rootSelector) ?? document.body;
    waitForImagesInRoot(root).then(finish);
  };

  // если вы хотите, чтобы вообще без участия детей всё само
  // спряталось после картинок + extraPromises:
  useEffect(() => {
    if (!autoWaitForImages) return;
    let cancelled = false;

    (async () => {
      const root = document.querySelector(rootSelector) ?? document.body;
      await Promise.all([waitForImagesInRoot(root), ...extraPromises]);
      if (!cancelled) finish();
    })();

    return () => {
      cancelled = true;
    };
  }, []); // запускаем единожды на монтировании

  return (
    <>
      <LoaderOverlay visible={visible} progress={progress} />
      {children(notifyReady)}
    </>
  );
};
