import React, { useEffect, useState } from "react";
import {
  Library,
  LogOut,
  BookOpen,
  User,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Package,
} from "lucide-react";
import useTransactionStore from "../../Stores/TransactionStore";
import useUserStore from "../../Stores/userStore";
import { useNavigate } from "react-router-dom";

// Komponen Navbar
export const TransactionNavbar = ({ onLogout, onBackToReservation }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToReservation}
              className="text-slate-800 flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">Transaksi Peminjaman</h1>
                <p className="text-xs text-blue-100">
                  Riwayat Peminjaman & Pengembalian
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onLogout}
              className="flex text-slate-800 items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Komponen Status Badge
export const TransactionStatusBadge = ({ status, dueDate }) => {
  const isOverdue =
    status === "borrowed" && dueDate && new Date(dueDate) < new Date();

  const statusConfig = {
    borrowed: {
      icon: BookOpen,
      text: isOverdue ? "Terlambat" : "Dipinjam",
      className: isOverdue
        ? "bg-red-100 text-red-800 border-red-200"
        : "bg-blue-100 text-blue-800 border-blue-200",
    },
    returned: {
      icon: CheckCircle,
      text: "Dikembalikan",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    overdue: {
      icon: AlertTriangle,
      text: "Terlambat",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  };

  const config = statusConfig[status] || statusConfig.borrowed;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full border ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      <span>{config.text}</span>
    </span>
  );
};

// Komponen Transaction Card
export const TransactionCard = ({ transaction, handleReturn }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDaysRemaining = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining =
    transaction.status === "borrowed"
      ? calculateDaysRemaining(transaction.due_date)
      : null;
  const isOverdue = daysRemaining !== null && daysRemaining < 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 flex-1">
              {transaction.reservation.book.title}
            </h3>
            <TransactionStatusBadge
              status={transaction.status}
              dueDate={transaction.due_date}
            />
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Penulis: {transaction.reservation.book.author}
          </p>
          <p className="text-sm text-gray-500">
            Penerbit: {transaction.reservation.book.publisher}
          </p>
        </div>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center space-x-3 text-sm">
          <Calendar className="w-4 h-4 text-green-600" />
          <div>
            <span className="text-gray-600 font-medium">Tanggal Pinjam:</span>
            <span className="ml-2 text-gray-800">
              {formatDate(transaction.borrow_date)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm ">
          <Clock
            className={`w-4 h-4 ${
              isOverdue ? "text-red-600" : "text-orange-600"
            }`}
          />
          <div>
            <span className="text-gray-600 font-medium">Batas Kembali:</span>
            <span
              className={`ml-2 font-semibold ${
                isOverdue ? "text-red-600" : "text-gray-800"
              }`}
            >
              {formatDate(transaction.due_date)}
            </span>
          </div>
        </div>

        {transaction.return_date && (
          <div className="flex items-center space-x-3 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <div>
              <span className="text-gray-600 font-medium">
                Tanggal Kembali:
              </span>
              <span className="ml-2 text-gray-800">
                {formatDate(transaction.return_date)}
              </span>
            </div>
          </div>
        )}

        {transaction.status === "borrowed" && daysRemaining !== null && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              isOverdue
                ? "bg-red-50 border border-red-200"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                isOverdue ? "text-red-700" : "text-blue-700"
              }`}
            >
              {isOverdue
                ? `⚠️ Terlambat ${Math.abs(daysRemaining)} hari`
                : `📅 Sisa ${daysRemaining} hari lagi`}
            </p>
          </div>
        )}

        {transaction.status === "borrowed" && (
          <div className="mt-4 pt-4 border-t">
            <button
              className="w-full bg-green-600 text-white hover:bg-green-700 py-2 rounded-lg font-semibold transition"
              onClick={() => handleReturn()}
            >
              Kembalikan Buku
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Komponen Filter
export const TransactionFilterSection = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { value: "all", label: "Semua" },
    { value: "borrowed", label: "Dipinjam" },
    { value: "returned", label: "Dikembalikan" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeFilter === filter.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Komponen Summary Stats
export const TransactionSummary = ({ transactions }) => {
  const borrowed = transactions.filter((t) => t.status === "borrowed").length;
  const returned = transactions.filter((t) => t.status === "returned").length;
  const overdue = transactions.filter((t) => {
    if (t.status !== "borrowed" || !t.due_date) return false;
    return new Date(t.due_date) < new Date();
  }).length;

  const stats = [
    {
      label: "Sedang Dipinjam",
      value: borrowed,
      color: "bg-blue-100 text-blue-800",
      icon: BookOpen,
    },
    {
      label: "Terlambat",
      value: overdue,
      color: "bg-red-100 text-red-800",
      icon: AlertTriangle,
    },
    {
      label: "Sudah Dikembalikan",
      value: returned,
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Halaman Transaksi
export default function TransactionPage() {
  const transactions = useTransactionStore((s) => s.transactions);
  const fetchTransactions = useTransactionStore((s) => s.fetchTransactions);
  const [activeFilter, setActiveFilter] = useState("all");
  const logout = useUserStore((s) => s.logout);
  const updateTransaction = useTransactionStore((s) => s.updateTransaction);
  const navigate = useNavigate();

  async function handleReturn(id) {
    await updateTransaction({ status: "returned" }, id);
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "all") return true;
    return transaction.status === activeFilter;
  });

  useEffect(() => {
    if (transactions.length == 0) fetchTransactions();
  }, [fetchTransactions]);

  const handleLogout = () => {
    logout();
  };

  const handleBackToReservation = () => {
    navigate("/client/reservations");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TransactionNavbar
        onLogout={handleLogout}
        onBackToReservation={handleBackToReservation}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Transaksi Peminjaman Buku
          </h2>
          <p className="text-gray-600">
            Kelola dan pantau semua transaksi peminjaman buku Anda
          </p>
        </div>

        {/* Summary */}
        <TransactionSummary transactions={transactions} />

        {/* Filter */}
        <TransactionFilterSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Transaction List */}
        {filteredTransactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.transaction_id}
                transaction={transaction}
                handleReturn={() => handleReturn(transaction.transaction_id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak Ada Transaksi
            </h3>
            <p className="text-gray-500">
              Anda belum memiliki transaksi pada filter ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
