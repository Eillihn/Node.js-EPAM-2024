import mongoose, { Schema, Document } from 'mongoose';

import { ProductEntity, ProductEntityDocument, ProductSchema } from '../product/product.entity';

export interface CartItemEntity {
  _id: string;
  product: ProductEntity;
  count: number;
}

export interface CartItemEntityDocument extends Document {
  _id: string;
  product: ProductEntityDocument;
  count: number;
}

export interface CartEntity {
  _id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface CartEntityDocument extends Document {
  _id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntityDocument[];
}

export interface TotalCartEntity {
  cart: CartEntity;
  total: number;
}

export interface AddCartItemEntity {
  productId: string;
  count: number;
}

export const CartItemSchema: Schema = new Schema({
  _id: { type: String, required: true },
  product: { type: ProductSchema, required: true },
  count: { type: Number, required: true },
});

const CartSchema: Schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: [{ type: CartItemSchema, required: true }],
});

export const CartItemModel = mongoose.model<CartItemEntityDocument>('CartItem', CartItemSchema);
export const CartModel = mongoose.model<CartEntityDocument>('Cart', CartSchema);
