import api from "../api/axios.js";
import { mockStore } from "./mockData.js";

const getMembers = async () => {
  try {
    const response = await api.get("/members");
    return response.data;
  } catch {
    return mockStore.users.filter((user) => user.role === "MEMBER");
  }
};

export default { getMembers };
