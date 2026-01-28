import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.logo}>TechStore</h1>
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Искать в TechStore" />
        </div>
        <div className={styles.buttons}>buttons</div>
      </div>
    </header>
  );
};

export default Header;
