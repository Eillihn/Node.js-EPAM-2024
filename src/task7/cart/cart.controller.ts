import express, { Router, Response } from 'express';
import { addProducts, deleteProductsCart, getCart, getTotalCart } from './cart.service';
import { AuthenticatedRequest } from '../utils/models';

import { getProduct } from '../product/product.service';
import { createOrder } from '../order/order.service';
import { AddProductsSchema, CreateOrderSchema } from '../utils/validation';
import sendResponse from '../utils/sendResponse';
import { ProductEntityDocument } from '../product/product.entity';
import { OrderDetailsEntity, OrderEntity } from '../order/order.entity';
import { AddCartItemEntity, CartEntityDocument } from './cart.entity';

const profileCartRouter: Router = express.Router();

profileCartRouter.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  sendResponse(res, 200, await getTotalCart(req.user!), null);
});
profileCartRouter.put('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const addProductsEntity: AddCartItemEntity = req.body as AddCartItemEntity;
  const { value, error } = AddProductsSchema.validate(addProductsEntity);
  if (error) {
    sendResponse(res, 400, null, error.message);
    return;
  }
  const product: ProductEntityDocument | null = await getProduct(value.productId);
  if (!product) {
    sendResponse(res, 404, null, 'Products are not valid');
    return;
  }

  const isAdded: boolean = await addProducts(req.user!, product, value.count);
  if (isAdded) {
    sendResponse(res, 200, await getTotalCart(req.user!), null);
  } else {
    sendResponse(res, 404, null, 'Cart was not found');
  }
});
profileCartRouter.delete('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const isDeleted = await deleteProductsCart(req.user!);
  if (isDeleted) {
    sendResponse(
      res,
      200,
      {
        success: true,
      },
      null,
    );
  } else {
    sendResponse(res, 404, null, 'User has no cart');
  }
});

profileCartRouter.post('/checkout', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cart: CartEntityDocument | null = await getCart(req.user!);
  if (!cart || !cart.items.length) {
    sendResponse(res, 404, null, 'Cart is empty');
    return;
  }
  const orderDetailsEntity: OrderDetailsEntity = req.body as OrderDetailsEntity;
  const { value, error } = CreateOrderSchema.validate(orderDetailsEntity);
  if (error) {
    sendResponse(res, 400, null, error.message);
    return;
  }
  const order: OrderEntity = await createOrder(req.user!, cart, value);
  sendResponse(res, 200, order, null);
});

export default profileCartRouter;
