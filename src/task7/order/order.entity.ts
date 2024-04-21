import mongoose, { Schema, Document } from 'mongoose';
import { CartItemEntity, CartItemSchema } from '../cart/cart.entity';

export enum ORDER_STATUS {
  CREATED = 'created',
  COMPLETED = 'completed',
}

export interface OrderEntity {
  _id: string;
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

export interface OrderEntityDocument extends Document {
  _id: string;
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

export const OrderSchema: Schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: [{ type: CartItemSchema }],
  payment: {
    type: { type: String, required: true },
    address: { type: String },
    creditCard: { type: String },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: true },
  },
  comments: { type: String },
  status: { type: String, enum: Object.values(ORDER_STATUS), required: true },
  total: { type: Number, required: true },
});

export const OrderModel = mongoose.model<OrderEntityDocument>('Order', OrderSchema);
