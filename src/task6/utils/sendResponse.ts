import { Response } from 'express';
import { CartResponse, OrderResponse, ProductsResponse, SuccessResponse, UsersResponse } from './models';

export default (
  res: Response,
  statusCode: number,
  data: CartResponse | SuccessResponse | OrderResponse | ProductsResponse | UsersResponse | null,
  error: string | null,
) => res.status(statusCode).send({ data, error });
