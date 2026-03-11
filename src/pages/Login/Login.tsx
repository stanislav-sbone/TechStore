import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from './login.schema';
import { Link, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { toast } from 'react-toastify';
import { loginUser } from '@/services/auth/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/features/auth/authSlice';
import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Login.module.css';

const Login = () => {
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

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const from = location.state?.from?.pathname || ROUTES.HOME;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);

      dispatch(setCredentials({ token: result.token, user: result.user }));
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      toast.success(result.message);
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка авторизации';

      toast.error(message);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>
          Необходима авторизация для управления аккаунтом, избранным и корзиной
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              className={styles.input}
              {...register('email')}
            />

            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Пароль
              </label>

              <button type="button" className={styles.linkButton}>
                Забыли пароль?
              </button>
            </div>
            <div className={styles.passwordWrapper}>
              <input
                type={isVisiblePassword ? 'text' : 'password'}
                id="password"
                placeholder="Введите пароль"
                autoComplete="current-password"
                disabled={isSubmitting}
                className={styles.input}
                {...register('password')}
              />

              {Boolean(passwordValue) && (
                <button
                  type="button"
                  onClick={() => setIsVisiblePassword((prev) => !prev)}
                  className={styles.passwordButton}
                  disabled={isSubmitting}
                >
                  {isVisiblePassword ? (
                    <EyeOff size={20} color="#4a5568" />
                  ) : (
                    <Eye size={20} color="#4a5568" />
                  )}
                </button>
              )}
            </div>

            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            Войти
          </button>
        </form>
        <p className={styles.footer}>
          Нет аккаунта?{' '}
          <Link to={ROUTES.REGISTER} className={styles.linkButton}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
