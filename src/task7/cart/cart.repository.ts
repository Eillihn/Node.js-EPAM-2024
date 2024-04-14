import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartEntityDocument, CartItemEntity, CartItemEntityDocument, CartItemModel, CartModel } from './cart.entity';
import { ProductEntity } from '../product/product.entity';

export const getUserCart = (userId: string): Promise<CartEntityDocument | null> => CartModel.findOne({ userId, isDeleted: false });

export const createCart = (userId: string): Promise<CartEntityDocument> => {
  const cartEntity: CartEntity = {
    _id: uuidv4(),
    userId,
    isDeleted: false,
    items: [],
  };
  const cart: CartEntityDocument = new CartModel(cartEntity);
  return cart.save();
};

export const emptyCart = (cartEntity: CartEntityDocument): Promise<CartEntityDocument | null> =>
  CartModel.findByIdAndUpdate(cartEntity._id, { items: [] });

export const getOrCreateCart = async (userId: string): Promise<CartEntityDocument> => {
  let cart: CartEntityDocument | null = await getUserCart(userId);
  if (!cart) {
    cart = await createCart(userId);
  }
  return cart;
};

export const calcTotal = async (cartEntity: CartEntityDocument): Promise<number> => {
  const cart: CartEntityDocument | null = await CartModel.findById(cartEntity._id);
  return (
    cart?.items.reduce((previousValue: number, currentValue: CartItemEntity) => previousValue + currentValue.count * currentValue.product.price, 0) ||
    0
  );
};

export const updateCart = async (cartEntity: CartEntityDocument, updates: Partial<CartEntity>): Promise<CartEntityDocument | undefined> => {
  const cart: CartEntityDocument | null = await CartModel.findByIdAndUpdate(cartEntity._id, updates);
  return cart?.save();
};

export const addCartEntity = async (cartEntity: CartEntity): Promise<void> => {
  const cart: CartEntityDocument = new CartModel(cartEntity);
  await cart.save();
};

export const createCartItem = async (product: ProductEntity, count: number): Promise<CartItemEntityDocument> => {
  const cartItem: CartItemEntityDocument = new CartItemModel({
    _id: uuidv4(),
    product,
    count,
  });
  return cartItem.save();
};
