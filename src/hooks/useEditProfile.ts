import {
  editProfileSchema,
  type EditProfileData,
} from '@/pages/Profile/components/ProfileEditModal/editProfile.schema';
import { updateProfile } from '@/services/user/userApi';
import { updateUser } from '@/store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useEditProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      phone: user?.phone ?? '',
      address: user?.address ?? '',
      email: user?.email ?? '',
    },
  });

  const onSubmit = async (data: EditProfileData) => {
    try {
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }

      const result = await updateProfile(data, token);
      dispatch(updateUser(result.user));
      toast.success(result.message);

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка заполнения данных';

      toast.error(message);
      return false;
    }
  };

  return { user, register, errors, isSubmitting, handleSubmit, onSubmit };
};
