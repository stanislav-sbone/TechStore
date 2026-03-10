import { Router } from 'express';
import { authLogin, authRegister, authMe } from '../controllers/authController';
import { authenticate } from '../middlewares/authenticate';

const authRouter = Router();

authRouter.post('/register', authRegister);
authRouter.post('/login', authLogin);
authRouter.get('/me', authenticate, authMe);

export default authRouter;
