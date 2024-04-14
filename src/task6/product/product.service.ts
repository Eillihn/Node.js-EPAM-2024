import { getProducts, findProduct } from './product.repository';
import { ProductEntity } from './product.entity';

export const getAllProducts = (): ProductEntity[] => getProducts();

export const getProduct = (productId: string): ProductEntity | undefined => findProduct(productId);
