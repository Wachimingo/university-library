import { useEffect, Suspense, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { Home, Details, Rentals, MyBooks, Books, Users, Login } from "./pages";
import { Navbar } from "./pages/common";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const Layout = () => {
    return (
      <>
        <Navbar user={user} setUser={setUser} />
        <Outlet />
      </>
    );
  };
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/details/:id' element={<Details user={user} />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/books' element={<Books />} />
          <Route path='/users' element={<Users />} />
          <Route path='/my-books' element={<MyBooks user={user} />} />
        </Route>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/*' element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
}

export default App;
