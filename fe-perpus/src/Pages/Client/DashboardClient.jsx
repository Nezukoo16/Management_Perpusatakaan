import React, { useEffect, useState } from "react";
import { Library, LogOut, Book, User, Menu, X } from "lucide-react";
import useBookStore from "../../Stores/BookStore";
import useReservationStore from "../../Stores/ReservationStore";
import useUserStore from "../../Stores/userStore";
import { useNavigate } from "react-router-dom";

// Komponen Navbar Dashboard
export const DashboardNavbar = ({ userName, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Library className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Perpustakaan Digital</h1>
              <p className="text-xs text-blue-100">Dashboard Client</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-white text-slate-800 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-blue-500">
            <div className="flex items-center space-x-2 mb-3">
              <User className="w-5 h-5" />
              <span className="font-medium">{userName}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Komponen Dialog Konfirmasi
export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Konfirmasi Peminjaman
        </h3>

        <div className="mb-6">
          <p className="text-gray-600 mb-3">
            Apakah Anda yakin ingin meminjam buku ini?
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800 mb-1">{book.title}</p>
            <p className="text-sm text-gray-600">Penulis: {book.author}</p>
            <p className="text-sm text-gray-600">Penerbit: {book.publisher}</p>
            <p className="text-sm text-gray-600">
              Tahun: {book.publication_year}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ya, Pinjam
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen Table Buku
export const BookTable = ({ books, onBorrowClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Judul Buku
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Penulis
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Penerbit
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tahun
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Stok
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book, index) => {
              const isAvailable = book.stock > 0;

              return (
                <tr key={book.book_id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-semibold text-gray-800">
                      {book.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {book.publisher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {book.publication_year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.stock} {isAvailable ? "Tersedia" : "Habis"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onBorrowClick(book)}
                      disabled={!isAvailable}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        isAvailable
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isAvailable ? "Pinjam" : "Tidak Tersedia"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Dashboard Client
export default function ClientDashboard() {
  const books = useBookStore((state) => state.books);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const addReservation = useReservationStore((state) => state.addReservation);
  const logout = useUserStore((state) => state.logout);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleBorrowClick = (book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const handleConfirmBorrow = () => {
    setIsDialogOpen(false);
    if (selectedBook) {
      addReservation({
        user_id: 0,
        book_id: selectedBook.book_id,
        reservation_date: "",
        status: "waiting",
      });
    }
    console.log(selectedBook);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (books.length == 0) fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar userName={""} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-2">
              <Book className="w-8 h-8 mr-3 text-blue-600" />
              Katalog Buku
            </h2>
            <p className="text-gray-600">
              Pilih buku yang ingin Anda pinjam dari koleksi perpustakaan kami
            </p>
          </div>
          <button
            className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg"
            onClick={() => navigate("/client/reservations")}
          >
            Daftar Reservasi
          </button>
        </div>

        {/* Book Table */}
        <BookTable books={books} onBorrowClick={handleBorrowClick} />
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmBorrow}
        book={selectedBook}
      />
    </div>
  );
}
