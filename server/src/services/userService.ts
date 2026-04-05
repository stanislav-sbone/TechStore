import { eq, inArray } from 'drizzle-orm';
import { db } from '../db/connection';
import { users } from '../db/schema/users';
import { CartItem } from '../types/cart';
import { usersFavorites } from '../db/schema/favorites';
import { usersCart } from '../db/schema/cart';
import { orders } from '../db/schema/orders';
import { products } from '../db/schema/products';

interface updateCurrentUserParams {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export const getCurrentUser = async (userId: string) => {
  const userData = await db.select().from(users).where(eq(users.id, userId));

  if (userData.length === 0) {
    throw new Error('Пользователь не найден');
  }

  const user = userData[0];

  return {
    user: {
      userId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      address: user.address,
      isProfileCompleted: user.is_profile_completed,
    },
  };
};

export const updateCurrentUser = async ({
  userId,
  email,
  firstName,
  lastName,
  phone,
  address,
}: updateCurrentUserParams) => {
  const userData = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.id, userId));

  if (userData.length === 0) {
    throw new Error('Пользователь не найден');
  }

  const existingUser = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0 && existingUser[0].id !== userId) {
    throw new Error('Аккаунт с таким email уже существует');
  }

  const updatedUser = await db
    .update(users)
    .set({
      email: email.trim().toLowerCase(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      is_profile_completed: true,
    })
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      email: users.email,
      firstName: users.first_name,
      lastName: users.last_name,
      phone: users.phone,
      address: users.address,
      isProfileCompleted: users.is_profile_completed,
    });

  return {
    message: 'Данные обновлены',
    user: updatedUser[0],
  };
};

export const getFavoritesByUserId = async (userId: string) => {
  const favorites = await db
    .select()
    .from(usersFavorites)
    .where(eq(usersFavorites.user_id, userId));

  if (favorites.length === 0) {
    return { items: [] };
  }

  return {
    items: favorites[0].items ?? [],
  };
};

export const setFavoritesByUserId = async (userId: string, items: number[]) => {
  const updatedFavorites = await db
    .update(usersFavorites)
    .set({ items: items })
    .where(eq(usersFavorites.user_id, userId))
    .returning({ items: usersFavorites.items });

  return {
    items: updatedFavorites[0].items ?? [],
  };
};

export const getCartByUserId = async (userId: string) => {
  const cart = await db
    .select()
    .from(usersCart)
    .where(eq(usersCart.user_id, userId));

  return {
    items: cart[0].items ?? [],
  };
};

export const setCartByUserId = async (userId: string, items: CartItem[]) => {
  const updatedCart = await db
    .update(usersCart)
    .set({ items: items })
    .where(eq(usersCart.user_id, userId))
    .returning({ items: usersCart.items });

  return {
    items: updatedCart[0].items ?? [],
  };
};

export const createUserOrder = async (userId: string) => {
  const newOrder = await db.transaction(async (tx) => {
    const cart = await tx
      .select()
      .from(usersCart)
      .where(eq(usersCart.user_id, userId));

    if (cart.length === 0) {
      throw new Error('Корзина не найдена');
    }

    const items = cart[0]?.items ?? [];

    if (items.length === 0) {
      throw new Error('Корзина пуста');
    }

    const productIds = items.map((item) => item.productId);

    const productsData = await tx
      .select({
        id: products.id,
        title: products.title,
        images: products.images,
        price: products.price,
        discount: products.discount ?? 0,
      })
      .from(products)
      .where(inArray(products.id, productIds));

    const productsMap = new Map(
      productsData.map((product) => [product.id, product])
    );

    const cartItemsWithData = items.map((item) => {
      const product = productsMap.get(item.productId);

      if (!product) {
        throw new Error(`Товар ${item.productId} не найден`);
      }

      return {
        productId: product.id,
        title: product.title,
        image: product.images?.[0] ?? '',
        quantity: item.quantity,
        price:
          product.discount !== null
            ? Math.round(product.price * (1 - product.discount))
            : product.price,
      };
    });

    const totalAmount = cartItemsWithData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const [order] = await tx
      .insert(orders)
      .values({
        user_id: userId,
        items: cartItemsWithData,
        totalAmount: totalAmount,
      })
      .returning({
        orderId: orders.orderNumber,
        userId: orders.user_id,
        items: orders.items,
        totalAmount: orders.totalAmount,
        created_at: orders.created_at,
      });

    await tx
      .update(usersCart)
      .set({ items: [] })
      .where(eq(usersCart.user_id, userId));

    return order;
  });

  return newOrder;
};
