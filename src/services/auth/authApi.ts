import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/auth';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/auth/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка регистрации', error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message || 'Ошибка регистрации');
    }

    throw new Error('Ошибка регистрации');
  }
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка авторизации', error);

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message || 'Ошибка авторизации');
    }

    throw new Error('Ошибка авторизации');
  }
};
