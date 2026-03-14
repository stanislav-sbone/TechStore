import {
  completeProfileSchema,
  type CompleteProfileData,
} from '@/pages/CompleteProfile/complete.schema';
import { ROUTES } from '@/routes/constants/routes';
import { updateProfile } from '@/services/user/userApi';
import { updateUser } from '@/store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useCompleteProfile = () => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileData>({
    resolver: zodResolver(completeProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.HOME;

  const onSubmit = async (data: CompleteProfileData) => {
    try {
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }

      if (!user) {
        throw new Error('Данные пользователя не загружены');
      }

      const requestData = { ...data, email: user.email };

      const result = await updateProfile(requestData, token);
      dispatch(updateUser(result.user));
      toast.success(result.message);
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка заполнения данных';

      toast.error(message);
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
