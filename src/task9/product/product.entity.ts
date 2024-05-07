import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export interface ProductEntity {
  _id: string;
  title: string;
  description: string;
  price: number;
}

@Entity()
export class ProductModel {
  @PrimaryKey()
  _id: string = uuidv4();

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  constructor(title: string, description: string, price: number, _id?: string) {
    this.title = title;
    this.description = description;
    this.price = price;
    if (_id) {
      this._id = _id;
    }
  }
}
