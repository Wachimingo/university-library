import React, { Suspense, useState, useEffect } from "react";
import { Main, Page, Section } from "../common";
import { BookCard } from "../common";
const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/books/")
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
          <BookCard book={book} />
        ))}
      </Section>
    </Page>
  );
};

export default Home;
