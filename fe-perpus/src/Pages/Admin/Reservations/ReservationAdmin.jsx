import { useEffect } from "react";
import DataTable from "../../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import useReservationStore from "../../../Stores/ReservationStore";
import { useShallow } from "zustand/react/shallow";
import { Check, X } from "lucide-react";

function ReservationAdmin() {
  const {
    reservations,
    isLoading,
    error,
    fetchReservations,
    deleteReservation,
  } = useReservationStore(
    useShallow((state) => ({
      reservations: state.reservations,
      isLoading: state.isLoading,
      error: state.error,
      fetchReservations: state.fetchReservations,
      deleteReservation: state.deleteReservation,
    }))
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  // Definisi kolom untuk table
  const columns = [
    {
      key: "reservation_id",
      label: "Reservation ID",
    },
    {
      key: "user.name",
      label: "Nama Kategori",
    },
    {
      key: "book.title",
      label: "Judul Buku",
    },
    {
      key: "reservation_date",
      label: "Tanggal Reservasi",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`${
            value == "waiting"
              ? "text-yellow-500 bg-yellow-100"
              : value == "completed"
              ? "text-green-500 bg-green-100"
              : "text-red-500 bg-red-100"
          } px-3 py-1 rounded-full`}
        >
          {value}
        </span>
      ),
    },
    // {
    //   key: "actions",
    //   label: "Aksi",
    //   render: (value) => (
    //     <div>
    //       <button>
    //         <Check />
    //       </button>
    //       <button>
    //         <X />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  // Handler untuk tombol tambah
  const handleAdd = () => {
    navigate("/admin/reservations/add");
  };

  // Handler untuk tombol edit
  const handleEdit = (reservation) => {
    navigate(`/admin/reservations/update/${reservation.reservation_id}`);
  };

  // Handler untuk tombol delete
  const handleDelete = (reservation) => {
    console.log("Delete reservation:", reservation);
    if (
      confirm(
        `Apakah Anda yakin ingin menghapus reservasi ${reservation.user.name} - ${reservation.book.title}?`
      )
    ) {
      deleteReservation(reservation.reservation_id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data reservasi...</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Kelola Reservasi</h1>
        <p className="text-gray-600 mt-1">
          Manajemen data reservasi perpustakaan
        </p>
      </div>

      {/* Table */}
      <DataTable
        title="Daftar Reservasi"
        columns={columns}
        data={reservations}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ReservationAdmin;
