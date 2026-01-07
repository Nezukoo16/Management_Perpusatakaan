import { create } from "zustand";
import api from "./../Api/httpRequest";

const useCategoryStore = create((set, get) => ({
  categories: [],
  error: "",
  isLoading: false,
  fetchCategories: async () => {
    set({ isLoading: true });
    const res = await api.get("/categories");
    set({ categories: res.data.data });
    set({ isLoading: false });
    return res;
  },
  addCategory: async (data) => {
    set({ isLoading: true });
    const res = await api.post("/categories", data);
    const { fetchCategories } = get();
    fetchCategories();
    set({ isLoading: false });
    return res;
  },
  updateCategory: async (data, id) => {
    set({ isLoading: true });
    const res = await api.patch(`/categories/${id}`, data);
    const { fetchCategories } = get();
    fetchCategories();
    set({ isLoading: false });
    return res;
  },
  deleteCategory: async (id) => {
    set({ isLoading: true });
    const res = await api.delete(`/categories/${id}`);
    const { fetchCategories } = get();
    fetchCategories();
    set({ isLoading: false });
    return res;
  },
}));

export default useCategoryStore;
