import { useNavigate, useParams } from "react-router-dom";
import ReusableForm from "../../../Components/ReusableForm";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useUserStore from "../../../Stores/userStore";
import useBookStore from "../../../Stores/BookStore";
import useReservationStore from "../../../Stores/ReservationStore";

function ReservationForm() {
  const users = useUserStore((state) => state.users);
  const books = useBookStore((state) => state.books);

  // Konfigurasi fields untuk form buku
  const reservationFields = [
    {
      name: "user_id",
      label: "Member",
      type: "select",
      placeholder: "Pilih member",
      required: true,
      errorMessage: "Member harus diisi",
      options: users.map((value, index) => ({
        value: value.user_id,
        label: value.name,
      })),
    },
    {
      name: "book_id",
      label: "Buku",
      type: "select",
      placeholder: "Pilih buku",
      required: true,
      errorMessage: "Buku harus diisi",
      options: books.map((value, index) => ({
        value: value.book_id,
        label: value.title,
      })),
    },
    {
      name: "reservation_date",
      label: "Tanggal Reservasi",
      type: "date",
      placeholder: "Masukkan tanggal reservasi",
      required: true,

      errorMessage: "Tanggal reservasi harus diisi",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Pilih Status",
      required: true,
      errorMessage: "Status harus diisi",
      options: [
        { value: "waiting", label: "Waiting" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
  ];

  // Initial data kosong
  const initialData = {
    user_id: null,
    book_id: null,
    reservation_date: Date.now(),
    status: "waiting",
  };

  const { id } = useParams();

  const {
    reservations,
    fetchReservations,
    addReservation,
    updateReservation,
    deleteReservation,
  } = useReservationStore(
    useShallow((state) => ({
      reservations: state.reservations,
      fetchReservations: state.fetchReservations,
      addReservation: state.addReservation,
      updateReservation: state.updateReservation,
      deleteReservation: state.deleteReservation,
    }))
  );

  const navigate = useNavigate();

  // Function untuk fetch data by ID (untuk edit mode)
  const fetchReservationById = async (id) => {
    for (const reservation of reservations) {
      if (reservation.reservation_id == id) return reservation;
    }
  };

  // Handle submit
  const handleSubmit = async (data, isEditMode, id) => {
    if (isEditMode) {
      const res = await updateReservation(data, id);
      if (res == 200) navigate("/admin/reservations");
    } else {
      const res = await addReservation(data);
      if (res == 200) navigate("/admin/reservations");
    }
  };

  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const fetchBooks = useBookStore((state) => state.fetchBooks);

  useEffect(() => {
    if (users.length == 0) fetchUsers();
    if (books.length == 0) fetchBooks();
    if (id) fetchReservationById(id);
  }, [fetchReservationById]);

  return (
    <ReusableForm
      title="Reservations"
      fields={reservationFields}
      initialData={initialData}
      onSubmit={handleSubmit}
      backUrl="/admin/reservations"
      fetchDataById={fetchReservationById}
    />
  );
}

export default ReservationForm;
