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
  XCircle,
  AlertCircle,
} from "lucide-react";
import useUserStore from "../../Stores/userStore";
import { useNavigate } from "react-router-dom";
import useReservationStore from "../../Stores/ReservationStore";

// Store untuk manajemen reservasi

// Komponen Navbar
export const ReservationNavbar = ({
  onLogout,
  onBackToDashboard,
  onViewTransactions,
}) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToDashboard}
              className="flex items-center space-x-2 text-slate-800 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline ">Kembali</span>
            </button>
            <div className="flex items-center space-x-3">
              <Library className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">Reservasi Saya</h1>
                <p className="text-xs text-blue-100">Riwayat Peminjaman Buku</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onViewTransactions}
              className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-semibold"
            >
              <BookOpen className="w-4 h-4" />
              <span>Transaksi</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-slate-800 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
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
export const StatusBadge = ({ status }) => {
  const statusConfig = {
    waiting: {
      icon: AlertCircle,
      text: "Menunggu",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    completed: {
      icon: CheckCircle,
      text: "Selesai",
      className: "bg-green-100 text-green-800 border-green-200",
    },
  };

  const config = statusConfig[status] || statusConfig.waiting;
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

// Komponen Reservation Card
export const ReservationCard = ({ reservation }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {reservation.book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Penulis: {reservation.book.author}
          </p>
          <p className="text-sm text-gray-500">
            Penerbit: {reservation.book.publisher}
          </p>
        </div>
        <StatusBadge status={reservation.status} />
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center space-x-3 text-sm">
          <Calendar className="w-4 h-4 text-blue-600" />
          <div>
            <span className="text-gray-600 font-medium">
              Tanggal Reservasi:
            </span>
            <span className="ml-2 text-gray-800">
              {formatDate(reservation.reservation_date)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <Clock className="w-4 h-4 text-purple-600" />
          <div>
            <span className="text-gray-600 font-medium">Dibuat:</span>
            <span className="ml-2 text-gray-800">
              {formatDateTime(reservation.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Filter
export const FilterSection = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { value: "all", label: "Semua" },
    { value: "waiting", label: "Menunggu" },
    { value: "completed", label: "Selesai" },
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

// Halaman Reservasi User
export default function UserReservationPage() {
  const reservations = useReservationStore((s) => s.reservations);
  const fetchReservations = useReservationStore((s) => s.fetchReservations);
  const [activeFilter, setActiveFilter] = useState("all");
  const logout = useUserStore((s) => s.logout);
  const navigate = useNavigate();

  const filteredReservations = reservations.filter((reservation) => {
    if (activeFilter === "all") return true;
    return reservation.status === activeFilter;
  });

  useEffect(() => {
    if (reservations.length == 0) fetchReservations();
  }, [fetchReservations]);

  const handleLogout = () => {
    logout();
  };

  const handleBackToDashboard = () => {
    navigate("/client/dashboard");
  };

  const handleViewTransactions = () => {
    navigate("/client/transactions");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ReservationNavbar
        onLogout={handleLogout}
        onBackToDashboard={handleBackToDashboard}
        onViewTransactions={handleViewTransactions}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Riwayat Reservasi Buku
          </h2>
          <p className="text-gray-600">
            Lihat semua reservasi dan peminjaman buku Anda
          </p>
        </div>

        {/* Filter */}
        <FilterSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Reservation List */}
        {filteredReservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReservations.map((reservation) => (
              <ReservationCard
                key={reservation.reservation_id}
                reservation={reservation}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak Ada Reservasi
            </h3>
            <p className="text-gray-500">
              Anda belum memiliki reservasi pada filter ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
