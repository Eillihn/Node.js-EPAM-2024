import { calcTotal } from '../cart/cart.repository';
import { ORDER_STATUS, OrderDetailsEntity, OrderModel } from './order.entity';
import { v4 as uuidv4 } from 'uuid';
import { DI } from '../server';
import { CartModel } from '../cart/cart.entity';

export const addOrder = async (cart: CartModel, details: OrderDetailsEntity): Promise<OrderModel | null> => {
  const order: OrderModel = new OrderModel(
    cart,
    details.payment.type,
    details.delivery.type,
    details.delivery.address,
    'created' as ORDER_STATUS,
    await calcTotal(cart),
    details.payment.address,
    details.payment.creditCard,
    details.comments,
    uuidv4(),
  );
  await DI.em.persistAndFlush(order);
  return DI.orderRepository.findOne(order, { populate: ['cart'] });
};
