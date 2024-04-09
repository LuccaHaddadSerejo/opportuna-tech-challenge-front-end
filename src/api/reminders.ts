import axios from "axios";

export const remindersApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 50000,
});
