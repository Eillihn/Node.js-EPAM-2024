import mongoose from 'mongoose';
import { addInitialUsers } from './user/user.service';
import { addInitialProducts } from './product/product.service';
import { addInitialCarts } from './cart/cart.service';
import { addInitialOrders } from './order/order.service';
import envConfig from './utils/envConfig';

const uri: string = 'mongodb://localhost:27017';

mongoose
  .connect(envConfig.DB_URI || uri, {
    user: envConfig.MONGO_INITDB_ROOT_USERNAME,
    pass: envConfig.MONGO_INITDB_ROOT_PASSWORD,
    dbName: envConfig.DB_NAME,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error: Error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });

const db: mongoose.Connection = mongoose.connection;

db.once('open', async (): Promise<void> => {
  console.log('Connected to MongoDB database.');
  await addInitialUsers();
  await addInitialProducts();
  await addInitialCarts();
  await addInitialOrders();
});
