import { v4 as uuidv4 } from 'uuid';
import { CartModel } from './cart.entity';
import { ProductModel } from '../product/product.entity';
import { DI } from '../server';
import { UserModel } from '../user/user.entity';
import { getCart } from './cart.service';
import { CartItemModel } from './cartItem.entity';

export const getUserCart = async (user: UserModel): Promise<CartModel | null> => DI.cartRepository.findOne({ user, isDeleted: false });

export const getUserCartWithItems = async (user: UserModel): Promise<CartModel | null> =>
  DI.cartRepository.findOne({ user, isDeleted: false }, { populate: ['items'] });

export const createCart = async (user: UserModel): Promise<CartModel> => {
  const cart: CartModel = new CartModel(user, false, uuidv4());
  await DI.em.persistAndFlush(cart);
  return cart;
};

export const emptyCart = async (user: UserModel): Promise<boolean> => {
  const cartToRemove: CartModel | null = await getUserCartWithItems(user);
  if (!cartToRemove) {
    return false;
  }

  for (const cartItem of cartToRemove.items) {
    await DI.em.removeAndFlush(cartItem);
  }

  await DI.em.removeAndFlush(cartToRemove);
  return true;
};

export const getCartItems = (cart: CartModel) => DI.cartItemRepository.find({ cart });
export const getCartItemsWithProducts = (cart: CartModel) => DI.cartItemRepository.find({ cart }, { populate: ['product'] });

export const getOrCreateCart = async (user: UserModel): Promise<CartModel> => {
  let cart: CartModel | null = await getUserCartWithItems(user);
  if (!cart) {
    cart = await createCart(user);
  }
  return cart;
};

export const calcTotal = async (cart: CartModel): Promise<number> => {
  const items: CartItemModel[] = await getCartItemsWithProducts(cart);
  return items.reduce(
    (previousValue: number, currentValue: CartItemModel) => previousValue + currentValue.count * currentValue.product.getEntity().price,
    0,
  );
};

export const updateCartDeleted = async (cart: CartModel, value: boolean): Promise<boolean> => {
  if (cart) {
    cart.isDeleted = value;
    await DI.em.flush();
    return true;
  } else {
    return false;
  }
};

export const addProductsToCart = async (user: UserModel, product: ProductModel, count: number): Promise<boolean> => {
  const cart: CartModel | null = await getCart(user);
  if (!cart) {
    return false;
  }
  const items: CartItemModel[] = await getCartItems(cart);
  const item: CartItemModel | undefined = items.find((item: CartItemModel): boolean => {
    if (item.product._id === product._id) {
      item.count = item.count + count;
      return true;
    } else {
      return false;
    }
  });
  if (!item) {
    const cartItem: CartItemModel = new CartItemModel(cart, product, count);
    await DI.em.persistAndFlush(cartItem);
  }
  await DI.em.flush();
  return true;
};
