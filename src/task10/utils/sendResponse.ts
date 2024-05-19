import { Response } from 'express';
import { CartResponse, OrderResponse, ProductsResponse, SuccessResponse, UsersResponse } from './models';

export interface Message {
  info: string;
}

export default (
  res: Response,
  statusCode: number,
  data: CartResponse | SuccessResponse | OrderResponse | ProductsResponse | UsersResponse | Message | null,
  error: string | null,
) => res.status(statusCode).send({ data, error });
