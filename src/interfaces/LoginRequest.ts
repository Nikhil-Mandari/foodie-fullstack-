export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
}
