export interface User {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  isProfileCompleted: boolean;
}

export interface UpdateProfileResponse {
  message: string;
  user: User;
}

export interface GetCurrentUserResponse {
  user: User;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
}

export interface FavoritesResponse {
  items: number[];
}
