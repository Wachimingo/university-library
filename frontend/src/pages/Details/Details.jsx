import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Main, Page, Section } from "../common";

const Details = () => {
  const { id } = useParams();
  const userId = 1;
  const [book, setBook] = useState({ author: "", title: "", img: "default.webp", genre: "", published_year: "", inventory_id: 0, stock: 0 });
  const [isBorrowed, setIsBorrowed] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data[0]))
      .catch((error) => console.log(error));
    fetch(`http://localhost:3001/rentals/user?user=${userId}&book=${id}`)
      .then((res) => res.json())
      .then((data) => setIsBorrowed(data))
      .catch((error) => console.log(error));
  }, []);

  const borrowBook = async () => {
    try {
      await fetch(`http://localhost:3001/rentals`, {
        method: "POST",
        body: JSON.stringify({
          inventory: book.inventory_id,
          user: userId ? userId : 1
        })
      });
      setBook((prev) => {
        return {
          author: prev.author,
          title: prev.title,
          img: prev.img,
          genre: prev.genre,
          published_year: prev.published_year,
          inventory_id: prev.inventory_id,
          stock: +prev.stock - 1
        };
      });
      setIsBorrowed(true);
    } catch (error) {
      console.log(error);
    }
  };
  const BurrowButton = () => {
    if (isBorrowed) return <h3>You have borrowed this book</h3>;
    if (book.stock < 1) return <h3>Out of Stock</h3>;
    return <Button onClick={borrowBook}>Borrow</Button>;
  };
  return (
    <Page>
      <Main>
        <h1>{book.title}</h1>
      </Main>
      <Section id='books'>
        <img src={`/${book.img}`} alt={book.title} loading='lazy' width={"250px"} height={"353px"} />
        <p>Published Year: {book.published_year}</p>
        <h3>In Stock: {book.stock}</h3>
      </Section>
      <Section row id='controls'>
        <BurrowButton />
      </Section>
    </Page>
  );
};

export default Details;
