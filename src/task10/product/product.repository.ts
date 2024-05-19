import { ProductEntity, ProductModel } from './product.entity';
import { DI } from '../server';

export const findAllProducts = () => DI.productRepository.findAll();

export const findProduct = (productId: string) => DI.productRepository.findOne(productId);

export const addProductEntity = async (productEntity: ProductEntity): Promise<void> => {
  const product: ProductModel = new ProductModel(productEntity.title, productEntity.description, productEntity.price, productEntity._id);
  await DI.em.persistAndFlush(product);
};
