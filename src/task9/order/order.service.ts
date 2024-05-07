import { addOrder } from './order.repository';
import { deleteCart } from '../cart/cart.service';

import { OrderDetailsEntity, OrderModel } from './order.entity';
import { CartModel } from '../cart/cart.entity';

export const createOrder = async (cart: CartModel, details: OrderDetailsEntity): Promise<OrderModel | null> => {
  const order: OrderModel | null = await addOrder(cart, details);
  await deleteCart(cart);
  return order;
};
