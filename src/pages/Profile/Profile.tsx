import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './Profile.module.css';
import { logout } from '@/store/features/auth/authSlice';
import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const Profile = () => {
  useDocumentTitle('Личный кабинет');
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch(logout());
  };

  if (!user) {
    return null;
  }

  const fullName =
    `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Пользователь';

  const initials =
    `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}` || '??';

  return (
    <section className={styles.profile}>
      <h1 className={styles.pageTitle}>Личный кабинет</h1>
      <p className={styles.pageSubtitle}>
        Управляйте персональной информацией и безопасностью аккаунта
      </p>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.avatar}>{initials}</div>

            <div className={styles.sidebarInfo}>
              <h2 className={styles.userName}>{fullName}</h2>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>

          <div className={styles.sidebarMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Статус</span>
              <span className={styles.metaValue}>Постоянный покупатель</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Всего заказов</span>
              <span className={styles.metaValue}>0</span>
            </div>
          </div>

          <div className={styles.sidebarActions}>
            <button type="button" className={styles.editButton}>
              Редактировать профиль
            </button>
            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogoutClick}
            >
              Выйти
            </button>
          </div>
        </aside>

        <div className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Контактные данные</h2>

            <div className={styles.infoGrid}>
              <div className={styles.field}>
                <span className={styles.label}>Имя</span>
                <span className={styles.value}>{user.firstName}</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Фамилия</span>
                <span className={styles.value}>{user.lastName}</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Телефон</span>
                <span className={styles.value}>{user.phone}</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{user.email}</span>
              </div>
            </div>
          </section>

          <section className={styles.address}>
            <h2 className={styles.sectionTitle}>Адрес доставки</h2>

            <div className={styles.addressCard}>
              <p className={styles.addressValue}>{user.address}</p>
              <p className={styles.addressHint}>
                В дальнейшем здесь можно будет добавить и редактировать адреса
                доставки.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Profile;
