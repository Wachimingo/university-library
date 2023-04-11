import styles from "./button.module.css";

const SUCCESS = "success";

export const Button = ({ children, success, info, error, warning, disable, ...props }) => {
  let type = SUCCESS;
  if (success) type = SUCCESS;
  if (info) type = "info";
  if (error) type = "error";
  if (warning) type = "warning";
  if (disable) type = "disable";

  return (
    <button className={`${styles.btn} ${styles[type]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;