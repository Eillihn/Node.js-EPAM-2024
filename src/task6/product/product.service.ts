import { ProductEntity, getProducts, findProduct } from './product.repository';

export const getAllProducts = (): ProductEntity[] => getProducts();

export const getProduct = (productId: string): ProductEntity | undefined => findProduct(productId);
