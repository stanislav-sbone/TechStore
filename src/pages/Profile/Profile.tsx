import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/features/auth/authSlice';
import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
  ProfileAddress,
  ProfileContactInfo,
  ProfileEditModal,
  ProfileSidebar,
} from './components';
import styles from './Profile.module.css';
import { clearCart } from '@/store/features/cart/cartSlice';
import { clearFavorites } from '@/store/features/favorites/favoritesSlice';

const Profile = () => {
  useDocumentTitle('Личный кабинет');
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleLogoutClick = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearFavorites());
  };

  const handleOpenModalClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModalClick = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEditModalOpen) {
        setIsEditModalOpen(false);
      }
    };

    if (isEditModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isEditModalOpen]);

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
          openEditModal={handleOpenModalClick}
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

      {isEditModalOpen && (
        <ProfileEditModal closeModal={handleCloseModalClick} />
      )}
    </section>
  );
};

export default Profile;
