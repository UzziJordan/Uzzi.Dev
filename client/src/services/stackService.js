import api from "./api";

export const getStack = async () => {
  const response = await api.get("/stack");
  return response.data;
};

export const updateStack = async (stackData) => {
  const response = await api.put("/stack", stackData);

  return response.data;
};