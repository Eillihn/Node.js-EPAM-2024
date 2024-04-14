import { cart, CartItemEntity } from '../cart/cart.entity';

export type ORDER_STATUS = 'created' | 'completed';

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
export const orders: OrderEntity[] = [order];
