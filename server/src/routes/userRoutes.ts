import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import {
  getFavorites,
  getUserData,
  setFavorites,
  updateUser,
} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/me', authenticate, getUserData);
userRouter.patch('/me', authenticate, updateUser);

userRouter.get('/me/favorites', authenticate, getFavorites);
userRouter.put('/me/favorites', authenticate, setFavorites);

export default userRouter;
