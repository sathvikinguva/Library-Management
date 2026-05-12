import api from "../api/axios.js";
import { mockStore } from "./mockData.js";

const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch {
    return [...mockStore.books];
  }
};

const getAvailableBooks = async () => {
  try {
    const response = await api.get("/books/available");
    return response.data;
  } catch {
    return mockStore.books.filter((book) => book.availability);
  }
};

const addBook = async (payload) => {
  try {
    const response = await api.post("/books", payload);
    return response.data;
  } catch {
    const book = {
      book_id: Date.now(),
      availability: true,
      ...payload
    };
    mockStore.books = [book, ...mockStore.books];
    return book;
  }
};

export default { getBooks, getAvailableBooks, addBook };
