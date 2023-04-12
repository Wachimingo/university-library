import React, { useState, useEffect } from "react";
import { Div, Main, Page, Section } from "../common";
import { BookCard } from "../common";
import "./home.module.css";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/books/")
      .then((res) => res.json())
      .then((data) => {
        data.sort(function (a, b) {
          return -(a.id - b.id);
        });
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  useEffect(() => {
    let filter = [];
    if (title !== "") {
      filter = filteredBooks.filter((book) => {
        if (book.title.toLowerCase().includes(title.trim().toLowerCase())) return book;
      });
    }
    setFilteredBooks(() => {
      if (title !== "") {
        return filter;
      }
      return books;
    });
  }, [title]);

  useEffect(() => {
    let filter = [];
    if (author !== "") {
      filter = filteredBooks.filter((book) => {
        if (book.author.toLowerCase().includes(author.trim().toLowerCase())) return book;
      });
    }
    setFilteredBooks(() => {
      if (author !== "") {
        return filter;
      }
      return books;
    });
  }, [author]);

  useEffect(() => {
    let filter = [];
    if (genre !== "") {
      filter = filteredBooks.filter((book) => {
        if (book.genre.toLowerCase().includes(genre.trim().toLowerCase())) return book;
      });
    }
    setFilteredBooks(() => {
      if (genre !== "") {
        return filter;
      }
      return books;
    });
  }, [genre]);

  return (
    <Page>
      <Main>
        <h1>Books</h1>
      </Main>
      <Section column id='filters'>
        <h4>Filter by:</h4>
        <Div row>
          <div>
            <label htmlFor='title'>Title</label>
            <input id='title' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor='author'>Author</label>
            <input id='author' onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <label htmlFor='genre'>Genre</label>
            <input id='genre' onChange={(e) => setGenre(e.target.value)} />
          </div>
        </Div>
      </Section>
      <br />
      <Section row id='books'>
        {filteredBooks.map((book) => (
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
