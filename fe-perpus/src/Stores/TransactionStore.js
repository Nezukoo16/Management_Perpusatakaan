import { create } from "zustand";
import api from "./../Api/httpRequest";

const useTransactionStore = create((set, get) => ({
  transactions: [],
  error: "",
  isLoading: false,
  fetchTransactions: async () => {
    set({ isLoading: true });
    const res = await api.get("/transactions");
    console.log(res.data.data);
    set({ transactions: res.data.data });
    set({ isLoading: false });
    return res;
  },
  addTransaction: async (data) => {
    set({ isLoading: true });
    const res = await api.post(`/transactions`, data);
    const { fetchTransactions } = get();
    fetchTransactions();
    set({ isLoading: false });
    return res;
  },
  updateTransaction: async (data, id) => {
    set({ isLoading: true });
    console.log(data);
    const res = await api.patch(`/transactions/${id}`, data);
    const { fetchTransactions } = get();
    fetchTransactions();
    set({ isLoading: false });
    return res;
  },
  deleteTransaction: async (id) => {
    set({ isLoading: true });
    const res = await api.delete(`/transactions/${id}`);
    const { fetchTransactions } = get();
    fetchTransactions();
    set({ isLoading: false });
    return res;
  },
}));

export default useTransactionStore;
