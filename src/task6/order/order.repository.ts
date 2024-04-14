import { v4 as uuidv4 } from 'uuid';
import { calcTotal } from '../cart/cart.repository';
import { ORDER_STATUS, OrderDetailsEntity, OrderEntity, orders } from './order.entity';
import { CartEntity, CartItemEntity } from '../cart/cart.entity';

export const addOrder = (order: OrderEntity) => orders.push(order);

export const createOrderEntity = (cart: CartEntity, details: OrderDetailsEntity): OrderEntity => ({
  id: uuidv4(),
  userId: cart.userId,
  cartId: cart.id,
  items: cart.items.map((item: CartItemEntity): CartItemEntity => ({ ...item })),
  total: calcTotal(cart),
  status: 'created' as ORDER_STATUS,
  ...details,
});
