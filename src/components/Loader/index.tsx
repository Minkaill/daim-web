import cls from "./index.module.css";

type Props = {
  visible: boolean;
  progress: number;
  title?: string;
};

export const LoaderOverlay = ({
  visible,
  progress,
  title = "Daim Coffee",
}: Props) => {
  return (
    <div
      className={`${cls.wrapper} ${visible ? cls.show : cls.hide}`}
      aria-busy={visible}
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
