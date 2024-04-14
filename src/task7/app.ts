import mongoose from 'mongoose';
import { addInitialUsers } from './user/user.service';
import { addInitialProducts } from './product/product.service';
import { addInitialCarts } from './cart/cart.service';
import { addInitialOrders } from './order/order.service';

const uri: string = 'mongodb://localhost:27017';

mongoose
  .connect(uri, {
    user: 'root',
    pass: 'nodegmp',
    dbName: 'mongodb',
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
