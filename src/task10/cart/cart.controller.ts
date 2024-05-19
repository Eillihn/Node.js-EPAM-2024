import express, { Router, Response } from 'express';
import { addProducts, deleteProductsCart, getNotEmptyCart, getTotalCart } from './cart.service';
import { AuthenticatedRequest } from '../utils/models';

import { getProduct } from '../product/product.service';
import { createOrder } from '../order/order.service';
import { AddProductsSchema, CreateOrderSchema } from '../utils/validation';
import sendResponse from '../utils/sendResponse';
import { OrderDetailsEntity, OrderModel } from '../order/order.entity';
import { AddCartItemEntity, CartModel } from './cart.entity';
import { ProductModel } from '../product/product.entity';
import { isAdmin } from "../utils/isAdmin";

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
  const product: ProductModel | null = await getProduct(value.productId);
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
profileCartRouter.delete('/', isAdmin, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const isDeleted: boolean = await deleteProductsCart(req.user!);
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
  const cart: CartModel | null = await getNotEmptyCart(req.user!);
  if (!cart) {
    sendResponse(res, 404, null, 'Cart is empty');
    return;
  }
  const orderDetailsEntity: OrderDetailsEntity = req.body as OrderDetailsEntity;
  const { value, error } = CreateOrderSchema.validate(orderDetailsEntity);
  if (error) {
    sendResponse(res, 400, null, error.message);
    return;
  }
  const order: OrderModel | null = await createOrder(cart, value);
  if (!order) {
    sendResponse(res, 400, null, 'Order was not created');
    return;
  }
  sendResponse(res, 200, order, null);
});

export default profileCartRouter;
