import { useState, useEffect } from "react";
import DataTable from "./../../../Components/DataTable";
import useBooksStore from "./../../../Stores/BookStore";
import { useNavigate } from "react-router-dom";

function BooksAdmin() {
  const { books, isLoading, error, fetchBooks, deleteBook } = useBooksStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  // Definisi kolom untuk table
  const columns = [
    {
      key: "book_id",
      label: "Book ID",
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
      key: "publication_year",
      label: "Tahun",
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
  ];

  // Handler untuk tombol tambah
  const handleAdd = () => {
    navigate("/admin/books/add");
  };

  // Handler untuk tombol edit
  const handleEdit = (book) => {
    navigate(`/admin/books/update/${book.book_id}`);
  };

  // Handler untuk tombol delete
  const handleDelete = (book) => {
    console.log("Delete book:", book);
    if (confirm(`Apakah Anda yakin ingin menghapus buku "${book.title}"?`)) {
      deleteBook(book.book_id);
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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default BooksAdmin;
