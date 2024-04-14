import { addOrder, createOrderEntity } from './order.repository';
import { deleteCart } from '../cart/cart.service';

import { UserEntity } from '../user/user.entity';
import { OrderDetailsEntity, OrderEntity } from './order.entity';
import { CartEntity } from '../cart/cart.entity';

export const createOrder = (user: UserEntity, cart: CartEntity, details: OrderDetailsEntity): OrderEntity => {
  const order: OrderEntity = createOrderEntity(cart, details);
  addOrder(order);
  deleteCart(user);
  return order;
};
