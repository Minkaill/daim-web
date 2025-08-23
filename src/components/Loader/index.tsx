import cls from "./index.module.css";

type Props = {
  visible: boolean;
  progress: number;
  title?: string;
  backgroundImage?: string;
};

export const LoaderOverlay = ({
  visible,
  progress,
  title = "Daim Coffee",
  backgroundImage,
}: Props) => {
  return (
    <div
      className={`${cls.wrapper} ${visible ? cls.show : cls.hide}`}
      aria-busy={visible}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "rgba(0,0,0,0.4)",
              backgroundBlendMode: "darken",
            }
          : undefined
      }
    >
      <div className={cls.center}>
        <h1 className={cls.title}>{title}</h1>
        <div className={cls.bar}>
          <div
            className={cls.fill}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
