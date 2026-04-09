import type { FC } from 'react';
import { customerGrades, type GradeName } from '@/constants/customerGrades';
import styles from './ProfileSidebar.module.css';

interface ProfileSidebarProps {
  initials: string;
  fullName: string;
  email: string;
  amountOrders: number;
  onLogout: () => void;
  openEditModal: () => void;
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({
  initials,
  fullName,
  email,
  amountOrders,
  onLogout,
  openEditModal,
}) => {
  const getGradeByOrders = (ordersCount: number): GradeName => {
    const customerGrade = customerGrades.find(
      (grade) =>
        ordersCount >= grade.minOrders &&
        (grade.maxOrders === null || ordersCount <= grade.maxOrders)
    );

    return customerGrade?.name ?? 'Новый покупатель';
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.avatar}>{initials}</div>

        <div className={styles.sidebarInfo}>
          <h2 className={styles.userName}>{fullName}</h2>
          <p className={styles.userEmail}>{email}</p>
        </div>
      </div>

      <div className={styles.sidebarMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Статус</span>
          <span className={styles.metaValue}>
            {getGradeByOrders(amountOrders)}
          </span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Всего заказов</span>
          <span className={styles.metaValue}>{amountOrders}</span>
        </div>
      </div>

      <div className={styles.sidebarActions}>
        <button
          type="button"
          className={styles.editButton}
          onClick={openEditModal}
        >
          Редактировать профиль
        </button>
        <button
          type="button"
          className={styles.logoutButton}
          onClick={onLogout}
        >
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
