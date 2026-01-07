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
import CategoryForm from "./Pages/Admin/Categories/CategoryForm";
import CategoryAdmin from "./Pages/Admin/Categories/CategoryAdmin";
import UserAdmin from "./Pages/Admin/Users/UserAdmin";
import UserForm from "./Pages/Admin/Users/UserForm";
import ReservationAdmin from "./Pages/Admin/Reservations/ReservationAdmin";
import ReservationForm from "./Pages/Admin/Reservations/ReservationForm";
import TransactionAdmin from "./Pages/Admin/Transactions/TransactionAdmin";
import TransactionForm from "./Pages/Admin/Transactions/TransactionForm";
import LogAdmin from "./Pages/Admin/Logs/LogAdmin";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Admin */}
        <Route path="/admin/auth" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminSidebar>
              <AdminDashboard />
            </AdminSidebar>
          }
        />
        {/* BOOKS ROUTES */}
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
        {/* CATEGORIES ROUTES */}
        <Route
          path="/admin/categories"
          element={
            <AdminSidebar>
              <CategoryAdmin />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/categories/add"
          element={
            <AdminSidebar>
              <CategoryForm />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/categories/update/:id"
          element={
            <AdminSidebar>
              <CategoryForm />
            </AdminSidebar>
          }
        />
        {/* USERS ROUTES */}
        <Route
          path="/admin/users"
          element={
            <AdminSidebar>
              <UserAdmin />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/users/add"
          element={
            <AdminSidebar>
              <UserForm />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/users/update/:id"
          element={
            <AdminSidebar>
              <UserForm />
            </AdminSidebar>
          }
        />
        {/* RESERVATIONS ROUTES */}
        <Route
          path="/admin/reservations"
          element={
            <AdminSidebar>
              <ReservationAdmin />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/reservations/add"
          element={
            <AdminSidebar>
              <ReservationForm />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/reservations/update/:id"
          element={
            <AdminSidebar>
              <ReservationForm />
            </AdminSidebar>
          }
        />
        {/* TRANSACTIONS ROUTES */}
        <Route
          path="/admin/transactions"
          element={
            <AdminSidebar>
              <TransactionAdmin />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/transactions/add"
          element={
            <AdminSidebar>
              <TransactionForm />
            </AdminSidebar>
          }
        />
        <Route
          path="/admin/transactions/update/:id"
          element={
            <AdminSidebar>
              <TransactionForm />
            </AdminSidebar>
          }
        />
        {/* LOGS ROUTES */}
        <Route
          path="/admin/logs"
          element={
            <AdminSidebar>
              <LogAdmin />
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
