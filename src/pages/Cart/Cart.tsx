import { type FC } from 'react';
import { useAppSelector } from '@/store/hooks';
import { CartProductCard, CartSummary } from './components';
import styles from './Cart.module.css';
import { sumPriceCart } from '@/components/utils/sumPriceCart';

const Cart: FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const products = useAppSelector((state) => state.products.items);

  const cartProducts = cartItems
    .map(({ productId, quantity }) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return null;
      return { ...product, quantity };
    })
    .filter((item) => item !== null);

  const cartQuantity = cartProducts.reduce((acc, cur) => acc + cur.quantity, 0);
  const sumPrice = sumPriceCart(cartProducts);

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
            <CartProductCard
              key={item.id}
              id={item.id}
              image={item.images![0]}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>

        <CartSummary cartQuantity={cartQuantity} sumPrice={sumPrice} />
      </div>
    </section>
  );
};

export default Cart;
