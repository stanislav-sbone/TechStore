import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/features/auth/authSlice';
import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
  ProfileAddress,
  ProfileContactInfo,
  ProfileSidebar,
} from './components';
import styles from './Profile.module.css';

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
        <ProfileSidebar
          initials={initials}
          fullName={fullName}
          email={user.email}
          onLogout={handleLogoutClick}
        />

        <div className={styles.main}>
          <ProfileContactInfo
            firstName={user.firstName ?? '-'}
            lastName={user.lastName ?? '-'}
            phone={user.phone ?? '-'}
            email={user.email}
          />

          <ProfileAddress address={user.address ?? 'Адрес не указан'} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
