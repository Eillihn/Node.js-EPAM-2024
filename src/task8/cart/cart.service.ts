import {
  getUserCart,
  getOrCreateCart,
  calcTotal,
  emptyCart,
  addProductsToCart,
  updateCartDeleted,
  getCartItems,
  getUserCartWithItems,
} from './cart.repository';

import { CartModel, TotalCartEntity } from './cart.entity';
import { UserModel } from '../user/user.entity';
import { ProductModel } from '../product/product.entity';

export const getCart = (user: UserModel) => getUserCart(user);

export const getNotEmptyCart = async (user: UserModel): Promise<CartModel | null> => {
  const cart: CartModel | null = await getUserCartWithItems(user);
  if (!cart) {
    return null;
  }
  return cart.items.length > 0 ? cart : null;
};

export const getTotalCart = async (user: UserModel): Promise<TotalCartEntity> => {
  const cart: CartModel = await getOrCreateCart(user);
  return {
    cart,
    total: await calcTotal(cart),
  };
};

export const deleteCart = async (cart: CartModel): Promise<boolean> => {
  return await updateCartDeleted(cart, true);
};

export const deleteProductsCart = async (user: UserModel): Promise<boolean> => {
  return await emptyCart(user);
};

export const addProducts = async (user: UserModel, product: ProductModel, count: number): Promise<boolean> => addProductsToCart(user, product, count);
