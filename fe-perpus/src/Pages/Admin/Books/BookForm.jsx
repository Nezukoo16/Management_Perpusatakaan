import ReusableForm from "./../../../Components/ReusableForm";

// ========================================
// CONTOH PENGGUNAAN: BOOK FORM
// ========================================

function BookForm() {
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
      name: "year",
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
      name: "isbn",
      label: "ISBN",
      type: "text",
      placeholder: "Contoh: 978-1234567890",
      required: true,
    },
    {
      name: "category",
      label: "Kategori",
      type: "select",
      required: true,
      options: [
        { value: "Programming", label: "Programming" },
        { value: "Database", label: "Database" },
        { value: "Data Science", label: "Data Science" },
        { value: "Web Development", label: "Web Development" },
        { value: "Mobile Development", label: "Mobile Development" },
        { value: "AI & Machine Learning", label: "AI & Machine Learning" },
        { value: "Networking", label: "Networking" },
        { value: "Other", label: "Lainnya" },
      ],
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
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      placeholder: "Masukkan deskripsi atau sinopsis buku",
      rows: 4,
      colSpan: 2,
      required: false,
      helpText: "Opsional: Tambahkan deskripsi singkat tentang buku",
    },
  ];

  // Initial data kosong
  const initialData = {
    title: "",
    author: "",
    publisher: "",
    year: "",
    isbn: "",
    category: "",
    stock: "",
    description: "",
  };

  // Function untuk fetch data by ID (untuk edit mode)
  const fetchBookById = async (id) => {
    // Uncomment dan sesuaikan dengan store/API kamu
    // const book = await useBooksStore.getState().fetchBookById(id);
    // return book;

    // Dummy data untuk testing
    return {
      title: "Pemrograman Web dengan React",
      author: "John Doe",
      publisher: "Tech Publisher",
      year: "2023",
      isbn: "978-1234567890",
      category: "Programming",
      stock: "5",
      description: "Buku tentang React JS",
    };
  };

  // Handle submit
  const handleSubmit = async (data, isEditMode, id) => {
    if (isEditMode) {
      // Update book
      console.log("Update book:", id, data);
      // await useBooksStore.getState().updateBook(id, data);
    } else {
      // Add book
      console.log("Add book:", data);
      // await useBooksStore.getState().addBook(data);
    }
  };

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
