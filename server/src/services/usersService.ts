import { USERS } from '../data/users';

interface CompleteUserProfileParams {
  userId: string;
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

export const completeUserProfile = async ({
  userId,
  firstName,
  lastName,
  phone,
  address,
}: CompleteUserProfileParams) => {
  const userData = USERS.find((user) => user.userId === userId);

  if (!userData) {
    throw new Error('Пользователь не найден');
  }

  userData.firstName = firstName.trim();
  userData.lastName = lastName.trim();
  userData.phone = phone.trim();
  userData.address = address.trim();
  userData.isProfileCompleted = true;

  return {
    message: 'Профиль успешно заполнен',
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
