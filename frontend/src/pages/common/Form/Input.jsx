import { Div } from "../containers";
import styles from "./form.module.css";

type InputProps = {
  id?,
  type?,
  fieldName?,
  action: Function,
  value?,
  required?: boolean,
  min?,
  props?: any
};

export const Input = ({ id, fieldName, action, value, ...props }: InputProps) => {
  return (
    <Div column>
      <label htmlFor={id}>{fieldName}</label>
      <input className={styles["form-input"]} id={id} onChange={(e) => action(e.target.value)} {...props} />
    </Div>
  );
};

export default Input;
