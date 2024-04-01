import { CartEntity } from '../cart/cart.repository';
import { addOrder, OrderDetailsEntity, OrderEntity, createOrderEntity } from './order.repository';
import { deleteCart } from '../cart/cart.service';
import { UserEntity } from '../user/user.repository';

export const createOrder = (user: UserEntity, cart: CartEntity, details: OrderDetailsEntity): OrderEntity => {
  const order: OrderEntity = createOrderEntity(cart, details);
  addOrder(order);
  deleteCart(user);
  return order;
};
