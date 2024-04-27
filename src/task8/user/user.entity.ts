import { v4 as uuidv4 } from 'uuid';
import { Entity, OneToOne, PrimaryKey, Property, Ref, ref } from '@mikro-orm/core';

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

@Entity()
export class UserModel {
  @PrimaryKey()
    _id = uuidv4();

  @Property()
    role!: string;

  @Property()
    email!: string;

  constructor(role: string, email: string, _id?: string) {
    this.role = role;
    this.email = email;
    if (_id) {
      this._id = _id;
    }
  }
}

@Entity()
export class UserPasswordModel {
  @PrimaryKey()
  _id: string = uuidv4();

  @OneToOne()
  user!: Ref<UserModel>;

  @Property()
  password!: string;

  constructor(password: string, user: UserModel, _id?: string) {
    this.password = password;
    this.user = ref(user);
    if (_id) {
      this._id = _id;
    }
  }
}
