import { registerUser } from "../apis/AuthApi";
import type { RegisterRequest } from "../interfaces/RegisterRequest";

export const registerUserService = async (data: RegisterRequest) => {
  const response = await registerUser(data);
  return response.data;
}
