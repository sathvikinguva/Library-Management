import api from "../api/axios.js";
import { mockStore } from "./mockData.js";

const login = async ({ email, password }) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch {
    const user = mockStore.users.find((entry) => entry.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return {
      user,
      token: "mock-token"
    };
  }
};

export default { login };
