import React, { useState, useEffect } from "react";
import { Button, Main, Page, Section } from "../../common";
import "./rentals.css";

const Rentals = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/rentals`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  async function setAsReturned() {
    await fetch(`http://localhost:3001/rentals/${this.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        inventory: this.inventory_id
      })
    });
    const date = new Date();
    setBooks((prev) => {
      const newArr = prev.map((book) => {
        if (book.id === this.id) {
          book.return_date = date.toISOString().split("T")[0].toString();
          return book;
        }
        return book;
      });
      return newArr;
    });
  }
  return (
    <Page>
      <Main>
        <h1>Rented Books</h1>
      </Main>
      <Section row id='books'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Student</th>
              <th>Staff</th>
              <th>Rented on</th>
              <th>Returned on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.title}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.student}</td>
                <td>{book.staff}</td>
                <td>{book.rental_date}</td>
                <td>{book.return_date}</td>
                <td style={{ width: "125px" }}>
                  <Button onClick={setAsReturned.bind(book)}>Set as Returned</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </Page>
  );
};

export default Rentals;
