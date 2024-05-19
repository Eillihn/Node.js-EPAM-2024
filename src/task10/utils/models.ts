import { Request } from 'express';

import { UserModel, UserToken } from '../user/user.entity';
import { ProductModel } from '../product/product.entity';
import { CartModel } from '../cart/cart.entity';
import { OrderModel } from '../order/order.entity';

export interface AuthenticatedRequest extends Request {
  user?: UserModel;
}

export interface ErrorResponse {
  message: string;
}

export interface CartResponse {
  cart: CartModel;
  total: number;
}

export interface SuccessResponse {
  success: true;
}

export interface OrderResponse extends OrderModel {}

export type ProductsResponse = ProductModel[] | ProductModel;

export type UsersResponse = UserModel | UserToken;
