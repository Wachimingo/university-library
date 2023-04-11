import styles from "./form.module.css";

type FormProps = {
  id?,
  children: React.ReactNode,
  onSubmit?: React.FormEventHandler,
  props?: any
};

export const Form = ({ children, ...props }: FormProps) => {
  return (
    <form className={styles["form"]} {...props}>
      {children}
      <input className={styles["submit-input"]} type='submit' />
    </form>
  );
};

export default Form;
