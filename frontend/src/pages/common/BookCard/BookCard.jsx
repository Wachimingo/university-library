import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../Card";

export const BookCard = ({ book, className, children }) => {
  const navigate = useNavigate();

  const openMovieDetails = () => {
    if (book.book_id || book.id) navigate(`/details/${book.book_id || book.id}`);
  };

  return (
    <Card onClick={openMovieDetails} className={className}>
      {children}
      <img style={{ padding: "1vw 2vh" }} src={`/${book.img}`} alt={book.title} loading='lazy' width={"250px"} height={"353px"} />
    </Card>
  );
};

export default BookCard;
