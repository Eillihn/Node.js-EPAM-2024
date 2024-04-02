import { Request } from 'express';

import { CartEntity } from '../cart/cart.repository';
import { UserEntity, UserToken } from '../user/user.repository';
import { OrderEntity } from '../order/order.repository';
import { ProductEntity } from '../product/product.repository';

export interface AuthenticatedRequest extends Request {
  user?: UserEntity;
}

export interface ErrorResponse {
  message: string;
}

export interface CartResponse {
  cart: CartEntity;
  total: number;
}

export interface SuccessResponse {
  success: true;
}

export interface OrderResponse extends OrderEntity {}

export type ProductsResponse = ProductEntity[] | ProductEntity;

export type UsersResponse = UserEntity | UserToken;
