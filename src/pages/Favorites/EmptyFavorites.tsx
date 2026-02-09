import { HomeLink } from '@/components/HomeLink';
import styles from './Favorites.module.css';

const EmptyFavorites = () => {
  return (
    <div className={styles.empty}>
      <img
        src="/favorites.png"
        alt="emptyFavorites"
        className={styles.emptyImage}
      />
      <p className={styles.message}>Ваш список избранных товаров сейчас пуст</p>
      <p className={styles.submessage}>
        Вы можете добавить понравившиеся товары в избранное в каталоге на
        главной странице
      </p>
      <HomeLink />
    </div>
  );
};

export default EmptyFavorites;
