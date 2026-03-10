import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  email: string;
}

const ACCESS_TOKEN_EXPIRES_IN = '24h';

export const generateAccessToken = (userId: string, email: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET не установлен');
  }

  const payload: JwtPayload = {
    userId: userId,
    email: email,
  };

  return jwt.sign(payload, secret, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET не установлен');
  }

  const decoded = jwt.verify(token, secret);

  if (
    typeof decoded !== 'object' ||
    decoded === null ||
    !('userId' in decoded) ||
    !('email' in decoded)
  ) {
    throw new Error('Некорректный токен');
  }

  return {
    userId: String(decoded.userId),
    email: String(decoded.email),
  };
};
