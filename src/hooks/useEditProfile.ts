import {
  editProfileSchema,
  type EditProfileData,
} from '@/pages/Profile/components/ProfileEditModal/editProfile.schema';
import { useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useEditProfile = () => {
  const user = useAppSelector((state) => state.auth.user);

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

  const onSubmit = (data: EditProfileData) => {
    console.log('редактирование данных', data);
  };

  return { user, register, errors, isSubmitting, handleSubmit, onSubmit };
};
