import axios from 'axios';
import type {
  CompleteProfileRequest,
  CompleteProfileResponse,
} from '@/types/users';

const API_URL = import.meta.env.VITE_API_URL;

export const completeProfle = async (
  data: CompleteProfileRequest,
  token: string
): Promise<CompleteProfileResponse> => {
  try {
    const response = await axios.patch<CompleteProfileResponse>(
      `${API_URL}/users/me`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка заполнения данных', error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message || 'Ошибка заполнения данных');
    }

    throw new Error('Ошибка заполнения данных');
  }
};
