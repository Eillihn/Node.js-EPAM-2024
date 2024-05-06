import { v4 as uuidv4 } from 'uuid';
import { Entity, ManyToOne, PrimaryKey, Property, Ref, ref } from '@mikro-orm/core';
import { ProductEntity, ProductModel } from '../product/product.entity';
import { CartModel } from './cart.entity';

export interface CartItemEntity {
  _id: string;
  product: ProductEntity;
  count: number;
}

@Entity()
export class CartItemModel {
  @PrimaryKey()
  _id = uuidv4();

  @ManyToOne(() => CartModel, { ref: true })
  cart!: Ref<CartModel>;

  @ManyToOne(() => ProductModel, { ref: true })
  product!: Ref<ProductModel>;

  @Property()
  count!: number;

  constructor(cart: CartModel, product: ProductModel, count: number, _id?: string) {
    this.cart = ref(cart);
    this.product = ref(product);
    this.count = count;
    if (_id) {
      this._id = _id;
    }
  }
}
