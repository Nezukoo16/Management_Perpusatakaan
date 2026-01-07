import { useState, useEffect } from "react";
import DataTable from "../../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import useCategoryStore from "../../../Stores/CategoryStore";

function CategoryAdmin() {
  const { categories, isLoading, error, fetchCategories, deleteCategory } =
    useCategoryStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  // Definisi kolom untuk table
  const columns = [
    {
      key: "category_id",
      label: "Category ID",
    },
    {
      key: "name",
      label: "Nama Kategori",
    },
  ];

  // Handler untuk tombol tambah
  const handleAdd = () => {
    navigate("/admin/categories/add");
  };

  // Handler untuk tombol edit
  const handleEdit = (category) => {
    navigate(`/admin/categories/update/${category.category_id}`);
  };

  // Handler untuk tombol delete
  const handleDelete = (category) => {
    console.log("Delete category:", category);
    if (confirm(`Apakah Anda yakin ingin menghapus buku "${category.name}"?`)) {
      deleteCategory(category.category_id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data category...</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Kelola Kategori</h1>
        <p className="text-gray-600 mt-1">
          Manajemen data Kategori perpustakaan
        </p>
      </div>

      {/* Table */}
      <DataTable
        title="Daftar Kategori"
        columns={columns}
        data={categories}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CategoryAdmin;
