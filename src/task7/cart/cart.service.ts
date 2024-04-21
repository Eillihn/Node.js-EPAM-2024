import { getUserCart, getOrCreateCart, calcTotal, updateCart, addCartEntity, createCartItem, emptyCart } from './cart.repository';

import { UserEntityDocument } from '../user/user.entity';
import { CartEntity, CartEntityDocument, CartItemEntityDocument, CartModel, TotalCartEntity } from './cart.entity';
import { ProductEntityDocument } from '../product/product.entity';

export const getCart = (user: UserEntityDocument): Promise<CartEntityDocument | null> => getUserCart(user._id);

export const getTotalCart = async (user: UserEntityDocument): Promise<TotalCartEntity> => {
  const cart: CartEntityDocument = await getOrCreateCart(user._id);
  return {
    cart,
    total: await calcTotal(cart),
  };
};

export const deleteCart = async (user: UserEntityDocument): Promise<boolean> => {
  const cart: CartEntityDocument | null = await getUserCart(user._id);
  if (cart) {
    await updateCart(cart, { isDeleted: true });
    return true;
  } else {
    return false;
  }
};

export const deleteProductsCart = async (user: UserEntityDocument): Promise<boolean> => {
  const cart: CartEntityDocument | null = await getUserCart(user._id);
  if (cart) {
    await emptyCart(cart);
    return true;
  } else {
    return false;
  }
};

export const addProducts = async (user: UserEntityDocument, product: ProductEntityDocument, count: number): Promise<boolean> => {
  const cart: CartEntityDocument = await getOrCreateCart(user._id);
  const productIndex = cart.items.findIndex((item: CartItemEntityDocument): boolean => item.product._id === product._id);
  const updatedItems: CartItemEntityDocument[] = [...cart.items];
  let updatedCart: CartEntityDocument | undefined;

  if (productIndex > -1) {
    updatedItems[productIndex].count = updatedItems[productIndex].count + count;
    updatedCart = await updateCart(cart, { items: updatedItems });
  } else {
    const cartItem: CartItemEntityDocument = await createCartItem(product, count);
    updatedItems.push(cartItem);
    updatedCart = await updateCart(cart, {
      items: updatedItems,
    });
  }

  return !!updatedCart;
};

export const cart: CartEntity = {
  _id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  isDeleted: false,
  items: [],
};
export const initialCarts: CartEntity[] = [cart];

export async function addInitialCarts(): Promise<void> {
  try {
    const existingCarts: CartEntityDocument[] = await CartModel.find();
    if (!existingCarts.length) {
      await Promise.all(
        initialCarts.map(async (cart: CartEntity): Promise<void> => {
          await addCartEntity(cart);
        }),
      );
      console.log('[Carts] Initial data created successfully.');
    } else {
      console.log('[Carts] Initial data already exists.');
    }
  } catch (error) {
    console.error('[Carts] Error initializing data:', error);
  }
}
