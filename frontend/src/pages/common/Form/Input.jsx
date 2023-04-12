import { Div } from "../containers";
import styles from "./form.module.css";

export const Input = ({ id, fieldName, action, value, ...props }) => {
  return (
    <Div column>
      <label htmlFor={id}>{fieldName}</label>
      <input
        className={styles["form-input"]}
        id={id}
        onChange={(e) =>
          action((prev) => {
            prev[id] = e.target.value;
            return prev;
          })
        }
        value={value}
        {...props}
      />
    </Div>
  );
};

export default Input;
