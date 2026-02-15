import type { FC, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/features/favorites/favoritesSlice';
import { Link } from 'react-router';
import { addToCart } from '@/store/features/cart/cartSlice';
import { FavoriteButton, ProductPrice, QuantityControl } from './components';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  discount: number | undefined;
  inStock: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  image,
  name,
  category,
  price,
  discount,
  inStock,
}) => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const isFavorite = favorites.includes(id);
  const cartItem = cart.find((product) => product.productId === id);

  const handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(toggleFavorite(id));
  };

  const handleCartClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addToCart(id));
  };

  return (
    <Link to={`/product/${id}`} className={styles.link}>
      <div className={styles.card}>
        {!inStock && (
          <div className={styles.outOfStockOverlay}>
            <p className={styles.outOfStockText}>Нет в наличии</p>
          </div>
        )}

        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.image} />
        </div>

        <div className={styles.content}>
          <h4 className={styles.category}>{category}</h4>
          <h3 className={styles.name}>{name}</h3>

          <div className={styles.footer}>
            <ProductPrice price={price} discount={discount} />
            {cartItem ? (
              <QuantityControl productId={id} cartItem={cartItem} />
            ) : (
              <button
                className={styles.cartButton}
                disabled={!inStock}
                onClick={handleCartClick}
              >
                В корзину
              </button>
            )}
          </div>
        </div>
        <FavoriteButton
          isFavorite={isFavorite}
          handleFavoriteClick={handleFavoriteClick}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
