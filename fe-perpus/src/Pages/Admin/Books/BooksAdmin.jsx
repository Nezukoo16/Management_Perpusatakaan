import { useState, useEffect } from "react";
import DataTable from "../../../Components/DataTable";
// import useBooksStore from '../stores/useBooksStore';

function BooksAdmin() {
  // Uncomment ini setelah setup Zustand store
  // const { books, isLoading, error, fetchBooks, deleteBook } = useBooksStore();

  // State dummy sementara - hapus setelah connect ke Zustand
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Pemrograman Web dengan React",
      author: "John Doe",
      publisher: "Tech Publisher",
      year: 2023,
      isbn: "978-1234567890",
      category: "Programming",
      stock: 5,
      status: "Tersedia",
    },
    {
      id: 2,
      title: "Database Design dan Implementasi",
      author: "Jane Smith",
      publisher: "Data Press",
      year: 2022,
      isbn: "978-0987654321",
      category: "Database",
      stock: 3,
      status: "Tersedia",
    },
    {
      id: 3,
      title: "React Fundamentals for Beginners",
      author: "Bob Wilson",
      publisher: "Learn Co",
      year: 2024,
      isbn: "978-1122334455",
      category: "Programming",
      stock: 0,
      status: "Habis",
    },
    {
      id: 4,
      title: "Node.js Advanced Concepts",
      author: "Alice Brown",
      publisher: "Backend Books",
      year: 2023,
      isbn: "978-5544332211",
      category: "Programming",
      stock: 7,
      status: "Tersedia",
    },
    {
      id: 5,
      title: "Python Data Science Handbook",
      author: "Charlie Davis",
      publisher: "Science Press",
      year: 2022,
      isbn: "978-6677889900",
      category: "Data Science",
      stock: 2,
      status: "Tersedia",
    },
  ]);
  const isLoading = false;
  const error = null;

  useEffect(() => {
    // Uncomment ini setelah setup Zustand store
    // fetchBooks();
  }, []);

  // Definisi kolom untuk table
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "title",
      label: "Judul Buku",
    },
    {
      key: "author",
      label: "Penulis",
    },
    {
      key: "publisher",
      label: "Penerbit",
    },
    {
      key: "year",
      label: "Tahun",
    },
    {
      key: "isbn",
      label: "ISBN",
    },
    {
      key: "category",
      label: "Kategori",
    },
    {
      key: "stock",
      label: "Stok",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value > 5
              ? "bg-green-100 text-green-800"
              : value > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Tersedia"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // Handler untuk tombol tambah
  const handleAdd = () => {
    console.log("Tambah buku baru");
    alert("Membuka form tambah buku");
    // Nanti bisa redirect ke form atau buka modal
    // navigate('/admin/books/add');
  };

  // Handler untuk tombol view
  const handleView = (book) => {
    console.log("View book:", book);
    alert(`Melihat detail buku: ${book.title}`);
    // Nanti bisa redirect ke detail atau buka modal
    // navigate(`/admin/books/${book.id}`);
  };

  // Handler untuk tombol edit
  const handleEdit = (book) => {
    console.log("Edit book:", book);
    alert(`Edit buku: ${book.title}`);
    // Nanti bisa redirect ke form edit atau buka modal
    // navigate(`/admin/books/edit/${book.id}`);
  };

  // Handler untuk tombol delete
  const handleDelete = (book) => {
    console.log("Delete book:", book);
    if (confirm(`Apakah Anda yakin ingin menghapus buku "${book.title}"?`)) {
      // Panggil API delete
      // deleteBook(book.id);

      // Update state dummy (hapus setelah pakai Zustand)
      setBooks(books.filter((b) => b.id !== book.id));
      alert("Buku berhasil dihapus!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data buku...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-red-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-800 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Kelola Buku</h1>
        <p className="text-gray-600 mt-1">Manajemen data buku perpustakaan</p>
      </div>

      {/* Table */}
      <DataTable
        title="Daftar Buku"
        columns={columns}
        data={books}
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default BooksAdmin;
