export interface AuthSuccessResponse {
  message: string;
  token: string;
  user: {
    userId: string;
    email: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
