import { useNavigate, useParams } from "react-router-dom";
import ReusableForm from "../../../Components/ReusableForm";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useCategoryStore from "../../../Stores/CategoryStore";

function CategoryForm() {
  // Konfigurasi fields untuk form buku
  const categoryFields = [
    {
      name: "name",
      label: "Nama Kategori",
      type: "text",
      placeholder: "Masukkan nama kategori",
      required: true,
      colSpan: 2,
      errorMessage: "Nama kategori harus diisi",
    },
  ];

  // Initial data kosong
  const initialData = {
    name: "",
  };

  const { id } = useParams();

  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore(
    useShallow((state) => ({
      categories: state.categories,
      fetchCategories: state.fetchCategories,
      addCategory: state.addCategory,
      updateCategory: state.updateCategory,
      deleteCategory: state.deleteCategory,
    }))
  );

  const navigate = useNavigate();

  // Function untuk fetch data by ID (untuk edit mode)
  const fetchCategoryById = async (id) => {
    for (const category of categories) {
      if (category.category_id == id) return category;
    }
  };

  // Handle submit
  const handleSubmit = async (data, isEditMode, id) => {
    if (isEditMode) {
      const res = await updateCategory(data, id);
      if (res == 200) navigate("/admin/categories");
    } else {
      const res = await addCategory(data);
      if (res == 200) navigate("/admin/categories");
    }
  };

  useEffect(() => {
    if (id) fetchCategoryById(id);
  }, [fetchCategoryById]);

  return (
    <ReusableForm
      title="Categories"
      fields={categoryFields}
      initialData={initialData}
      onSubmit={handleSubmit}
      backUrl="/admin/categories"
      fetchDataById={fetchCategoryById}
    />
  );
}

export default CategoryForm;
