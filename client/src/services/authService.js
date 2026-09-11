import api from "./api";

const loginAdmin = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};

export default loginAdmin;