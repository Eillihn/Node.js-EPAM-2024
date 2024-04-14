import { calcTotal } from '../cart/cart.repository';
import { ORDER_STATUS, OrderDetailsEntity, OrderEntity, OrderEntityDocument, OrderModel } from './order.entity';
import { CartEntityDocument, CartItemEntity } from '../cart/cart.entity';
import { v4 as uuidv4 } from 'uuid';

export const addOrder = (orderEntity: OrderEntity): Promise<OrderEntityDocument> => {
  const order: OrderEntityDocument = new OrderModel(orderEntity);
  return order.save();
};

export const createOrderEntity = async (cart: CartEntityDocument, details: OrderDetailsEntity): Promise<OrderEntity> => ({
  _id: uuidv4(),
  userId: cart.userId,
  cartId: cart._id,
  items: cart.items.map((item: CartItemEntity): CartItemEntity => ({ ...item })),
  total: await calcTotal(cart),
  status: 'created' as ORDER_STATUS,
  ...details,
});
