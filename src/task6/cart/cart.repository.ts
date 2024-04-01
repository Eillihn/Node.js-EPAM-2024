import { v4 as uuidv4 } from 'uuid';
import { ProductEntity, product as bookProduct } from '../product/product.repository';
import { UserEntity } from '../user/user.repository';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface TotalCartEntity {
  cart: CartEntity;
  total: number;
}

export interface AddCartItemEntity {
  productId: string;
  count: number;
}

const cartItem: CartItemEntity = {
  product: bookProduct,
  count: 2,
};

export const cart: CartEntity = {
  id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  isDeleted: false,
  items: [cartItem],
};

const carts: CartEntity[] = [cart];

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
