import {
  registerSchema,
  type RegisterFormData,
} from '@/pages/Register/register.schema';
import { ROUTES } from '@/routes/constants/routes';
import { registerUser } from '@/services/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
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
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

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
      const { email, password } = data;

      const result = await registerUser({ email, password });
      toast.success(result.message);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка регистрации';

      toast.error(message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
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
