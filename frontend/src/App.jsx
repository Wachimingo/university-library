import { useEffect, Suspense } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
// import { Details, Favorites, Home, Login, NotFound, Search } from "./pages";
import { Loading, Navbar } from "./pages/common";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/search/:query' element={<Search />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
