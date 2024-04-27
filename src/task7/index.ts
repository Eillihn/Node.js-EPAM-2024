import express, { Express } from 'express';
import profileCartRouter from './cart/cart.controller';
import productsRouter from './product/product.controller';
import authRouter from './user/user.controller';
import errorHandler from './utils/errorHandler';
import { isAuthenticated } from './utils/isAuthenticated';
import './db';

const app: Express = express();

app.use(express.json());

app.use('/api/profile/cart', isAuthenticated, profileCartRouter, errorHandler);
app.use('/api/products', isAuthenticated, productsRouter, errorHandler);
app.use('/api/auth', authRouter, errorHandler);

app.listen(8000, (): void => {
  console.log('Server is started');
});

