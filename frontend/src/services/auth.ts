import api from "./api";

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data; // token
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => !!localStorage.getItem("token");