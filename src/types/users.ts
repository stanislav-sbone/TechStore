export interface User {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  isProfileCompleted: boolean;
}

export interface CompleteProfileResponse {
  message: string;
  user: User;
}

export interface GetCurrentUserResponse {
  user: User;
}

export interface CompleteProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
