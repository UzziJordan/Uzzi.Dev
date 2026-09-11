import api from "./api";

export const sendMessage = async (messageData) => {
  const response = await api.post(
    "/messages",
    messageData
  );

  return response.data;
};

export const getMessages = async () => {
  const response = await api.get("/messages");

  return response.data;
};

export const markMessageAsRead = async (id) => {
  const response = await api.patch(
    `/messages/${id}/read`
  );

  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(
    `/messages/${id}`
  );

  return response.data;
};



export const getMessageById = async (id) => {
  const response = await api.get(`/messages/${id}`);
  return response.data;
};

export const updateMessageStatus = async (id, read) => {
  const response = await api.patch(`/messages/${id}/status`, {
    read,
  });

  return response.data;
};
