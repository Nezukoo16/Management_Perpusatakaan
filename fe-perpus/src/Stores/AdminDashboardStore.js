import { create } from "zustand";
import axios from "axios";
import api from "../Api/httpRequest";

const useDashboardStore = create((set) => ({
  dashboardData: {
    totalBooks: 0,
    pendingReservations: 0,
    borrowedBooks: 0,
    returnedBooks: 0,
  },
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/");
      set({
        dashboardData: {
          totalBooks: response.data.total_books,
          pendingReservations: response.data.pending_reservations,
          borrowedBooks: response.data.borrowed_books,
          returnedBooks: response.data.returned_books,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useDashboardStore;
