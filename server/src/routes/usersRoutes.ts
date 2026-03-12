import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { authCompleteProfile } from '../controllers/usersController';

const usersRouter = Router();

usersRouter.patch('/me', authenticate, authCompleteProfile);

export default usersRouter;
