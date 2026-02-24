import { Link } from 'react-router';
import styles from './EmptyCart.module.css';

const EmptyCart = () => {
  return (
    <div className={styles.empty}>
      <img
        src="/common/EmptyCart.png"
        alt="EmptyCart"
        className={styles.image}
      />
      <h2 className={styles.text}>Ваша корзина пуста</h2>
      <p className={styles.subtext}>
        Добавьте товары из каталога, чтобы оформить заказ.
      </p>
      <button className={styles.button} type="button">
        <Link to="/">Перейти к покупкам</Link>
      </button>
    </div>
  );
};

export default EmptyCart;
