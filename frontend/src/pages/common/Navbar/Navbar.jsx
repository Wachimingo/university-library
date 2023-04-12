import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Div } from "../containers";
import { Switch } from "../themeSwitch";
import styles from "./navbar.module.css";
import { Users } from "../../admin/Users";

export const Navbar = ({ user, setUser }) => {
  const [match, setMatch] = useState(true);
  const [open, setIsOpen] = useState(true);
  const resizedWindow = (x) => {
    setIsOpen(x.matches);
    setMatch(x.matches);
  };
  useEffect(() => {
    const x = window.matchMedia("(min-width: 500px)");
    resizedWindow(x);
    x.addEventListener("change", resizedWindow);
  }, []);

  const AdminRoutes = () => {
    if (user.user_role === "student") {
      return <></>;
    }
    return (
      <>
        <li className={styles["item"]}>
          <Link to='/rentals'>Rentals</Link>
        </li>
        <li className={styles["item"]}>
          <Link to='/books'>Books</Link>
        </li>
        <li className={styles["item"]}>
          <Link to='/users'>Users</Link>
        </li>
      </>
    );
  };
  const SessionButton = () => {
    if (!user) {
      return (
        <Link style={{ paddingRight: "2vw" }} to='/login'>
          Login
        </Link>
      );
    }
    return (
      <a
        style={{ paddingRight: "2vw" }}
        onClick={() => {
          localStorage.clear();
          location.replace("/login");
        }}>
        Logout
      </a>
    );
  };
  return (
    <nav className={styles["nav"]}>
      <Div row space='between'>
        <Div space='between' fit className={`${styles[open ? "show" : "hide"]}`}>
          <ul className={`${styles["list"]} ${styles[match ? "row" : "column"]}`}>
            <li className={styles["item"]}>
              <Link to='/home'>Home</Link>
            </li>
            <li className={styles["item"]}>
              <Link to='/my-books'>My books</Link>
            </li>
            <AdminRoutes />
          </ul>
        </Div>
        <Div space='between' row fit className={styles["right"]}>
          <SessionButton />
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
