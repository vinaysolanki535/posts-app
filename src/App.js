import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const Logout = () => {
    useEffect(() => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }, []);

    return null;
  };

  return (
    <BrowserRouter>
      <nav className=" sticky top-0 z-[9999]">
        <h1>Create Posts</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Posts</Link>
        {loggedIn ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={loggedIn ? <Create /> : <Navigate to="/login" />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/:id"
          element={loggedIn ? <Update /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!loggedIn ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
