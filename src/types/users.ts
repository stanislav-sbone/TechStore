export interface User {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  isProfileCompleted: boolean;
}

export interface updateProfileResponse {
  message: string;
  user: User;
}

export interface GetCurrentUserResponse {
  user: User;
}

export interface updateProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
}
