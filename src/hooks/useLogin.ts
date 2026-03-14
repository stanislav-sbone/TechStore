import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { loginSchema, type LoginFormData } from '@/pages/Login/login.schema';
import { ROUTES } from '@/routes/constants/routes';
import { loginUser } from '@/services/auth/authApi';
import { getCart, getCurrentUser, getFavorites } from '@/services/user/userApi';
import { setCredentials } from '@/store/features/auth/authSlice';
import { setCart } from '@/store/features/cart/cartSlice';
import { setFavorites } from '@/store/features/favorites/favoritesSlice';
import { useAppDispatch } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const from = location.state?.from?.pathname || ROUTES.HOME;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);
      const currentUser = await getCurrentUser(result.token);
      const favorites = await getFavorites(result.token);
      const cart = await getCart(result.token);

      dispatch(setCredentials({ token: result.token, user: currentUser.user }));
      dispatch(setFavorites(favorites.items));
      dispatch(setCart(cart.items));
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);

      toast.success(result.message);
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка авторизации';

      toast.error(message);
    }
  };

  return {
    location,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isPasswordVisible,
    passwordValue,
    onSubmit,
    togglePasswordVisibility,
  };
};
