import { addOrder, createOrderEntity } from './order.repository';
import { deleteCart } from '../cart/cart.service';

import { UserEntityDocument } from '../user/user.entity';
import { ORDER_STATUS, OrderDetailsEntity, OrderEntity, OrderEntityDocument, OrderModel } from './order.entity';
import { CartEntityDocument } from '../cart/cart.entity';

export const createOrder = async (user: UserEntityDocument, cart: CartEntityDocument, details: OrderDetailsEntity): Promise<OrderEntity> => {
  const order: OrderEntity = await createOrderEntity(cart, details);
  const createdOrder: OrderEntityDocument = await addOrder(order);
  await deleteCart(user);
  return createdOrder;
};

const order: OrderEntity = {
  _id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  cartId: '1434fec6-cd85-420d-95c0-eee2301a971d',
  items: [],
  payment: {
    type: 'paypal',
  },
  delivery: {
    type: 'post',
    address: 'Green street, 15/2',
  },
  comments: '',
  status: ORDER_STATUS.CREATED,
  total: 0,
};
export const initialOrders: OrderEntity[] = [order];

export const addInitialOrders = async (): Promise<void> => {
  try {
    const existingOrders: OrderEntityDocument[] = await OrderModel.find();
    if (!existingOrders.length) {
      await Promise.all(
        initialOrders.map(async (order: OrderEntity): Promise<void> => {
          await addOrder(order);
        }),
      );
      console.log('[Orders] Initial data created successfully.');
    } else {
      console.log('[Orders] Initial data already exists.');
    }
  } catch (error) {
    console.error('[Orders] Error initializing data:', error);
  }
};
