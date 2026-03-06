import { Router } from 'express';
import { authLogin, authRegister } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/register', authRegister);
authRouter.post('/login', authLogin);
// authRouter.get('/me')

export default authRouter;
