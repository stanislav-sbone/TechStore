import type { User } from './user';

export interface AuthSuccessResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
