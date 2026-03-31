import type { FC } from 'react';
import styles from './ProfileAddress.module.css';

interface ProfileAddressProps {
  address: string;
}

const ProfileAddress: FC<ProfileAddressProps> = ({ address }) => {
  return (
    <section className={styles.address}>
      <h2 className={styles.label}>Адрес доставки</h2>

      <div className={styles.card}>
        <p className={styles.value}>{address}</p>
      </div>
    </section>
  );
};

export default ProfileAddress;
