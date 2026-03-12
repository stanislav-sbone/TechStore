import { Request, Response } from 'express';
import { completeUserProfile } from '../services/usersService';

export const authCompleteProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, address } = req.body;

    if (!firstName || !lastName || !phone || !address) {
      return res.status(400).json({
        message: 'Необходимо заполнить все данные',
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: 'Пользователь не авторизован',
      });
    }

    const result = await completeUserProfile({
      userId: req.user.userId,
      firstName,
      lastName,
      phone,
      address,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Complete profile error', error);

    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Ошибка заполнения профиля',
    });
  }
};
