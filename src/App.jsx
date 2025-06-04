import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import BookEdit from "./pages/admin/books/edit";
import AuthorEdit from "./pages/admin/authors/edit";
import GenreEdit from "./pages/admin/genres/edit";
import BookShow from "./pages/public/books/show";
import AuthorShow from "./pages/public/authors/show";
import GenreShow from "./pages/public/genres/show";
import Authors from "./pages/public/authors";
import Genres from "./pages/public/genres";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />

            {/* Books */}
            <Route path="books">
              <Route index element={<Books />} />
              <Route path="show/:id" element={<BookShow />} />
            </Route>

            {/* Authors */}
            <Route path="authors">
              <Route index element={<Authors />} />
              <Route path="show/:id" element={<AuthorShow />} />
            </Route>
            
            {/* Genres */}
            <Route path="genres">
              <Route index element={<Genres />} />
              <Route path="show/:id" element={<GenreShow />} />
            </Route>
          </Route>


          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin */}
          <Route path="admin" element={<AdminLayout />} >
            <Route index element={<Dashboard />} />

            {/* Books */}
            <Route path="books"  >
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BookCreate/>} />
              <Route path="edit/:id" element={<BookEdit/>} />
            </Route>

            {/* Authors */}
            <Route path="authors"  >
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorCreate/>} />
              <Route path="edit/:id" element={<AuthorEdit/>} />
            </Route>

            {/* Genres */}
            <Route path="genres"  >
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate/>} />
              <Route path="edit/:id" element={<GenreEdit/>} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
