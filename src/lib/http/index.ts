import axios from "axios";

const BASE_URL = "https://daim-coffee.ru";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
