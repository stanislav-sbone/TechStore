import { FAVORITES } from '../data/favorites';
import { USERS } from '../data/users';

interface updateCurrentUserParams {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export const getCurrentUser = async (userId: string) => {
  const userData = USERS.find((user) => user.userId === userId);

  if (!userData) {
    throw new Error('Пользователь не найден');
  }

  return {
    user: {
      userId: userData.userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      isProfileCompleted: userData.isProfileCompleted,
    },
  };
};

export const updateCurrentUser = async ({
  userId,
  email,
  firstName,
  lastName,
  phone,
  address,
}: updateCurrentUserParams) => {
  const userData = USERS.find((user) => user.userId === userId);

  if (!userData) {
    throw new Error('Пользователь не найден');
  }

  const normalivedEmail = email.trim().toLowerCase();
  const existingUser = USERS.find((user) => user.email === normalivedEmail);

  if (existingUser && userData.userId !== userId) {
    throw new Error('Аккаунт с таким email уже существует');
  }

  userData.email = normalivedEmail;
  userData.firstName = firstName.trim();
  userData.lastName = lastName.trim();
  userData.phone = phone.trim();
  userData.address = address.trim();
  userData.isProfileCompleted = true;

  return {
    message: 'Данные обновлены',
    user: {
      userId: userData.userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      isProfileCompleted: userData.isProfileCompleted,
    },
  };
};

export const getFavoritesByUserId = async (userId: string) => {
  const result = FAVORITES.find((item) => item.userId === userId);

  return {
    items: result?.items ?? [],
  };
};

export const setFavoritesByUserId = async (userId: string, items: number[]) => {
  const result = FAVORITES.find((item) => item.userId === userId);

  if (!result) {
    const newFavorites = {
      userId,
      items: items,
    };

    FAVORITES.push(newFavorites);

    return {
      userId,
      items: newFavorites.items,
    };
  }

  result.items = items;

  return {
    items: result.items,
  };
};
