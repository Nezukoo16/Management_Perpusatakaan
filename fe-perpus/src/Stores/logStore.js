import { create } from "zustand";
import api from "./../Api/httpRequest";

const useLogStore = create((set) => ({
  logs: [],
  error: "",
  isLoading: false,
  fetchLogs: async () => {
    set({ isLoading: true });
    const res = await api.get("/logs");
    console.log(res.data.data);
    set({ logs: res.data.data });
    set({ isLoading: false });
    return res;
  },
}));

export default useLogStore;
