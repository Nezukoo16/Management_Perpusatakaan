import { useEffect } from "react";
import DataTable from "../../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useLogStore from "../../../Stores/logStore";

function LogAdmin() {
  const { logs, isLoading, error, fetchLogs } = useLogStore(
    useShallow((state) => ({
      logs: state.logs,
      isLoading: state.isLoading,
      error: state.error,
      fetchLogs: state.fetchLogs,
    }))
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  // Definisi kolom untuk table
  const columns = [
    {
      key: "log_id",
      label: "Log ID",
    },
    {
      key: "user.name",
      label: "User",
    },
    {
      key: "log_ip",
      label: "IP",
    },
    {
      key: "log_request",
      label: "Request",
    },
    {
      key: "created_at",
      label: "Tanggal",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data aktivitas...</p>
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
          Manajemen aktivitas perpustakaan perpustakaan
        </p>
      </div>

      {/* Table */}
      <DataTable title="Daftar Aktivitas" columns={columns} data={logs} />
    </div>
  );
}

export default LogAdmin;
