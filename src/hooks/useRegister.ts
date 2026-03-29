import { AUTH_TOKEN_KEY } from '@/constants/auth';
import {
  registerSchema,
  type RegisterFormData,
} from '@/pages/Register/register.schema';
import { ROUTES } from '@/routes/constants/routes';
import { registerUser } from '@/services/auth/authApi';
import { setCredentials } from '@/store/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      personalData: false,
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const confirmPasswordValue = useWatch({
    control,
    name: 'confirmPassword',
    defaultValue: '',
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMessage('');
      const { email, password } = data;

      const result = await registerUser({ email, password });

      dispatch(setCredentials({ token: result.token, user: result.user }));
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      toast.success(result.message);
      navigate(ROUTES.COMPLETE, {
        state: { from: location.state?.from },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка регистрации';

      setErrorMessage(message);
      toast.error(message);
    }
  };

  return {
    location,
    register,
    handleSubmit,
    errors,
    errorMessage,
    isSubmitting,
    isPasswordVisible,
    passwordValue,
    confirmPasswordValue,
    isConfirmPasswordVisible,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    onSubmit,
  };
};
