import { v4 as uuidv4 } from 'uuid';
import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property, ManyToOne, Ref, ref } from '@mikro-orm/core';
import { UserEntity, UserModel } from '../user/user.entity';
import { CartItemEntity, CartItemModel } from './cartItem.entity';

export interface CartEntity {
  _id: string;
  user: UserEntity;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface TotalCartEntity {
  cart: CartModel;
  total: number;
}

export interface AddCartItemEntity {
  productId: string;
  count: number;
}

@Entity()
export class CartModel {
  @PrimaryKey()
  _id: string = uuidv4();

  @ManyToOne(() => UserModel)
  user!: Ref<UserModel>;

  @Property()
  isDeleted!: boolean;

  @OneToMany(() => CartItemModel, (cartItem: CartItemModel) => cartItem.cart, { cascade: [Cascade.ALL] })
  items: Collection<CartItemModel> = new Collection<CartItemModel>(this);

  constructor(user: UserModel, isDeleted: boolean, _id?: string) {
    this.user = ref(user);
    this.isDeleted = isDeleted;
    if (_id) {
      this._id = _id;
    }
  }
}
