export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}