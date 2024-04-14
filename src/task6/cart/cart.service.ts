import { getUserCart, getOrCreateCart, calcTotal, emptyCart, addProductsCart } from './cart.repository';

import { UserEntity } from '../user/user.entity';
import { CartEntity, CartItemEntity, TotalCartEntity } from './cart.entity';

export const getCart = (user: UserEntity) => getUserCart(user);

export const getTotalCart = (user: UserEntity): TotalCartEntity => {
  const cart: CartEntity = getOrCreateCart(user);
  return {
    cart,
    total: calcTotal(cart),
  };
};

export const deleteCart = (user: UserEntity): boolean => {
  const cart: CartEntity | undefined = getUserCart(user);
  if (cart) {
    emptyCart(cart);
    return true;
  } else {
    return false;
  }
};

export const addProducts = (user: UserEntity, cartItem: CartItemEntity): boolean => {
  const cart: CartEntity | undefined = getUserCart(user);
  if (!cart) {
    return false;
  }
  addProductsCart(cart, cartItem);
  return true;
};
