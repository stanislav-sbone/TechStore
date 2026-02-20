import { type FC } from 'react';
import {
  CartClearModal,
  CartProductCard,
  CartSummary,
  EmptyCart,
} from './components';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useCart } from '@/hooks/useCart';
import styles from './Cart.module.css';

const Cart: FC = () => {
  useDocumentTitle('Корзина');
  const {
    cartProducts,
    cartQuantity,
    sumPrice,
    sumPriceWithDiscount,
    isClearModalOpen,
    openClearModal,
    closeClearModal,
  } = useCart();

  if (cartProducts.length === 0) {
    return (
      <section className={styles.cart}>
        <EmptyCart />
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
              image={item.images[0]}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              discount={item.discount}
            />
          ))}
        </div>

        <CartSummary
          cartQuantity={cartQuantity}
          sumPriceWithDiscount={sumPriceWithDiscount}
          sumPrice={sumPrice}
          openClearModal={openClearModal}
        />
      </div>

      {isClearModalOpen && <CartClearModal closeClearModal={closeClearModal} />}
    </section>
  );
};

export default Cart;
