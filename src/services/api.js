import axios from "axios";

const api = axios.create({
  baseURL: "https://apizombie.herokuapp.com",
  // baseURL: "http://127.0.0.1:3333",
});

export default api;
