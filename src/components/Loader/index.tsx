import cs from "./index.module.css";

export const Loader = () => {
  return (
    <div className={cs.wrapper}>
      <span className={cs.loader}></span>
    </div>
  );
};
