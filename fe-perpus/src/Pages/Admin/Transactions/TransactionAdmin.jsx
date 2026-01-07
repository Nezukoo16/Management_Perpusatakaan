import { useEffect } from "react";
import DataTable from "../../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import useReservationStore from "../../../Stores/ReservationStore";
import { useShallow } from "zustand/react/shallow";
import useTransactionStore from "../../../Stores/TransactionStore";

function TransactionAdmin() {
  const {
    transactions,
    isLoading,
    error,
    fetchTransactions,
    deleteTransaction,
  } = useTransactionStore(
    useShallow((state) => ({
      transactions: state.transactions,
      isLoading: state.isLoading,
      error: state.error,
      fetchTransactions: state.fetchTransactions,
      deleteTransaction: state.deleteTransaction,
    }))
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Definisi kolom untuk table
  const columns = [
    {
      key: "transaction_id",
      label: "Transaction ID",
    },
    {
      key: "reservation.user.name",
      label: "User",
    },
    {
      key: "reservation.book.title",
      label: "Buku",
    },
    {
      key: "borrow_date",
      label: "Tanggal Peminjaman",
    },
    {
      key: "due_date",
      label: "Batas Pengembalian",
    },
    {
      key: "return_date",
      label: "Tanggal Pengembalian",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`${
            value == "borrowed"
              ? "text-yellow-500 bg-yellow-100"
              : "text-green-500 bg-green-100"
          } px-3 py-1 rounded-full`}
        >
          {value}
        </span>
      ),
    },
  ];

  // Handler untuk tombol tambah
  const handleAdd = () => {
    navigate("/admin/transactions/add");
  };

  // Handler untuk tombol edit
  const handleEdit = (transaction) => {
    navigate(`/admin/transactions/update/${transaction.transaction_id}`);
  };

  // Handler untuk tombol delete
  const handleDelete = (transaction) => {
    if (
      confirm(
        `Apakah Anda yakin ingin menghapus transaksi ${transaction.reservation.user.name} - ${transaction.reservation.book.title}?`
      )
    ) {
      deleteTransaction(transaction.transaction_id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data transaksi...</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Kelola Transaksi</h1>
        <p className="text-gray-600 mt-1">
          Manajemen data transaksi perpustakaan
        </p>
      </div>

      {/* Table */}
      <DataTable
        title="Daftar Reservasi"
        columns={columns}
        data={transactions}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default TransactionAdmin;
