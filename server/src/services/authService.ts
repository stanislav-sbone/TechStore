import { USERS } from '../data/users';
import { User } from '../types/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { generateAccessToken } from '../utils/jwt';

export const findUserByEmail = (email: string) => {
  return USERS.find((user) => user.email === email);
};

export const registerUser = async (email: string, password: string) => {
  const normalizeEmail = email.trim().toLowerCase();
  const userData = findUserByEmail(normalizeEmail);

  if (userData) {
    throw new Error('Аккаунт с таким email уже существует');
  }

  const saltRounds = Number(process.env.SALT_ROUNDS);

  if (!Number.isInteger(saltRounds) || saltRounds <= 0) {
    throw new Error('SALT_ROUNDS должен быть положительным числом');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user: User = {
    userId: uuidv4(),
    email: normalizeEmail,
    password: hashedPassword,
    isProfileCompleted: false,
  };

  USERS.push(user);

  const token = generateAccessToken(user.userId, user.email);

  return {
    message: 'Пользователь успешно зарегистрирован',
    token,
    user: {
      userId: user.userId,
      email: user.email,
    },
  };
};

export const loginUser = async (email: string, password: string) => {
  const userData = findUserByEmail(email);

  if (!userData) {
    throw new Error('Неверный email или пароль');
  }

  const isCorrectPassword = await bcrypt.compare(password, userData.password);

  if (!isCorrectPassword) {
    throw new Error('Неверный email или пароль');
  }

  const token = generateAccessToken(userData.userId, userData.email);

  return {
    message: 'Успешная авторизация',
    token,
    user: {
      userId: userData.userId,
      email: userData.email,
    },
  };
};
