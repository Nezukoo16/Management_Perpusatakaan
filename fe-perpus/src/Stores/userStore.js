import { create } from "zustand";
import api from "./../Api/httpRequest";

const useUserStore = create((set, get) => ({
  users: [],
  error: "",
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true });
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("accessToken", res.data.data.token);
    set({ isLoading: false });
    return res;
  },
  register: async (data) => {
    set({ isLoading: true });
    const res = await api.post("/auth/register", data);
    set({ isLoading: false });
    return res;
  },
  fetchUsers: async () => {
    set({ isLoading: true });
    const res = await api.get("/users");
    set({ users: res.data.data });
    set({ isLoading: false });
  },
  addUser: async (data) => {
    data.nim = data.nim == 0 ? null : data.nim;
    data.status = true;
    console.log(data);
    set({ isLoading: true });

    const res = await api.post("/users", data);
    const { fetchUsers } = get();
    fetchUsers();
    set({ isLoading: false });
    return res;
  },
  updateUser: async (data, id) => {
    data.nim = data.nim == 0 ? null : data.nim;
    data.status = true;
    set({ isLoading: true });
    const res = await api.patch(`/users/${id}`, data);
    const { fetchUsers } = get();
    fetchUsers();
    set({ isLoading: false });
    return res;
  },
  deleteUser: async (id) => {
    set({ isLoading: true });
    const res = await api.delete(`/users/${id}`);
    const { fetchUsers } = get();
    fetchUsers();
    set({ isLoading: false });
    return res;
  },
}));

export default useUserStore;
