import express from 'express';
import cors from 'cors';
import productsRouter from './routes/productsRoutes';
import authRouter from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products/', productsRouter);
app.use('/api/auth', authRouter);

export default app;
