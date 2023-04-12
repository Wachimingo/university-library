import React, { useState, useEffect } from "react";
import { Main, Page, Section } from "../common";
import { BookCard } from "../common";
const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/books/")
      .then((res) => res.json())
      .then((data) => {
        data.sort(function (a, b) {
          return -(a.id - b.id);
        });
        setBooks(data);
      });
  }, []);
  return (
    <Page>
      <Main>
        <h1>Books</h1>
      </Main>
      <Section row id='books'>
        {books.map((book) => (
          <BookCard key={book.title} book={book}>
            <div style={{ width: "80%" }}>
              <p style={{ fontSize: "0.78rem" }}>{book.title}</p>
            </div>
          </BookCard>
        ))}
      </Section>
    </Page>
  );
};

export default Home;
