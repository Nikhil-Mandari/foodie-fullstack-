import axiosInstance from "./axiosConfig";
import type { RegisterRequest } from "../interfaces/RegisterRequest";

export const registerUser = (data: RegisterRequest) => {
  console.log(data);
  return axiosInstance .post("/auth/signup", data);
};