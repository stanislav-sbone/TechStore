import bcrypt from 'bcrypt';
import { generateAccessToken } from '../utils/jwt';
import { db } from '../db/connection';
import { users } from '../db/schema/users';
import { eq } from 'drizzle-orm';
import { usersFavorites } from '../db/schema/favorites';
import { usersCart } from '../db/schema/cart';

export const registerUser = async (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail));

  if (userData.length) {
    throw new Error('Аккаунт с таким email уже существует');
  }

  const saltRounds = Number(process.env.SALT_ROUNDS);

  if (!Number.isInteger(saltRounds) || saltRounds <= 0) {
    throw new Error('SALT_ROUNDS должен быть положительным числом');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [newUser] = await db
    .insert(users)
    .values({ email: normalizedEmail, password_hash: hashedPassword })
    .returning();

  await db.insert(usersFavorites).values({ user_id: newUser.id });
  await db.insert(usersCart).values({ user_id: newUser.id });

  const token = generateAccessToken(newUser.id, newUser.email);

  return {
    message: 'Пользователь успешно зарегистрирован',
    token,
    user: {
      userId: newUser.id,
      email: newUser.email,
    },
  };
};

export const loginUser = async (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail));

  if (userData.length === 0) {
    throw new Error('Неверный email или пароль');
  }

  const user = userData[0];
  const isCorrectPassword = await bcrypt.compare(password, user.password_hash);

  if (!isCorrectPassword) {
    throw new Error('Неверный email или пароль');
  }

  const token = generateAccessToken(user.id, user.email);

  return {
    message: 'Успешная авторизация',
    token,
    user: {
      userId: user.id,
      email: user.email,
    },
  };
};
