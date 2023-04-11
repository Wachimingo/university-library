import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../Card";
import { Book } from "../Book";

export const BookCard = ({ book, className, children }) => {
  const navigate = useNavigate();

  const openMovieDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <Card onClick={() => openMovieDetails(book.id)} className={className}>
      {children}
      <Book book={book} />
    </Card>
  );
};

export default BookCard;
