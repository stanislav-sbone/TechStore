import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  email: string;
}

const ACCESS_TOKEN_EXPIRES_IN = '24h';

export const generateAccessToken = (userId: string, email: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET не установлен');
  }

  const payload: JwtPayload = {
    userId: userId,
    email: email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};
