import { Div } from "../containers";
import styles from "./book.module.css";

export const Book = ({ book, children }) => {
  return (
    <Div className={`${styles["card"]}`}>
      <img src={`/${book.title}.webp`} alt={book.title} loading='lazy' width={"250px"} height={"353px"} />
      {children}
    </Div>
  );
};

export default Book;
