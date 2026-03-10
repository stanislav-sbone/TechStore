import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Отсутствует Authorization header',
      });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        message: 'Неверный формат токена',
      });
    }

    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);

    return res.status(401).json({
      message: 'Недействительный или просроченный токен',
    });
  }
};
