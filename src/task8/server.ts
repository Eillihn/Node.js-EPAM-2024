import config from './orm.config';
import 'reflect-metadata';
import http from 'http';
import express, { Express, NextFunction, Response, Request } from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';

import profileCartRouter from './cart/cart.controller';
import productsRouter from './product/product.controller';
import authRouter from './user/user.controller';
import errorHandler from './utils/errorHandler';
import { isAuthenticated } from './utils/isAuthenticated';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CartModel } from './cart/cart.entity';
import { CartItemModel } from './cart/cartItem.entity';
import { OrderModel } from './order/order.entity';
import { UserModel, UserPasswordModel } from './user/user.entity';
import { ProductModel } from './product/product.entity';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  productRepository: EntityRepository<ProductModel>;
  userRepository: EntityRepository<UserModel>;
  userPasswordRepository: EntityRepository<UserPasswordModel>;
  cartItemRepository: EntityRepository<CartItemModel>;
  cartRepository: EntityRepository<CartModel>;
  orderRepository: EntityRepository<OrderModel>;
};

export const app: Express = express();
const port: string = process.env.PORT || '8000';

const init = async (): Promise<void> => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.productRepository = DI.orm.em.getRepository(ProductModel);
  DI.userRepository = DI.orm.em.getRepository(UserModel);
  DI.userPasswordRepository = DI.orm.em.getRepository(UserPasswordModel);
  DI.cartItemRepository = DI.orm.em.getRepository(CartItemModel);
  DI.cartRepository = DI.orm.em.getRepository(CartModel);
  DI.orderRepository = DI.orm.em.getRepository(OrderModel);

  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => RequestContext.create(DI.orm.em, next));

  app.use('/api/profile/cart', isAuthenticated, profileCartRouter, errorHandler);
  app.use('/api/products', isAuthenticated, productsRouter, errorHandler);
  app.use('/api/auth', authRouter, errorHandler);

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS app started at http://localhost:${port}`);
  });
};

export const server = init();
