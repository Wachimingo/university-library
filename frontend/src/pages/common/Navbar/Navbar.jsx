import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Div } from "../containers";
import { Switch } from "../themeSwitch";
import styles from "./navbar.module.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [match, setMatch] = useState(true);
  const [open, setIsOpen] = useState(true);

  const searchMovie = () => {
    if (query.trim() === "") return;
    navigate(`/search/${query.trim()}`);
  };
  const resizedWindow = (x) => {
    setIsOpen(x.matches);
    setMatch(x.matches);
  };
  useEffect(() => {
    const x = window.matchMedia("(min-width: 500px)");
    resizedWindow(x);
    x.addEventListener("change", resizedWindow);
  }, []);

  return (
    <nav className={styles["nav"]}>
      <Div row space='between'>
        <Div space='between' fit className={`${styles[open ? "show" : "hide"]}`}>
          <ul className={`${styles["list"]} ${styles[match ? "row" : "column"]}`}>
            <li className={styles["item"]}>
              <Link to='/home'>Home</Link>
            </li>
            <li className={`${styles["item"]} ${styles["search"]}`}>
              <svg fill='currentColor' className={styles["search-icon"]} onClick={() => searchMovie()} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
              </svg>
              <input
                className={styles["search-input"]}
                id='search'
                type='text'
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  return e.key === "Enter" ? searchMovie() : () => {};
                }}
              />
            </li>
            <li className={`${styles["item"]}`}></li>
          </ul>
        </Div>
        <Div space='between' row fit className={styles["right"]}>
          <Switch />
          <svg
            onClick={() => setIsOpen((prev) => !prev)}
            className={`${styles["hamburguer"]}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            fill='currentColor'>
            <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
          </svg>
        </Div>
      </Div>
    </nav>
  );
};
