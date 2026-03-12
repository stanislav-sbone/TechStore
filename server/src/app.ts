import express from 'express';
import cors from 'cors';
import productsRouter from './routes/productsRoutes';
import authRouter from './routes/authRoutes';
import usersRouter from './routes/usersRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products/', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

export default app;
