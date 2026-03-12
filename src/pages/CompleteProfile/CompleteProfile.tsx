import styles from './CompleteProfile.module.css';

const CompleteProfile = () => {
  return (
    <div className={styles.complete}>
      <div className={styles.card}>
        <h1 className={styles.title}>Заполните данные</h1>
        <p className={styles.subtitle}>
          Укажите основные данные для оформления заказов и доставки
        </p>

        <form className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="firstName" className={styles.label}>
              Имя
            </label>
            <input
              type="text"
              id="firstName"
              className={styles.input}
              placeholder="Иван"
              autoComplete="given-name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName" className={styles.label}>
              Фамилия
            </label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              placeholder="Иванов"
              autoComplete="family-name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Номер телефона
            </label>
            <input
              type="tel"
              id="phone"
              className={styles.input}
              placeholder="+79876543210"
              autoComplete="tel"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="address" className={styles.label}>
              Адрес доставки
            </label>
            <input
              type="text"
              id="address"
              className={styles.input}
              placeholder="г. Москва, ул. Тверская, д. 1"
              autoComplete="street-address"
            />
          </div>

          <button type="submit" className={styles.submit}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
