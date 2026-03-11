import { Link, useNavigate } from 'react-router';
import { ROUTES } from '@/routes/constants/routes';
import { registerSchema, type RegisterFormData } from './register.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/services/auth/authApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Register.module.css';

const Register = () => {
  const {
    register,
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
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState<boolean>(false);

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

  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>
          Создайте аккаунт, чтобы управлять своими заказами, избранным и
          корзиной
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="email@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              {...register('email')}
            />

            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={isVisiblePassword ? 'text' : 'password'}
                id="password"
                className={styles.input}
                placeholder="Придумайте пароль"
                autoComplete="new-password"
                disabled={isSubmitting}
                {...register('password')}
              />
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
            </div>

            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Подтверждение пароля
            </label>

            <div className={styles.passwordWrapper}>
              <input
                type={isVisibleConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className={styles.input}
                placeholder="Повторите пароль"
                autoComplete="new-password"
                disabled={isSubmitting}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setIsVisibleConfirmPassword((prev) => !prev)}
                className={styles.passwordButton}
                disabled={isSubmitting}
              >
                {isVisibleConfirmPassword ? (
                  <EyeOff size={20} color="#4a5568" />
                ) : (
                  <Eye size={20} color="#4a5568" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                id="personalData"
                className={styles.checkboxInput}
                disabled={isSubmitting}
                {...register('personalData')}
              />
              <label htmlFor="personalData" className={styles.checkboxLabel}>
                Я соглашаюсь на обработку моих персональных данных и принимаю{' '}
                <button type="button" className={styles.checkboxLink}>
                  политику конфиденциальности
                </button>
              </label>
            </div>
            {errors.personalData && (
              <span className={styles.error}>
                {errors.personalData.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            Зарегистрироваться
          </button>
        </form>

        <p className={styles.footer}>
          Уже есть аккаунт?{' '}
          <Link to={ROUTES.LOGIN} className={styles.loginLink}>
            Войдите в систему
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
