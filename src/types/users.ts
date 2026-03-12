export interface CompleteProfileResponse {
  message: string;
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
}

export interface CompleteProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
