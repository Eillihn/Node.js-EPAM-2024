import mongoose, { Schema, Document } from 'mongoose';

export interface UserEntity {
  _id: string;
  role: string;
  email: string;
}

export interface UserPasswordEntity {
  _id: string;
  userId: string;
  password: string;
}

export interface UserEntityDocument extends Document {
  _id: string;
  role: string;
  email: string;
}

export interface UserPasswordEntityDocument extends Document {
  _id: string;
  userId: string;
  password: string;
}

export interface UserToken {
  token: string;
}

export interface LoginUserEntity {
  email: string;
  password: string;
}

export interface RegisterUserEntity {
  _id?: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
});

const UserPasswordSchema: Schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<UserEntityDocument>('User', UserSchema);
export const UserPasswordModel = mongoose.model<UserPasswordEntityDocument>('UserPassword', UserPasswordSchema);
