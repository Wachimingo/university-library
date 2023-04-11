import { Div } from "../containers";
import { P } from "../p";
import styles from "./book.module.css";

export const Book = ({ book, children }) => {
  return (
    <Div>
      {book.title && <h1>{book.title}</h1>}
      {/* {book.poster_path && <img src={imageBaseUrl + "/w185" + book.poster_path} alt={book.title} loading='lazy' />} */}
      <Div className={styles["card-body"]}>
        {book.release_date && <P>Realesed in: {book.release_date}</P>}
        {book.overview && <P>{book.overview}</P>}
        {book.vote_average && <P>Stars: {parseFloat(book.vote_average).toFixed(1)}/10</P>}
      </Div>
      {children}
    </Div>
  );
};

export default Book;
