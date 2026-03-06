import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';

export const authRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Необходим email и пароль',
      });
    }

    const result = await registerUser(email, password);

    return res.status(201).json(result);
  } catch (error) {
    console.error('Register error', error);

    return res.status(400).json({
      message: error instanceof Error ? error.message : 'Ошибка регистрации',
    });
  }
};

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Необходим email и пароль',
      });
    }

    const result = await loginUser(email, password);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Login error', error);

    return res.status(401).json({
      message: error instanceof Error ? error.message : 'Ошибка входа',
    });
  }
};

// export const getUser = (req: Request, res: Response) => {

// }
