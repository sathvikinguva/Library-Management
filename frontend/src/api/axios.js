import axios from "axios";
import { loadAuth } from "../utils/storage.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const auth = loadAuth();
  if (auth?.token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export const login = async (payload) => {
  const response = await api.post("/login", payload);
  return response.data;
};

export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const getAvailableBooks = async () => {
  const response = await api.get("/books/available");
  return response.data;
};

export const searchBooks = async (query) => {
  const response = await api.get("/books/search", { params: { query } });
  return response.data;
};

export const addBook = async (payload) => {
  const response = await api.post("/books", payload);
  return response.data;
};

export const getIssues = async () => {
  const response = await api.get("/issues");
  return response.data;
};

export const issueBook = async (payload) => {
  const response = await api.post("/issues/issue", payload);
  return response.data;
};

export const returnBook = async (issueId) => {
  const response = await api.put(`/issues/return/${issueId}`);
  return response.data;
};

export const getMembers = async () => {
  const response = await api.get("/members");
  return response.data;
};

export const getMember = async (memberId) => {
  const response = await api.get(`/members/${memberId}`);
  return response.data;
};

export const getMemberIssues = async (memberId) => {
  const response = await api.get(`/members/${memberId}/issues`);
  return response.data;
};

export const registerMember = async (payload) => {
  const response = await api.post("/members", payload);
  return response.data;
};

export default api;
