import { useState, useEffect } from "react";
import DataTable from "../../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../Stores/userStore";
import { useShallow } from "zustand/react/shallow";

function UserAdmin() {
  const { users, isLoading, error, fetchUsers, deleteUser } = useUserStore(
    useShallow((state) => ({
      users: state.users,
      isLoading: state.isLoading,
      error: state.error,
      fetchUsers: state.fetchUsers,
      deleteUser: state.deleteUser,
    }))
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Definisi kolom untuk table
  const columns = [
    {
      key: "user_id",
      label: "ID User",
    },
    {
      key: "nim",
      label: "NIM",
    },
    {
      key: "name",
      label: "Nama",
    },
    {
      key: "jurusan",
      label: "Jurusan",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
    },

    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value == 1
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value == 1 ? "Active" : "Not Active"}
        </span>
      ),
    },
  ];

  // Handler untuk tombol tambah
  const handleAdd = () => {
    navigate("/admin/users/add");
  };

  // Handler untuk tombol edit
  const handleEdit = (user) => {
    navigate(`/admin/users/update/${user.user_id}`);
  };

  // Handler untuk tombol delete
  const handleDelete = (user) => {
    if (confirm(`Apakah Anda yakin ingin menghapus user "${user.name}"?`)) {
      deleteUser(user.user_id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data user...</p>
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
        <p className="text-gray-600 mt-1">Manajemen data user</p>
      </div>

      {/* Table */}
      <DataTable
        title="Daftar user"
        columns={columns}
        data={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default UserAdmin;
