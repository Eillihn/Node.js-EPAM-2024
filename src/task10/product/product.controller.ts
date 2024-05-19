import express, { Response, Router } from 'express';
import { getAllProducts, getProduct } from './product.service';
import { AuthenticatedRequest } from '../utils/models';
import sendResponse from '../utils/sendResponse';
import { ProductModel } from './product.entity';
import { DI } from '../server';

const productsRouter: Router = express.Router();

productsRouter.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    sendResponse(res, 200, await getAllProducts(), null);
  } catch (e) {
    DI.logger.error(e);
  }
});
productsRouter.get('/:productId', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const productId: string = req.params.productId;
  const product: ProductModel | null = await getProduct(productId);
  if (!product) {
    sendResponse(res, 404, null, 'No product with such id');
  } else {
    sendResponse(res, 200, product, null);
  }
});

export default productsRouter;
