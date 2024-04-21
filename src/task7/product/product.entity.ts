import mongoose, { Schema, Document } from 'mongoose';

export interface ProductEntity {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductEntityDocument extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export const ProductSchema: Schema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ProductModel = mongoose.model<ProductEntityDocument>('Product', ProductSchema);
