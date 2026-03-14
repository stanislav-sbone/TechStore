import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { getUserData, updateUser } from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/me', authenticate, getUserData);
usersRouter.patch('/me', authenticate, updateUser);

export default usersRouter;
