import axios from 'axios';
import type {
  FavoritesResponse,
  GetCurrentUserResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/types/user';

const API_URL = import.meta.env.VITE_API_URL;

export const updateProfile = async (
  data: UpdateProfileRequest,
  token: string
): Promise<UpdateProfileResponse> => {
  try {
    const response = await axios.patch<UpdateProfileResponse>(
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

export const getFavorites = async (
  token: string
): Promise<FavoritesResponse> => {
  try {
    const response = await axios.get<FavoritesResponse>(
      `${API_URL}/users/me/favorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Ошибка получения избранных товаров', error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message || 'Ошибка получения избранных товаров');
    }

    throw new Error('Ошибка получения избранных товаров');
  }
};

export const updateFavorites = async (
  favorites: number[],
  token: string
): Promise<FavoritesResponse> => {
  try {
    const response = await axios.put<FavoritesResponse>(
      `${API_URL}/users/me/favorites`,
      { items: favorites },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Ошибка обновления избранных товаров', error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message || 'Ошибка обновления избранных товаров');
    }

    throw new Error('Ошибка обновления избранных товаров');
  }
};
