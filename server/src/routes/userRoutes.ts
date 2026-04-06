import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import {
  getCart,
  getFavorites,
  getUserData,
  setCart,
  setFavorites,
  createOrder,
  updateUser,
  getOrders,
} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/me', authenticate, getUserData);
userRouter.patch('/me', authenticate, updateUser);

userRouter.get('/me/favorites', authenticate, getFavorites);
userRouter.put('/me/favorites', authenticate, setFavorites);

userRouter.get('/me/cart', authenticate, getCart);
userRouter.put('/me/cart', authenticate, setCart);

userRouter.post('/me/orders', authenticate, createOrder);
userRouter.get('/me/orders', authenticate, getOrders);

export default userRouter;
