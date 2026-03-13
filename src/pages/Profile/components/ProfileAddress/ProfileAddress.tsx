import type { FC } from 'react';
import styles from './ProfileAddress.module.css';

interface ProfileAddressProps {
  address: string;
}

const ProfileAddress: FC<ProfileAddressProps> = ({ address }) => {
  return (
    <section className={styles.address}>
      <h2 className={styles.addressTitle}>Адрес доставки</h2>

      <div className={styles.addressCard}>
        <p className={styles.addressValue}>{address}</p>
      </div>
    </section>
  );
};

export default ProfileAddress;
