import type { FC } from 'react';
import styles from './UserData.module.css';

interface UserDataProps {
  lastName: string;
  firstName: string;
  phone: string;
  address: string;
}

const UserData: FC<UserDataProps> = ({
  lastName,
  firstName,
  phone,
  address,
}) => {
  return (
    <>
      <p className={styles.dataGrid}>
        <div className={styles.dataWrapper}>
          <p className={styles.dataLabel}>Фамилия</p>
          <p className={styles.dataValue}>{lastName}</p>
        </div>
        <div className={styles.dataWrapper}>
          <p className={styles.dataLabel}>Имя</p>
          <p className={styles.dataValue}>{firstName}</p>
        </div>
        <div className={styles.dataWrapper}>
          <p className={styles.dataLabel}>Телефон</p>
          <p className={styles.dataValue}>{phone}</p>
        </div>
      </p>
      <div className={styles.dataWrapper}>
        <p className={styles.dataLabel}>Адрес доставки</p>
        <p className={styles.dataValue}>{address}</p>
      </div>
    </>
  );
};

export default UserData;
