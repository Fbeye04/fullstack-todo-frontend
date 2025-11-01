import axios from "axios";
const API_URL = "http://localhost:5000/tasks";

export const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (newTitle) => {
  const response = await axios.post(API_URL, {
    title: newTitle,
    isDone: false,
  });
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
  return taskId;
};

export const updateTask = async (taskId, newTitle) => {
  const response = await axios.put(`${API_URL}/${taskId}`, { title: newTitle });
  return response.data;
};

export const toggleTaskStatus = async (taskId, newStatus) => {
  const response = await axios.put(`${API_URL}/${taskId}`, {
    isDone: newStatus,
  });
  return response.data;
};

export const clearCompletedTasks = async () => {
  const response = await axios.delete(`${API_URL}/completed`);
  return response.data;
};
