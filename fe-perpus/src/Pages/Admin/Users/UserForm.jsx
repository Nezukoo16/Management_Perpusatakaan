import { useNavigate, useParams } from "react-router-dom";
import ReusableForm from "../../../Components/ReusableForm";
import { useEffect } from "react";
import useBookStore from "../../../Stores/BookStore";
import useCategoryStore from "../../../Stores/CategoryStore";
import useUserStore from "../../../Stores/userStore";
import { useShallow } from "zustand/react/shallow";

function UserForm() {
  // Konfigurasi fields untuk form buku
  const userFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Masukkan Email User",
      required: true,
      colSpan: 2,
      errorMessage: "Email user harus diisi",
    },
    {
      name: "nim",
      label: "NIM",
      type: "number",
      placeholder: "Masukkan nim ",
      required: false,
      colSpan: 2,
    },
    {
      name: "name",
      label: "Nama",
      type: "text",
      placeholder: "Masukkan Nama User",
      required: true,
      colSpan: 2,
      errorMessage: "Nama user harus diisi",
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      placeholder: "Masukkan Password",
      required: true,
      colSpan: 2,
      errorMessage: "Password harus diisi",
    },

    {
      name: "jurusan",
      label: "Jurusan",
      type: "text",
      placeholder: "Masukkan jurusan",
      required: false,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      placeholder: "Masukkan role user",
      required: true,
      options: [
        { value: "admin", label: "Admin" },
        { value: "member", label: "Member" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Masukkan status user",
      required: true,
      options: [
        { value: true, label: "Active" },
        { value: false, label: "Not Active" },
      ],
    },
  ];

  // Initial data kosong
  const initialData = {
    name: "",
    nim: null,
    jurusan: "",
    status: true,
    role: "",
    email: "",
  };

  const { id } = useParams();

  const { users, addUser, updateUser } = useUserStore(
    useShallow((state) => ({
      users: state.users,
      fetchUsers: state.fetchUsers,
      addUser: state.addUser,
      updateUser: state.updateUser,
      deleteUser: state.deleteUser,
    }))
  );

  const navigate = useNavigate();

  // Function untuk fetch data by ID (untuk edit mode)
  const fetchUserById = async (id) => {
    for (const user of users) {
      if (user.user_id == id) return user;
    }
  };

  // Handle submit
  const handleSubmit = async (data, isEditMode, id) => {
    if (isEditMode) {
      const res = await updateUser(data, id);
      if (res == 200) navigate("/admin/users");
    } else {
      const res = await addUser(data);
      if (res == 200) navigate("/admin/users");
    }
  };

  useEffect(() => {
    if (id) fetchUserById(id);
  }, [fetchUserById]);

  return (
    <ReusableForm
      title="User"
      fields={userFields}
      initialData={initialData}
      onSubmit={handleSubmit}
      backUrl="/admin/users"
      fetchDataById={fetchUserById}
    />
  );
}

export default UserForm;
