import { Request } from 'express';

import { UserEntity, UserEntityDocument, UserToken } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from '../order/order.entity';
import { CartEntity } from '../cart/cart.entity';

export interface AuthenticatedRequest extends Request {
  user?: UserEntityDocument;
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
