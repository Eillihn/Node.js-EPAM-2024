import { v4 as uuidv4 } from 'uuid';
import { Entity, Enum, OneToOne, PrimaryKey, Property, OptionalProps, Ref, ref } from '@mikro-orm/core';
import { CartModel } from '../cart/cart.entity';

export enum ORDER_STATUS {
  CREATED = 'created',
  COMPLETED = 'completed',
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

@Entity()
export class OrderModel {
  [OptionalProps]?: 'paymentAddress' | 'paymentCreditCard' | 'comments';

  @PrimaryKey()
  _id: string = uuidv4();

  @OneToOne()
  cart!: Ref<CartModel>;

  @Property()
  paymentType!: string;

  @Property()
  paymentAddress?: string;

  @Property()
  paymentCreditCard?: string;

  @Property()
  deliveryType!: string;

  @Property()
  deliveryAddress!: string;

  @Property()
  comments?: string;

  @Enum(() => ORDER_STATUS)
  status!: ORDER_STATUS;

  @Property()
  total!: number;

  constructor(
    cart: CartModel,
    paymentType: string,
    deliveryType: string,
    deliveryAddress: string,
    status: ORDER_STATUS,
    total: number,
    paymentAddress?: string,
    paymentCreditCard?: string,
    comments?: string,
    _id?: string,
  ) {
    this.cart = ref(cart);
    this.paymentType = paymentType;
    this.paymentAddress = paymentAddress;
    this.paymentCreditCard = paymentCreditCard;
    this.deliveryType = deliveryType;
    this.deliveryAddress = deliveryAddress;
    this.status = status;
    this.total = total;
    this.comments = comments;
    if (_id) {
      this._id = _id;
    }
  }
}
