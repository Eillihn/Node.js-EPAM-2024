import { ProductEntity, products } from './product.entity';

export const getProducts = (): ProductEntity[] => products;
export const findProduct = (productId: string): ProductEntity | undefined =>
  products.find((product: ProductEntity): boolean => product.id === productId);
