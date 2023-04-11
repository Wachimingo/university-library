import { useState, useEffect } from "react";
import styles from "./switch.module.scss";

export const Switch = () => {
  const [active, setActive] = useState(localStorage.getItem("theme") !== null && localStorage.getItem("theme") !== "light");

  const switchThemeHandler = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("theme", active ? "dark" : "light");
    document.documentElement.className = active ? "dark" : "light";
  }, [active]);

  const isActive = active ? "notch-on" : "notch-off";

  return (
    <div className={styles["toggle-wrapper"]} onClick={() => switchThemeHandler()}>
      <div className={`${styles[isActive]}`}></div>
    </div>
  );
};

export default Switch;
