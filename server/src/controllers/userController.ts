import { Request, Response } from 'express';
import {
  getCurrentUser,
  getFavoritesByUserId,
  setFavoritesByUserId,
  updateCurrentUser,
} from '../services/userService';

export const getUserData = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Пользователь не авторизован',
      });
    }

    const result = await getCurrentUser(req.user.userId);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Get user data error', error);

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : 'Ошибка получения пользователя',
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, address, email } = req.body;

    if (!firstName || !lastName || !phone || !address || !email) {
      return res.status(400).json({
        message: 'Необходимо заполнить все данные',
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: 'Пользователь не авторизован',
      });
    }

    const result = await updateCurrentUser({
      userId: req.user.userId,
      email,
      firstName,
      lastName,
      phone,
      address,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Update profile error', error);

    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Ошибка заполнения профиля',
    });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Пользователь не авторизован',
      });
    }

    const userId = req.user.userId;
    const result = await getFavoritesByUserId(userId);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Get favorites error: ', error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Ошибка получения избранных товаров',
    });
  }
};

export const setFavorites = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Пользователь не авторизован',
      });
    }

    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: 'Необходим массив избранных товаров',
      });
    }

    const userId = req.user.userId;
    const result = await setFavoritesByUserId(userId, items);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Set favorites error: ', error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Ошибка сохранения избранных товаров',
    });
  }
};
