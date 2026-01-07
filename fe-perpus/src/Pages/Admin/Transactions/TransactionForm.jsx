import { useNavigate, useParams } from "react-router-dom";
import ReusableForm from "../../../Components/ReusableForm";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useUserStore from "../../../Stores/userStore";
import useTransactionStore from "../../../Stores/TransactionStore";
import useReservationStore from "../../../Stores/ReservationStore";

function TransactionForm() {
  const reservations = useReservationStore((state) => state.reservations);

  // Konfigurasi fields untuk form buku
  const transactionsField = [
    {
      name: "reservation_id",
      label: "Reservasi",
      type: "select",
      placeholder: "Pilih reservasi",
      required: true,
      errorMessage: "Reservasi harus diisi",
      options: reservations.map((value, index) => ({
        value: value.reservation_id,
        label: `${value.user.name} - ${value.book.title} (${value.reservation_date})`,
      })),
    },
    {
      name: "borrow_date",
      label: "Tanggal Peminjaman",
      type: "date",
      placeholder: "Masukkan tanggal peminjaman",
      required: true,

      errorMessage: "Tanggal peminjaman harus diisi",
    },
    {
      name: "due_date",
      label: "Batas Pengembalian",
      type: "date",
      placeholder: "Masukkan Batas Pengembalian",
      required: true,
      errorMessage: "Tanggal batas pengembalian harus diisi",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Pilih status",
      required: true,
      errorMessage: "status harus diisi",
      options: [
        { value: "borrowed", label: "Sedang Dipinjam" },
        { value: "returned", label: "Telah Dikembalikan" },
      ],
    },
  ];

  // Initial data kosong
  const initialData = {
    reservation_id: null,
    borrow_date: null,
    due_date: null,
    status: "borrowed",
  };

  const { id } = useParams();

  const {
    transactions,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactionStore(
    useShallow((state) => ({
      transactions: state.transactions,
      fetchTransactions: state.fetchTransactions,
      addTransaction: state.addTransaction,
      updateTransaction: state.updateTransaction,
      deleteTransaction: state.deleteTransaction,
    }))
  );

  const navigate = useNavigate();

  // Function untuk fetch data by ID (untuk edit mode)
  const fetchTransactionById = async (id) => {
    for (const transaction of transactions) {
      if (transaction.transaction_id == id) return transaction;
    }
  };

  // Handle submit
  const handleSubmit = async (data, isEditMode, id) => {
    if (isEditMode) {
      const res = await updateTransaction(data, id);
      if (res == 200) navigate("/admin/transactions");
    } else {
      const res = await addTransaction(data);
      if (res == 200) navigate("/admin/transactions");
    }
  };

  const fetchReservations = useReservationStore(
    (state) => state.fetchReservations
  );

  useEffect(() => {
    if (reservations.length == 0) fetchReservations();
    if (id) fetchTransactionById(id);
  }, [fetchTransactionById]);

  return (
    <ReusableForm
      title="Transactions"
      fields={transactionsField}
      initialData={initialData}
      onSubmit={handleSubmit}
      backUrl="/admin/transactions"
      fetchDataById={fetchTransactionById}
    />
  );
}

export default TransactionForm;
