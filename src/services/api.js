import axios from "axios";

const api = axios.create({
  baseURL: "https://apizombie.herokuapp.com",
});

export default api;
