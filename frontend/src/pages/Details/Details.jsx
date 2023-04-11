import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Main, Page, Section } from "../common";
import { Book } from "../common";

const Details = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ author: "", title: "", genre: "", published_year: "", stock: 0 });
  const [stock, setStock] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data[0]));
    fetch(`http://localhost:3001/inventory/book/${id}`)
      .then((res) => res.json())
      .then((data) => setStock(data[0].stock));
  }, []);
  return (
    <Page>
      <Main>
        <h1>{book.title}</h1>
      </Main>
      <Section id='books'>
        <Book book={book} />
        <p>Published Year: {book.published_year}</p>
        <h3>In Stock: {stock}</h3>
      </Section>
    </Page>
  );
};

export default Details;
