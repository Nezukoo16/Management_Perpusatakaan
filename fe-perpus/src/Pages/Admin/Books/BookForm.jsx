import { useNavigate, useParams } from "react-router-dom";
import ReusableForm from "./../../../Components/ReusableForm";
import { useEffect } from "react";
import useBookStore from "../../../Stores/BookStore";
import useCategoryStore from "../../../Stores/CategoryStore";

function BookForm() {
  const categories = useCategoryStore((state) => state.categories);
  // Konfigurasi fields untuk form buku
  const bookFields = [
    {
      name: "title",
      label: "Judul Buku",
      type: "text",
      placeholder: "Masukkan judul buku",
      required: true,
      colSpan: 2,
      errorMessage: "Judul buku harus diisi",
    },
    {
      name: "author",
      label: "Penulis",
      type: "text",
      placeholder: "Masukkan nama penulis",
      required: true,
    },
    {
      name: "publisher",
      label: "Penerbit",
      type: "text",
      placeholder: "Masukkan nama penerbit",
      required: true,
    },
    {
      name: "publication_year",
      label: "Tahun Terbit",
      type: "number",
      placeholder: "Contoh: 2024",
      required: true,
      validate: (value) => {
        if (value < 1000 || value > new Date().getFullYear()) {
          return "Tahun tidak valid";
        }
        return null;
      },
    },

    {
      name: "category_id",
      label: "Kategori",
      type: "select",
      required: true,
      options: categories.map((category, index) => {
        return { value: category.category_id, label: category.name };
      }),
    },
    {
      name: "stock",
      label: "Stok",
      type: "number",
      placeholder: "Jumlah stok",
      required: true,
      validate: (value) => {
        if (value < 0) return "Stok tidak boleh negatif";
        return null;
      },
    },
  ];

  // Initial data kosong
  const initialData = {
    title: "  ",
    category_id: 0,
    author: "   ",
    publisher: "",
    publication_year: 0,
    stock: 0,
  };

  const { id } = useParams();

  const books = useBookStore((state) => state.books);
  const addBook = useBookStore((state) => state.addBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  const navigate = useNavigate();

  // Function untuk fetch data by ID (untuk edit mode)
  const fetchBookById = async (id) => {
    for (const book of books) {
      if (book.book_id == id) return book;
    }
  };

  // Handle submit
  const handleSubmit = async (data, isEditMode, id) => {
    if (isEditMode) {
      const res = await updateBook(data, id);
      if (res == 200) navigate("/admin/books");
    } else {
      const res = await addBook(data);
      if (res == 200) navigate("/admin/books");
    }
  };

  useEffect(() => {
    if (categories.length == 0) fetchCategories();
    if (id) fetchBookById(id);
  }, [fetchBookById]);

  return (
    <ReusableForm
      title="Buku"
      fields={bookFields}
      initialData={initialData}
      onSubmit={handleSubmit}
      backUrl="/admin/books"
      fetchDataById={fetchBookById}
    />
  );
}

export default BookForm;
