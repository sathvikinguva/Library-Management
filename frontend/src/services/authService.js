import { login } from "../api/axios.js";

const authLogin = async ({ email, password }) => login({ email, password });

export default { login: authLogin };
