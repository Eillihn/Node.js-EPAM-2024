import express, { Response, Router } from 'express';
import { getAllProducts, getProduct } from './product.service';
import { AuthenticatedRequest } from '../utils/models';
import sendResponse from '../utils/sendResponse';
import { ProductEntity } from './product.entity';

const productsRouter: Router = express.Router();

productsRouter.get('/', (req: AuthenticatedRequest, res: Response): void => {
  sendResponse(res, 200, getAllProducts(), null);
});
productsRouter.get('/:productId', (req: AuthenticatedRequest, res: Response): void => {
  const productId: string = req.params.productId;
  const product: ProductEntity | undefined = getProduct(productId);
  if (!product) {
    sendResponse(res, 404, null, 'No product with such id');
  } else {
    sendResponse(res, 200, product, null);
  }
});

export default productsRouter;
