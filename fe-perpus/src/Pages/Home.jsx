import React from "react";
import { Library, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Komponen Navbar
export const Navbar = ({ onAdminClick }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Library className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Perpustakaan Digital</h1>
          </div>
          <button
            onClick={onAdminClick}
            className="text-blue-100 hover:text-white text-sm underline transition"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

// Komponen Hero Section dengan Login/Register
export const HeroSection = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <Library className="w-24 h-24 mx-auto text-blue-600 mb-6" />
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Selamat Datang di Perpustakaan Digital
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Akses ribuan koleksi buku digital untuk memperluas wawasan Anda
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Mulai Sekarang
            </h3>

            <div className="space-y-4">
              <button
                onClick={onLoginClick}
                className="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>

              <button
                onClick={onRegisterClick}
                className="w-full flex items-center justify-center space-x-3 bg-white text-blue-600 border-2 border-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                <UserPlus className="w-5 h-5" />
                <span>Register</span>
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              Silakan login atau daftar untuk mengakses koleksi buku kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Footer
export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
          © 2024 Perpustakaan Digital. Semua hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

// Halaman Home
export default function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/client/auth");
  };

  const handleRegisterClick = () => {
    navigate("/client/auth");
  };

  const handleAdminClick = () => {
    navigate("/admin/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onAdminClick={handleAdminClick} />
      <HeroSection
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      <Footer />
    </div>
  );
}
