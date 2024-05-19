import config from './orm.config';
import 'reflect-metadata';
import http from 'http';
import express, { Express, NextFunction, Response, Request } from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { Socket } from 'net';
import morgan from 'morgan';
import winston, { Logger } from 'winston';

import profileCartRouter from './cart/cart.controller';
import productsRouter from './product/product.controller';
import authRouter from './user/user.controller';
import errorHandler from './utils/errorHandler';
import { isAuthenticated } from './utils/isAuthenticated';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CartModel } from './cart/cart.entity';
import { CartItemModel } from './cart/cartItem.entity';
import { OrderModel } from './order/order.entity';
import { UserModel } from './user/user.entity';
import { ProductModel } from './product/product.entity';
import envConfig from './utils/envConfig';
import shutdown from './utils/shutdown';
import healthRouter from './health/health.controller';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  productRepository: EntityRepository<ProductModel>;
  userRepository: EntityRepository<UserModel>;
  cartItemRepository: EntityRepository<CartItemModel>;
  cartRepository: EntityRepository<CartModel>;
  orderRepository: EntityRepository<OrderModel>;
  connections: Socket[];
  logger: Logger;
};

export const app: Express = express();
const port: string = envConfig.API_PORT;

const init = async (): Promise<void> => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.productRepository = DI.orm.em.getRepository(ProductModel);
  DI.userRepository = DI.orm.em.getRepository(UserModel);
  DI.cartItemRepository = DI.orm.em.getRepository(CartItemModel);
  DI.cartRepository = DI.orm.em.getRepository(CartModel);
  DI.orderRepository = DI.orm.em.getRepository(OrderModel);
  DI.connections = [];
  DI.logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        level: (process.env.NODE_ENV || '').trim() === 'production' ? 'info' : 'debug',
      }),
    ],
  });
  DI.logger.debug('App is started');

  app.use(express.json());
  app.use(morgan('[:date[web]] INFO :method :url - :response-time[0] ms'));
  app.use((req: Request, res: Response, next: NextFunction) => RequestContext.create(DI.orm.em, next));

  app.use('/api/profile/cart', isAuthenticated, profileCartRouter, errorHandler);
  app.use('/api/products', isAuthenticated, productsRouter, errorHandler);
  app.use('/api/auth', authRouter, errorHandler);
  app.use('/api/health', healthRouter, errorHandler);

  DI.server = app.listen(port, () => {
    DI.logger.info(`MikroORM express TS app started at http://localhost:${port}`);
  });
  DI.server.on('connection', (connection: Socket) => {
    DI.connections.push(connection);

    connection.on('close', () => {
      DI.connections = DI.connections.filter((currentConnection: Socket): boolean => currentConnection !== connection);
    });
  });

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};
init();
