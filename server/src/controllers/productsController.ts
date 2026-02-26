import { Request, Response } from 'express';
import { products } from '../data/products';
import { findProductById } from '../services/productsService';

export const getProducts = (_req: Request, res: Response): void => {
  res.json(products);
};

export const getProductById = (req: Request, res: Response): void => {
  const { productId } = req.params;

  const id = Number(productId);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Некорректный идентификатор товара' });
    return;
  }

  const product = findProductById(id);

  if (!product) {
    res.status(404).json({ message: 'Товар не найден' });
    return;
  }

  res.json(product);
};
