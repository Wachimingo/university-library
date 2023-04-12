import styles from "./form.module.css";

export const Form = ({ children, ...props }) => {
  return (
    <form className={styles["form"]} {...props}>
      {children}
      <input className={styles["submit-input"]} type='submit' />
    </form>
  );
};

export default Form;
