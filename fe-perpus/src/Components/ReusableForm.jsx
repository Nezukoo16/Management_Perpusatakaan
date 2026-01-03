import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Reusable Form Component
 *
 * Props:
 * - title: Judul halaman (string)
 * - fields: Array konfigurasi field form
 * - initialData: Data awal untuk edit mode
 * - onSubmit: Function yang dipanggil saat submit
 * - backUrl: URL untuk kembali
 * - fetchDataById: Function untuk fetch data by ID (optional)
 */

function ReusableForm({
  title = "Form",
  fields = [],
  initialData = {},
  onSubmit,
  backUrl = "/admin",
  fetchDataById = null,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Load data untuk edit mode
  useEffect(() => {
    if (isEditMode && id && fetchDataById) {
      const loadData = async () => {
        try {
          const data = await fetchDataById(id);
          setFormData(data);
        } catch (error) {
          console.error("Error loading data:", error);
          alert("Gagal memuat data");
        }
      };
      loadData();
    }
  }, [id, isEditMode, fetchDataById]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Hapus error saat user mulai mengetik
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] =
          field.errorMessage || `${field.label} harus diisi`;
      }

      // Custom validation
      if (field.validate && formData[field.name]) {
        const validationError = field.validate(formData[field.name], formData);
        if (validationError) {
          newErrors[field.name] = validationError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData, isEditMode, id);
      alert(
        isEditMode ? "Data berhasil diupdate!" : "Data berhasil ditambahkan!"
      );
      navigate(backUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(backUrl);
  };

  // Render field berdasarkan tipe
  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || "",
      onChange: handleChange,
      className: `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        errors[field.name] ? "border-red-500" : "border-gray-300"
      }`,
      placeholder: field.placeholder || "",
      disabled: field.disabled || false,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
        return <input type={field.type} {...commonProps} />;

      case "textarea":
        return <textarea {...commonProps} rows={field.rows || 4} />;

      case "select":
        return (
          <select {...commonProps}>
            <option value="">-- Pilih {field.label} --</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={field.disabled || false}
            />
            <label className="ml-2 text-sm text-gray-700">
              {field.checkboxLabel || field.label}
            </label>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? `Edit ${title}` : `Tambah ${title}`}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode
            ? `Ubah data ${title.toLowerCase()}`
            : `Isi form untuk menambah ${title.toLowerCase()} baru`}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field, index) => (
            <div
              key={index}
              className={field.colSpan === 2 ? "md:col-span-2" : ""}
            >
              {field.type !== "checkbox" && (
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
              )}

              {renderField(field)}

              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}

              {field.helpText && (
                <p className="text-gray-500 text-xs mt-1">{field.helpText}</p>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>{isEditMode ? "Update" : "Simpan"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReusableForm;
