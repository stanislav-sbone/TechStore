import axios from 'axios';
import type {
  GetCurrentUserResponse,
  updateProfileRequest,
  updateProfileResponse,
} from '@/types/users';

const API_URL = import.meta.env.VITE_API_URL;

export const updateProfile = async (
  data: updateProfileRequest,
  token: string
): Promise<updateProfileResponse> => {
  try {
    const response = await axios.patch<updateProfileResponse>(
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

export const getCurrentUser = async (
  token: string
): Promise<GetCurrentUserResponse> => {
  try {
    const response = await axios.get<GetCurrentUserResponse>(
      `${API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных пользователя', error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message || 'Ошибка получения данных пользователя');
    }

    throw new Error('Ошибка получения данных пользователя');
  }
};
