import api from "./api";

export const getContact = async () => {
  const response = await api.get("/contact");

  return response.data;
};

export const updateContact = async (contactData) => {
  const response = await api.put("/contact", contactData);

  return response.data;
};