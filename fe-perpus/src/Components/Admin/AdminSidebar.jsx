import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar({ children }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Data menu navigasi
  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
    {
      id: "books",
      name: "Kelola Buku",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      ),
    },
    {
      id: "categories",
      name: "Kelola Kategori",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 18l6-6-6-6M8 6l-6 6 6 6"
        />
      ),
    },
    {
      id: "users",
      name: "Kelola Users",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
    },
    {
      id: "reservations",
      name: "Pengajuan Pinjaman",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      ),
    },
    {
      id: "transactions",
      name: "Transaksi Peminjaman",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
        />
      ),
    },
    {
      id: "logs",
      name: "Logs",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
    },
  ];

  const navigate = useNavigate();

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    navigate(`/admin/${menuId}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-blue-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Header Sidebar */}
        <div className="p-4 flex items-center justify-between border-b border-blue-800">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg">Admin CMS</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-blue-800 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 transition ${
                activeMenu === item.id
                  ? "bg-blue-700 border-l-4 border-blue-400"
                  : "hover:bg-blue-800"
              }`}
            >
              <svg
                className="w-6 h-6 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {item.icon}
                {item.subIcon}
              </svg>
              {isSidebarOpen && (
                <span className="font-medium">{item.name}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-blue-800 p-4">
          {isSidebarOpen && (
            <button
              className="w-full mt-3 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  );
}

export default AdminSidebar;
