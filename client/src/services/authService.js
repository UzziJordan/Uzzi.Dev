import api from "./api";

const loginAdmin = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export default loginAdmin;
