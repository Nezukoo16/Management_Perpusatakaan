import { create } from "zustand";
import api from "./../Api/httpRequest";

const useBookStore = create((set, get) => ({
  books: [],
  error: "",
  isLoading: false,
  fetchBooks: async () => {
    set({ isLoading: true });
    const res = await api.get("/books");
    set({ books: res.data.data });
    set({ isLoading: false });
  },
  addBook: async (data) => {
    set({ isLoading: true });
    const res = await api.post("/books", data);
    const { fetchBooks } = get();
    fetchBooks();
    set({ isLoading: false });
    return res;
  },
  updateBook: async (data, id) => {
    set({ isLoading: true });
    const res = await api.patch(`/books/${id}`, data);
    const { fetchBooks } = get();
    fetchBooks();
    set({ isLoading: false });
    return res;
  },
  deleteBook: async (id) => {
    set({ isLoading: true });
    const res = await api.delete(`/books/${id}`);
    const { fetchBooks } = get();
    fetchBooks();
    set({ isLoading: false });
    return res;
  },
}));

export default useBookStore;
