import { v4 as uuidv4 } from 'uuid';
import { CartItemEntity, cart, CartEntity, calcTotal } from '../cart/cart.repository';

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string;
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: string;
    creditCard?: string;
  };
  delivery: {
    type: string;
    address: string;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

export interface OrderDetailsEntity {
  payment: {
    type: string;
    address?: string;
    creditCard?: string;
  };
  delivery: {
    type: string;
    address: string;
  };
  comments: string;
}

const order: OrderEntity = {
  id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  cartId: '',
  items: cart.items,
  payment: {
    type: 'paypal',
  },
  delivery: {
    type: 'post',
    address: 'Green street, 15/2',
  },
  comments: '',
  status: 'created',
  total: 2,
};

const orders: OrderEntity[] = [order];

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
