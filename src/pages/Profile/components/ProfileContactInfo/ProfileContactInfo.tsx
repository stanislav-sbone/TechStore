import type { FC } from 'react';
import styles from './ProfileContactInfo.module.css';

interface ProfileContactInfoProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const ProfileContactInfo: FC<ProfileContactInfoProps> = ({
  firstName,
  lastName,
  phone,
  email,
}) => {
  return (
    <section className={styles.info}>
      <h2 className={styles.infoTitle}>Контактные данные</h2>

      <div className={styles.infoGrid}>
        <div className={styles.field}>
          <span className={styles.label}>Имя</span>
          <span className={styles.value}>{firstName}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Фамилия</span>
          <span className={styles.value}>{lastName}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Телефон</span>
          <span className={styles.value}>{phone}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{email}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileContactInfo;
