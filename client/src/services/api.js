import axios from "axios";

const getBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_BASE_URL;
  if (!rawUrl) return "http://localhost:5000/api";

  const cleanUrl = rawUrl.replace(/\/+$/, "");
  return cleanUrl.endsWith("/api") ? cleanUrl : `${cleanUrl}/api`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
