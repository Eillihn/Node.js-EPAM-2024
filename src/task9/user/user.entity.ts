import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export interface UserEntity {
  _id: string;
  role: string;
  email: string;
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

export interface CurrentUser {
  user_id: string;
  email: string;
  role: string;
}

@Entity()
export class UserModel {
  @PrimaryKey()
  _id = uuidv4();

  @Property()
  role!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  constructor(role: string, email: string, password: string, _id?: string) {
    this.role = role;
    this.email = email;
    this.password = password;
    if (_id) {
      this._id = _id;
    }
  }
}
