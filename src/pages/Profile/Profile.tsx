import styles from './Profile.module.css';

const Profile = () => {
  return (
    <section className={styles.profile}>
      <h1 className={styles.pageTitle}>Личный кабинет</h1>
      <p className={styles.pageSubtitle}>
        Управляйте персональной информацией и безопасностью аккаунта
      </p>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.avatar}>ИФ</div>

            <div className={styles.sidebarInfo}>
              <h2 className={styles.userName}>Иван Иванов</h2>
              <p className={styles.userEmail}>email@example.com</p>
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
            <button type="button" className={styles.logoutButton}>
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
                <span className={styles.value}>Иван</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Фамилия</span>
                <span className={styles.value}>Иванов</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Телефон</span>
                <span className={styles.value}>+7 (123) 456-78-90</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>email@example.com</span>
              </div>
            </div>
          </section>

          <section className={styles.address}>
            <h2 className={styles.sectionTitle}>Адрес доставки</h2>

            <div className={styles.addressCard}>
              <p className={styles.addressValue}>
                г. Москва, ул. Тверская, д. 1
              </p>
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
