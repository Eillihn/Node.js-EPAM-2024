import { findProduct, findAllProducts } from './product.repository';

export const getAllProducts = () => findAllProducts();

export const getProduct = (productId: string) => findProduct(productId);
