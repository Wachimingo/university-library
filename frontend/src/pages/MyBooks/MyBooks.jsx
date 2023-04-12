import React, { useState, useEffect } from "react";
import { Main, Page, Section } from "../common";
import { BookCard } from "../common";
const MyBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/rentals/user/my-books?user=${1}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  return (
    <Page>
      <Main>
        <h1>Books</h1>
      </Main>
      <Section row id='books'>
        {books.map((book) => (
          <BookCard key={book.title} book={book}>
            <p>Borrowed on: {book.rental_date}</p>
          </BookCard>
        ))}
      </Section>
    </Page>
  );
};

export default MyBooks;
