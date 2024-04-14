import express, { Router, Response } from 'express';
import { addProducts, deleteCart, getCart, getTotalCart } from './cart.service';
import { AuthenticatedRequest } from '../utils/models';

import { getProduct } from '../product/product.service';
import { createOrder } from '../order/order.service';
import { AddProductsSchema, CreateOrderSchema } from '../utils/validation';
import sendResponse from '../utils/sendResponse';
import { ProductEntity } from '../product/product.entity';
import { OrderDetailsEntity, OrderEntity } from '../order/order.entity';
import { AddCartItemEntity, CartEntity } from './cart.entity';

const profileCartRouter: Router = express.Router();

profileCartRouter.get('/', (req: AuthenticatedRequest, res: Response): void => {
  sendResponse(res, 200, getTotalCart(req.user!), null);
});
profileCartRouter.put('/', (req: AuthenticatedRequest, res: Response): void => {
  const addProductsEntity: AddCartItemEntity = req.body as AddCartItemEntity;
  const { value, error } = AddProductsSchema.validate(addProductsEntity);
  if (error) {
    sendResponse(res, 400, null, error.message);
    return;
  }
  const product: ProductEntity | undefined = getProduct(value.productId);
  if (!product) {
    sendResponse(res, 404, null, 'Products are not valid');
    return;
  }

  const isAdded: boolean = addProducts(req.user!, { product, count: value.count });
  if (isAdded) {
    sendResponse(res, 200, getTotalCart(req.user!), null);
  } else {
    sendResponse(res, 404, null, 'Cart was not found');
  }
});
profileCartRouter.delete('/', (req: AuthenticatedRequest, res: Response): void => {
  const isDeleted = deleteCart(req.user!);
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
profileCartRouter.post('/checkout', (req: AuthenticatedRequest, res: Response): void => {
  const cart: CartEntity | undefined = getCart(req.user!);
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
  const order: OrderEntity = createOrder(req.user!, cart, value);
  sendResponse(res, 200, order, null);
});

export default profileCartRouter;
