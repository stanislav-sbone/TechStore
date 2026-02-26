import { Router } from 'express';
import { getProductById, getProducts } from '../controllers/productsController';

const productsRouter = Router();

productsRouter.get('/products', getProducts);
productsRouter.get('/products/:productId', getProductById);

export default productsRouter;
