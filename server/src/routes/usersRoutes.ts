import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import {
  authCompleteProfile,
  getUserData,
} from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/me', authenticate, getUserData);
usersRouter.patch('/me', authenticate, authCompleteProfile);

export default usersRouter;
