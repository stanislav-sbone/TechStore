import type { FormEvent } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>
          Необходима авторизация для управления аккаунтом, избранным и корзиной
        </p>

        <form className={styles.form} onSubmit={(event) => onSubmit(event)}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Пароль
              </label>
              <button className={styles.linkButton}>Забыли пароль?</button>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submit}>
            Войти
          </button>
        </form>
        <p className={styles.footer}>
          Нет аккаунта?{' '}
          <button className={styles.linkButton}>Зарегистрироваться</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
