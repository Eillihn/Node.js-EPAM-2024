import mongoose from 'mongoose';
import { addInitialUsers } from './user/user.service';
import { addInitialProducts } from './product/product.service';
import { addInitialCarts } from './cart/cart.service';
import { addInitialOrders } from './order/order.service';

const { DB_URI, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, DB_NAME } = process.env;
const uri: string = 'mongodb://localhost:27017';

mongoose
  .connect(DB_URI || uri, {
    user: MONGO_INITDB_ROOT_USERNAME,
    pass: MONGO_INITDB_ROOT_PASSWORD,
    dbName: DB_NAME,
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
