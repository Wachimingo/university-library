import { useEffect, Suspense } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { Home, Details } from "./pages";
import { Navbar } from "./pages/common";

function App() {
  // const navigate = usesNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const Layout = () => {
    return (
      <>
        <Navbar />
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
          <Route path='/details/:id' element={<Details />} />
        </Route>
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/*' element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
}

export default App;
