import { v4 as uuidv4 } from 'uuid';

import { UserEntity } from '../user/user.entity';
import { CartEntity, CartItemEntity, carts } from './cart.entity';

export const getUserCart = (user: UserEntity): CartEntity | undefined => {
  return carts.find((cart: CartEntity) => cart.userId === user.id);
};

export const createCart = (user: UserEntity): CartEntity => {
  return {
    id: uuidv4(),
    userId: user.id,
    isDeleted: false,
    items: [],
  };
};

export const getOrCreateCart = (user: UserEntity): CartEntity => {
  let cart: CartEntity | undefined = getUserCart(user);
  if (!cart) {
    cart = createCart(user);
  }
  return cart;
};

export const calcTotal = (cart: CartEntity): number => {
  return cart.items.reduce(
    (previousValue: number, currentValue: CartItemEntity) => previousValue + currentValue.count * currentValue.product.price,
    0,
  );
};

export const emptyCart = (cart: CartEntity): void => {
  cart.items = [];
};

export const addProductsCart = (cart: CartEntity, cartItem: CartItemEntity): void => {
  const productIndex = cart.items.findIndex((item: CartItemEntity): boolean => item.product.id === cartItem.product.id);
  if (productIndex > -1) {
    cart.items[productIndex].count = cart.items[productIndex].count + cartItem.count;
  } else {
    cart.items.push(cartItem);
  }
};
