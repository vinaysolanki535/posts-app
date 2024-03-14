import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <nav className=" sticky top-0 z-[9999]">
        <h1>Create Posts</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
