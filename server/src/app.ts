import express from 'express';
import cors from 'cors';
import productsRouter from './routes/productsRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', productsRouter);

export default app;
