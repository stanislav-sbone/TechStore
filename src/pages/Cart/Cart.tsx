import { type FC } from 'react';
import { useAppSelector } from '@/store/hooks';
import styles from './Cart.module.css';
import { Trash } from 'lucide-react';

const Cart: FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const products = useAppSelector((state) => state.products.items);

  const cartProducts = cartItems.map(({ productId, quantity }) => {
    const product = products.find((p) => p.id === productId);
    return { ...product, quantity };
  });

  const cartQuantity = cartProducts.reduce((acc, cur) => acc + cur.quantity, 0);

  // TODO: Сделать функцию подсчета суммы заказа с учетом скидки
  // const sumPriceCart = (cartProducts) => {

  // }

  if (cartProducts.length === 0) {
    return (
      <section className={styles.cart}>
        Ваша корзина пуста. Перейти к покупкам
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <h1 className={styles.title}>Корзина</h1>

      <div className={styles.content}>
        <div className={styles.items}>
          {cartProducts.map((item) => (
            <article key={item.id} className={styles.item}>
              <div className={styles.itemImagePlaceholder}>
                <img
                  src={item.images![0]}
                  alt={item.title}
                  className={styles.image}
                />
              </div>

              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h2 className={styles.itemName}>{item.title}</h2>

                  <button className={styles.removeButton}>
                    <Trash size={16} />
                  </button>
                </div>

                <div className={styles.itemDetails}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceLabel}>Цена</span>
                    <span className={styles.priceValue}>
                      {item.price!.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>

                  <div className={styles.quantityBlock}>
                    <span className={styles.quantityLabel}>Количество</span>
                    <div className={styles.quantityControls}>
                      <button className={styles.quantityButton}>−</button>
                      <span className={styles.quantityValue}>
                        {item.quantity}
                      </span>
                      <button className={styles.quantityButton}>+</button>
                    </div>
                  </div>

                  <div className={styles.itemTotalBlock}>
                    <span className={styles.itemTotalLabel}>Сумма</span>
                    <span className={styles.itemTotalValue}>
                      {(item.price! * item.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Итого</h2>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Товары</span>
            <span className={styles.summaryValue}>{cartQuantity}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Сумма заказа</span>
            <span className={styles.summaryValue}>—</span>
          </div>

          <button className={styles.checkoutButton}>
            Перейти к оформлению
          </button>

          <button className={styles.clearButton}>Очистить корзину</button>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
