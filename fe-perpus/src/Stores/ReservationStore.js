import { create } from "zustand";
import api from "./../Api/httpRequest";

const useReservationStore = create((set, get) => ({
  reservations: [],
  error: "",
  isLoading: false,
  fetchReservations: async () => {
    set({ isLoading: true });
    const res = await api.get("/reservations");
    set({ reservations: res.data.data });
    set({ isLoading: false });
    return res;
  },
  addReservation: async (data) => {
    set({ isLoading: true });
    console.log("store", data);
    const res = await api.post("/reservations", data);
    const { fetchReservations } = get();
    fetchReservations();
    set({ isLoading: false });
    return res;
  },
  updateReservation: async (data, id) => {
    set({ isLoading: true });
    console.log(data);
    const res = await api.patch(`/reservations/${id}`, data);
    const { fetchReservations } = get();
    fetchReservations();
    set({ isLoading: false });
    return res;
  },
  deleteReservation: async (id) => {
    set({ isLoading: true });
    const res = await api.delete(`/reservations/${id}`);
    const { fetchReservations } = get();
    fetchReservations();
    set({ isLoading: false });
    return res;
  },
}));

export default useReservationStore;
