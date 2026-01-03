import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import ClientAuth from "./Pages/Client/ClientAuth";
import NotFound from "./Pages/NotFound";
import AdminLogin from "./Pages/Admin/AdminAuth";
import AdminSidebar from "./Components/Admin/AdminSidebar";
import AdminDashboard from "./Pages/Admin/DashboardAdmin";
import BooksAdmin from "./Pages/Admin/Books/BooksAdmin";
import BookForm from "./Pages/Admin/Books/BookForm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Admin */}
        <Route path="/admin/auth" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminSidebar>
              <AdminDashboard />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/books"
          element={
            <AdminSidebar>
              <BooksAdmin />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/books/add"
          element={
            <AdminSidebar>
              <BookForm />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/books/update/:id"
          element={
            <AdminSidebar>
              <BookForm />
            </AdminSidebar>
          }
        />
        {/* Client */}
        <Route path="/client/auth" element={<ClientAuth />} />
        {/* Not Found Handler */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>
);
